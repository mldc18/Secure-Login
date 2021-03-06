<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check())
        return redirect()->action([App\Http\Controllers\HomeController::class, 'index']);
    return view('auth.login');
});

Auth::routes();

Route::middleware(['auth'])->group(function () {
    Route::middleware(['password_expired'])->group(function () {
        Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
        Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'index'])->name('profile');
        Route::get('/logout',  [App\Http\Controllers\Auth\LoginController::class, 'logout']);
        Route::post('/create-album', [App\Http\Controllers\ProfileController::class, 'createAlbum'])->name('create-album');
        Route::post('/delete-album/{id}', [App\Http\Controllers\ProfileController::class, 'deleteAlbum'])->name('delete-album');
        Route::patch('/choose-album/{id}', [App\Http\Controllers\ProfileController::class, 'chooseAlbum'])->name('choose-album');  
    });
    Route::get('/password/expired', [App\Http\Controllers\Auth\ExpiredPasswordController::class, 'expired'])->name('password.expired');
    Route::post('/password/post_expired', [App\Http\Controllers\Auth\ExpiredPasswordController::class, 'postExpired'])->name('password.post_expired');
});
Route::get('/sign-in/google', [App\Http\Controllers\Auth\LoginController::class, 'google'])->middleware('guest');
Route::get('/sign-in/google/redirect', [App\Http\Controllers\Auth\LoginController::class, 'googleRedirect'])->middleware('guest');
