<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Identity extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'identities';


    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'title',
        'email',
        'first_name',
        'middle_name',
        'last_name',
        'phone',
        'security',
        'license',
        'address',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    protected $casts = [
        'item_id' => 'string',
        'title' => 'string',
        'email' => 'string',
        'first_name' => 'string',
        'middle_name' => 'string',
        'last_name' => 'string',
        'phone' => 'string',
        'security' => 'string',
        'license' => 'string',
        'address' => 'string',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
