<?php
namespace App\Http\Controllers\User;

use App\User;
use App\Models\Images;
use App\Models\Payments;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;
use Intervention\Image\ImageManagerStatic as Image;


class UserController extends Controller

{
  public function __construct()
  {
    //
  }

  public function saveFile(Request $request)
  {
    $host = "http://127.0.0.1:8000";

    $imageData   = $request->get('image');
    // Remove white spaces from the image
    $name = preg_replace('/\s+/', '', $request->imagename);
    //add timesramp to make the images unique
    $path = Carbon::now()->format('YmdHis'). '-'.$name ;

    $resize = Image::make($imageData)->encode('jpg');
    $store = Storage::disk('local')->put( 'public/images/'.$path , $resize);
    $namee = 'public/images/'.$path;
    $x = $host.Storage::disk('local')->url($namee);
    return response()->json(['imageUrL'=>$x],200);
  }

  public function index(Request $request)
  {
    $users = User::all();
    return response()->json(['images'=>$users],200);
  }
  public function OneVixen($id)
  {
    $user = User::findOrFail($id);
    $images = $user->images;
    return response()->json(['images'=>$images],200);
  }
  //register method
  public function register(Request $request)
  {

    $host = "http://127.0.0.1:8000";

    $imageData   = $request->get('image');
    // Remove white spaces from the image
    $name = preg_replace('/\s+/', '', $request->imagename);
    //add timesramp to make the images unique
    $path = Carbon::now()->format('YmdHis'). '-'.$name ;

    $resize = Image::make($imageData)->encode('jpg');
    $store = Storage::disk('local')->put( 'public/images/'.$path , $resize);
    $namee = 'public/images/'.$path;
    $x = $host.Storage::disk('local')->url($namee);

    $user = new User();
    $user->name = $request->name ;
    $user->email = $request->email ;
    $user->location  = $request->location ;
    $user->type = $request->type ;
    $user->age  = $request->age ;
    $user->src  =  $x;
    $user->save();

    $image = new Images();
    $image->user_id = $user->id;
    $image->imageURL = $x;
    $image->save();

    return response()->json(['user'=>$user],200);
  }
  public function success(Request $request)
  {
    $payment = Payments::create([
      'payerid' => $request->payerid,
      'paymentid' => $request->paymentid,
      'amount' => $request->amount,
      'saleid' => $request->saleid,
      'payeremail' => $request->payeremail,
      'firstname' => $request->firstname,
      'lastname' => $request->lastname
    ]);
    if ($payment) {
      return response()->json(['message'=>'Succesfully added the data to db'], 200);
    }
  }
  public function cancel(Request $request)
  {

  }
  public function searchVixens(Request $request)
  {
      $search = $request->get('search');
      // return response()->json(['search'=>$search],200);
      $Results = User::where('name','LIKE', "%$search%")
      ->orWhere('location','LIKE', "%$search%")
      ->orWhere('type','LIKE', "%$search%")
      ->orWhere('email','LIKE', "%$search%")
      ->orWhere('age','LIKE', "%$search%")
      ->orWhere('id','LIKE', "%$search%")->get();
      return response()->json(['searchResults'=>$Results], 200);
  }

}
?>
