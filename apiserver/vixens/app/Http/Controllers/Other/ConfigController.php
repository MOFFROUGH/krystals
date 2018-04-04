<?php

use Illuminate\Support\Facades\Artisan;

public function __construct()
{
  //
}
public function loadDB()
{
  Artisan::call('migrate');
  return response()->json(['message'=>'Loaded the database'],200)
}
public function configCache()
{
  Artisan::call('cache:clear');
  return response()->json(['message'=>'configured cache'],200)
}
public function truncateDB()
{
  Artisan::call('migrate:refresh');
  return response()->json(['message'=>'Truncated the database'],200)
}
public function storageLink()
{
  # code...
}
public function siteDown()
{
  # code...
}
public function siteUp()
{
  # code...
}
?>
