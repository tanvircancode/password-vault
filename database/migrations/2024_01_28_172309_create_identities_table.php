identities

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('identities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('item_id')->nullable(false);
            $table->string('title')->nullable();
            $table->string('email')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('security')->nullable(false);
            $table->string('license')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();

            $table->foreign('item_id')
            ->references('id')->on('items')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('identities');
    }
};
