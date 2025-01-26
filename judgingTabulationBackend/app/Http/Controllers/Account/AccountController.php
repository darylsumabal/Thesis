<?php

namespace App\Http\Controllers\Account;


use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountRequest;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $account = Account::select('id', 'name', 'email', 'accountType')->get();

        return response()->json(['account' => $account]);
    }


    public function updateAccount(Request $request, $id)
    {
        $account = Account::findOrFail($id);

        $validated = $request->validate([
            'password' => [
                'required',
                'confirmed',
                Password::min(6)
            ]
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        $account->update($validated);

        return response()->json(['message' => 'Account update successfully'], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(AccountRequest $request)
    {

        $validate = $request->validated();


        $user = Account::create([
            'name' => $validate['name'],
            'email' => $validate['email'],
            'accountType' => $validate['accountType'],
            'password' => bcrypt($validate['password']),
        ]);

        return response()->json(['message' =>
        'Account created', 'account' => $user], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $account = Account::findOrFail($id);
        return response()->json(['account' => $account]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $account = Account::findOrFail($id);
        $validated = $request->validate([
            'name' => 'min:1|string',
        ]);
        $account->update($validated);

        return response()->json(['message' => 'Account edit succuess', 200]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $account = Account::findOrFail($id);
        $account->delete();
        return response()->json(['message' => 'Account deleted successfully']);
    }
}
