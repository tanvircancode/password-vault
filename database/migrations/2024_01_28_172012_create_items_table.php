items

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
        Schema::create('items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable(false);
            $table->uuid('folder_id')->nullable();
            $table->uuid('organization_id')->nullable();
            $table->integer('type')->nullable();
            $table->string('name')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('favorite')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
            ->references('id')->on('users')
            ->onDelete('cascade');

            $table->foreign('folder_id')
            ->references('id')->on('folders')
            ->onDelete('cascade');

            $table->foreign('organization_id')
            ->references('id')->on('organizations')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
