<?php

namespace App\Models;

use App\Traits\StoreImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Jamesh\Uuid\HasUuid;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class Member extends Authenticatable
{
    use SoftDeletes, HasUuid, StoreImage;

    protected $guard = 'member';

    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'password',
        'email',
        'dob',
        'religion',
        'mother_tongue_id',
        'blood_id',
        'gender',
        'phone_no',
        'email_verified_at'
    ];

    protected $dates = [
        'dob'
    ];

    protected $hidden = [
        'password'
    ];

    //protected $primaryKey = 'username';

    protected $fileParamName = 'profile_photo';

    protected $storeFileName = '';

    protected $storeFileNameAsUploadName = '';

    protected $storagePath = 'profile_photo';

    protected $imageFieldName = 'profile_photo';

    public $resize = true;

    protected $casts = ['dob' => 'date'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {

            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function blood()
    {
        return $this->belongsTo(Blood::class, 'blood_id', 'id');
    }

    public function mother_tongue()
    {
        return $this->belongsTo(MotherTongue::class, 'mother_tongue_id', 'id');
    }

    public function educations()
    {
        return $this->hasMany(MemberEducation::class, 'member_id', 'id');
    }

    public function occupation()
    {
        return $this->hasOne(MemberOccupation::class, 'member_id', 'id');
    }

    public function family()
    {
        return $this->hasOne(MemberFamily::class, 'member_id', 'id');
    }

    public function location()
    {
        return $this->hasOne(MemberLocation::class, 'member_id', 'id');
    }

    public function horoscope()
    {
        return $this->hasOne(MemberHoroscope::class, 'member_id', 'id');
    }

    public function getNameAttribute()
    {
        return $this->first_name . " " . $this->last_name;
    }

    public function getDobAttribute($value)
    {
        return date("Y-m-d", strtotime($value));
    }

    public function getFullNameAttribute()
    {
        $name = $this->first_name . " " . $this->last_name;
        return ucfirst($name);
    }

    public function secureProfilePhoto()
    {
        if($this->attributes['profile_photo']) {
            return asset('site/images/profile_photo/thumbnails/' . $this->profile_photo );
        } else {
            if($this->gender == MALE) {
                return asset('site/images/site_images/male_default.jpg');
            } else {
                return asset('site/images/site_images/female_default.jpg');
            }
        }

    }

    public function checkIsUserCompletedIsProfileEntry()
    {

        $needed_information = [];
        if ($this->phone_no == null) {
            $needed_information['basic'][] = 'phone_no';
        }

        if ($this->email == null) {
            $needed_information['basic'][] = 'email';
        }

        if ($this->profile_photo == null) {
            $needed_information['basic'][] = 'profile_photo';
        }

        if ($this->educations == null) {
            $needed_information['education'][] = 'all';
        }

        if ($this->occupation == null) {
            $needed_information['occupation'][0] = 'all';
        } elseif ($this->occupation) {
            if ($this->occupation->role == null) {
                $needed_information['occupation'][1] = 'role';
            }
            if ($this->occupation->organisation_details == null) {
                $needed_information['occupation'][2] = 'organisation_details';
            }
            if ($this->occupation->job_location == null) {
                $needed_information['occupation'][3] = 'job_location';
            }
        }

        if ($this->family == null) {
            $needed_information['family'][0] = 'all';
        } elseif ($this->family) {
            if ($this->family->parents == null) {
                $needed_information['family'][1] = 'parents';
            }
        }

        if ($this->location == null) {
            $needed_information['location'][0] = 'all';
        } else if ($this->location) {
            if ($this->location->address == null) {
                $needed_information['location'][1] = 'address';
            }
            if ($this->location->city_id == null) {
                $needed_information['location'][] = 'city';
            }
            if ($this->location->state_id == null) {
                $needed_information['location'][] = 'state';
            }
            if ($this->location->pincode == null) {
                $needed_information['location'][] = 'pincode';
            }
        }

        if($this->horoscope == null) {
            $needed_information['horoscope'][] = 'all';
        } elseif($this->horoscope) {
            if($this->horoscope->rasi_id == null) {
                $needed_information['horoscope'][] = 'rasi';
            }
            if($this->horoscope->star_id == null) {
                $needed_information['horoscope'][] = 'rasi';
            }
            if($this->horoscope->horoscope_image == null) {
                $needed_information['horoscope'][] = 'horoscope_image';
            }
        }

        if($needed_information == null) {
            $this->profile_completed = 1;
            $this->save();
        }
    }
}
