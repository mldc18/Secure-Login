<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class PasswordHistory extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $table = 'password_histories';
    protected $fillable = [
        'password',
    ];

}
