<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Card extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'cards';

    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'cardholder_name',
        'brand',
        'number',
        'exp_month',
        'exp_year',
        'security_code',
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
        'cardholder_name' => 'string',
        'brand' => 'string',
        'number' => 'string',
        'exp_month' => 'string',
        'exp_year' => 'string',
        'security_code' => 'string',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
