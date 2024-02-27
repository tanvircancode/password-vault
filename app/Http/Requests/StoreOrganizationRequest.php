<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrganizationRequest extends FormRequest
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
            'orgname' => 'nullable|string|min:5|max:255',
            'email' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'orgname.min' => 'Organization name is too short',
            'orgname.max' => 'Organization name is too long',
        ];
    }
}
