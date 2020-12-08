<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Jamesh\Uuid\HasUuid;

class MemberOccupation extends Model
{
    use HasUuid;

    protected $fillable = ['organisation', 'role', 'organisation_details', 'job_location'];
}
