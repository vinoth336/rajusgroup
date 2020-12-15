<?php

define('MALE', 1);
define('FEMALE', 2);

//PROFILE INTEREST REQUEST STATUS
define('PROFILE_REQUEST_PENDING', 1);
define('PROFILE_REQUEST_APPROVED', 2);
define('PROFILE_REQUEST_REJECT', 3);

//PROFILE STATUS
define('PROFILE_INTEREST', 1);
define('PROFILE_SHORTLIST', 2);
define('PROFILE_IGNORED', 3);
define('PROFILE_BLOCKED', 4);


//ANNUAL INCOME
define('ANNUAL_INCOME_RANGE', [
    'below_50k' => '10 - 50 K',
    'below_1l' => '50 K - 1 Lakhs',
    'below_2l' => '1 - 2 Lakhs',
    'below_5l' => '2 - 5 Lakhs',
    'below_10l' => '5 - 10 Lakhs',
    'below_50l' => '10 - 50 Lakhs',
    'below_1c' => '50 - 1 Crore',
    'above_1c' => 'Above 1 '
]);

define('ANNUAL_INCOME_RANGE_KEY_VALUE', [
    'below_50k' => '1',
    'below_1l' => '2',
    'below_2l' => '3',
    'below_5l' => '4',
    'below_10l' => '5',
    'below_50l' => '6',
    'below_1c' => '6',
    'above_1c' => '7'
]);

