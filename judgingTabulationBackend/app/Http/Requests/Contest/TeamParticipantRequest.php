<?php

namespace App\Http\Requests\Contest;

use Illuminate\Foundation\Http\FormRequest;

class TeamParticipantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'team_name' => 'required|string|min:1',
            'team_description' => 'required|string|min:1',
            'team_captain' => 'required|string|min:1',
            'poster_url' => 'required|image|mimes:png,jpg,jpeg,svg,jfif|max:20480'
        ];
    }
}
