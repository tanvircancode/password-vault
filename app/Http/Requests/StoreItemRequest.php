<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
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
            'type' => 'nullable|integer|between:1,4',
            'name' => 'nullable|string|max:255',
            'folder_id' => 'nullable|string',
            'notes' => 'nullable|string|max:500',
            'organization_id' => 'nullable|string',
            'favorite' => 'boolean'
        ];
    }

    public function messages(): array
    {
        return [
            'type.min' => 'Type is not valid',
            'type.max' => 'Type is not valid',
            'notes.max' => 'Text is too long',
            'name.max' => 'Please Try To Use Shorter Name',
        ];
    }
}
