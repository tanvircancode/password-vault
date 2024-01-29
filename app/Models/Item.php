<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Item extends Model
{

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
        'user_id','folder_id','organization_id', 'type', 'name', 'notes', 'favorite'
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
    
}
