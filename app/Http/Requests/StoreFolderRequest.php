<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFolderRequest extends FormRequest
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
            'user_id' => 'required|string',
            'foldername' => 'required|string|min:5|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'foldername.max' => 'Folder name is too long',
            'foldername.min' => 'Folder name is too short',

        ];
    }
}
