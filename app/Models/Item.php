<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;
use League\Csv\Writer;

class Item extends Model
{
    use SoftDeletes;
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'items';


    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'user_id', 'folder_id', 'organization_id', 'type', 'name', 'notes', 'favorite'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'user_id' => 'string',
        'folder_id' => 'string',
        'organization_id' => 'string',
        'type' => 'integer',
        'name' => 'string',
        'notes' => 'string',
        'favorite' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
    public function login()
    {
        return $this->hasOne(Login::class);
    }
    public function card()
    {
        return $this->hasOne(Card::class);
    }
    public function identity()
    {
        return $this->hasOne(Identity::class);
    }


    //writing controllers code
    public function createRelatedModel(array $data)
    {
        switch ($this->type) {
            case 1:
                $this->createLogin($data);
                break;
            case 2:
                $this->createCard($data);
                break;
            case 3:
                $this->createIdentity($data);
                break;
        }
    }

    protected function createLogin(array $data)
    {
        $loginInput = [
            'username' => $data['username'],
            'password' => $data['password'],
            'url' => $data['url'],
            'item_id' => $this->id,
        ];

        $this->login()->create($loginInput);
    }

    protected function createCard(array $data)
    {
        $cardInput = [
            'cardholder_name' => $data['cardholder_name'],
            'brand' => $data['brand'],
            'number' => $data['number'],
            'exp_month' => $data['exp_month'],
            'exp_year' => $data['exp_year'],
            'security_code' => $data['security_code'],
            'item_id' => $this->id,
        ];

        $this->card()->create($cardInput);
    }

    protected function createIdentity(array $data)
    {
        $identityInput = [
            'title' => $data['title'],
            'email' => $data['email'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'],
            'security' => $data['security'],
            'license' => $data['license'],
            'address' => $data['address'],
            'item_id' => $this->id,
        ];

        $this->identity()->create($identityInput);
    }

    public function updateItemAndRelatedModels(array $data)
    {

        $itemInput = [
            'folder_id' => $data['folder_id'],
            'notes' => $data['notes'],
            'organization_id' => $data['organization_id'],
            'favorite' => $data['favorite'],
            'name' => $data['name'],
        ];

        $this->update($itemInput);

        switch ($this->type) {
            case 1:
                $this->updateLogin($data);
                break;
            case 2:
                $this->updateCard($data);
                break;
            case 3:
                $this->updateIdentity($data);
                break;
        }

        return true;
    }

    protected function updateLogin(array $data)
    {
        $loginInput = [
            'username' => $data['username'],
            'password' => $data['password'],
            'url' => $data['url'],
        ];
        $login = $this->login;
        if (!$login) {
            $login = new Login();
            $login->item_id = $this->id;
        }
        $login->fill($loginInput);
        $login->save();
    }

    protected function updateCard(array $data)
    {
        $cardInput = [
            'cardholder_name' => $data['cardholder_name'],
            'brand' => $data['brand'],
            'number' => $data['number'],
            'exp_month' => $data['exp_month'],
            'exp_year' => $data['exp_year'],
            'security_code' => $data['security_code'],
        ];
        $card = $this->card;
        if (!$card) {
            $card = new Card();
            $card->item_id = $this->id;
        }
        $card->fill($cardInput);
        $card->save();
    }

    protected function updateIdentity(array $data)
    {
        $identityInput = [
            'title' => $data['title'],
            'email' => $data['email'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'],
            'security' => $data['security'],
            'license' => $data['license'],
            'address' => $data['address'],
        ];
        $identity = $this->identity;
        if (!$identity) {
            $identity = new Identity();
            $identity->item_id = $this->id;
        }
        $identity->fill($identityInput);
        $identity->save();
    }

    public function deleteItems(array $selectedItems): array
    {
        $result = ['success' => false, 'items' => []];

        if (empty($selectedItems)) {
            return $result;
        }

        $items = $this->with(['organization', 'folder', 'login', 'card', 'identity'])
            ->withTrashed()
            ->whereIn('id', $selectedItems)
            ->get();



        foreach ($items as $item) {
            if ($item->trashed()) {
                $item->forceDelete();
            } else {
                $item->delete();
            }
        }

        $result['success'] = true;
        $result['items'] = $items->toArray();

        return $result;
    }

    public static function importItems($file, $userId)
    {

        $fileData = array_map('str_getcsv', file($file));

        foreach ($fileData as $index => $row) {
            // CSV structure: foldername,favorite,type,name,notes,username,password,url

            if ($index === 0) {
                continue;
            }

            $folder = null;
            if (!empty($row[0])) {
                $folder = Folder::create(['foldername' => $row[0] ?? "", 'user_id' => $userId]);
            }
            $item = new Item();
            $item->folder_id = !empty($folder->id) ? $folder->id : "";
            $item->favorite = $row[1];
            $item->type = $row[2] == 'login' ? 1 : 4;
            $item->name = $row[3] ?? "";
            $item->notes = $row[4] ?? "";
            $item->user_id = $userId;

            $item->save();
            $item->login()->create([
                'username' => $row[5] ?? '',
                'password' => $row[6] ?? "",
                'url' => $row[7] ?? "",
                'item_id' => $item->id
            ]);
        }
    }

    public function exportItems($userId)
    {
        $items = $this->where('user_id', $userId)
            ->with(['folder', 'login'])
            ->get();

        $csv = Writer::createFromFileObject(new \SplTempFileObject());

        $csv->insertOne([
            'folder_name', 'favorite', 'type', 'item_name', 'notes', 'login_username', 'login_password',
            'login_url'
        ]);


        foreach ($items as $item) {
            if ($item->type == 2 || $item->type == 3) {
                continue;
            }
            $csv->insertOne([

                $item->folder->foldername  ?? "",
                $item->favorite ?? "",
                $item->type  ? ($item->type == 1 ? 'login' : 'note') : "",
                strval($item->name) ?? "",
                $item->notes  ?? "",
                $item->login->username  ?? "",
                $item->login->password  ?? "",
                $item->login->url  ?? ""
            ]);
        }
        return $csv;
    }
}
