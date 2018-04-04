<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Payments extends Model{
  protected $fillable = [
    'payerid','paymentid','amount','saleid','payeremail', 'firstname','lastname','user_id'
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
