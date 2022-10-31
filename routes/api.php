<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Events\Message;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("send", function (Request $request) {
    // broadcast(new Message())->toOthers();
    Message::broadcast();
    return response("OK");
});

Route::post('/websocket/auth', function (Request $request) {
    $pusher = new Pusher\Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'));
    return $pusher->authorizeChannel($request->request->get('channel_name'), $request->request->get('socket_id'));
});
