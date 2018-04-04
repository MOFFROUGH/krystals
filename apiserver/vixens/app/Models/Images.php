<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Images extends Model{
  protected $fillable = [
      'user_id','imageURL'
  ];
public function user()
{
  return $this->belongsTo(User::class);
}


}
