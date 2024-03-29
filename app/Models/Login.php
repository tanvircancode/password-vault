<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Login extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'logins';

    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'username',
        'password',
        'url',
        
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
        'username' => 'string',
        'password' => 'string',
        'url' => 'string',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
