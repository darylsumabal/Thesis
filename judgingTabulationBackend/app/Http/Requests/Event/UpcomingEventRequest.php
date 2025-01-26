<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class UpcomingEventRequest extends FormRequest
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
            'contest_name' => 'required|string|min:1',
            'contest_description' => 'required|string|min:1',
            'contest_scoring_type' => 'required|string|min:1',
            'contest_venue' => 'required|string|min:1',
            'contest_poster' => 'required|image|mimes:png,jpg,jpeg,svg,jfif|max:20480',
        ];
    }
}
