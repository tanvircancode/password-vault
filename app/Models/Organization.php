<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Organization extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'organizations';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'orgname',
        'email',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    protected $casts = [
        'user_id' => 'string',
        'orgname' => 'string',
        'email' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
