<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Folder extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'folders';

    public $timestamps = false;

    protected $fillable = [
        'user_id','foldername'
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
        'foldername' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


   
}
