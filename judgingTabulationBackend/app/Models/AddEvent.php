<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AddEvent extends Model
{
    protected $fillable = [
        'name',
        'description',
        'date',
        'organizer',
        'venue',
        'poster'
    ];

    /**
     * Define a relationship where an event has many contests.
     */
    public function contests(): HasMany
    {
        return $this->hasMany(AddContest::class, 'event_id');
    }
}
