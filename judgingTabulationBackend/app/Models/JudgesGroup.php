<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JudgesGroup extends Model
{
    protected $fillable = [
        'contest_id',
        'group_id',
        'judges_id',
        'is_finished',
    ];
}
