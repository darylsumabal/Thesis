<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class AddEventRequest extends FormRequest
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
            'name' => 'required|string|min:1',
            'description' => 'required|string|min:1',
            'date' => 'required|date',
            'organizer' => 'required|string|min:1',
            'venue' => 'required|string|min:1',
            'poster' => 'required|image|mimes:png,jpg,jpeg,jfif|max:20480'
        ];
    }
}
