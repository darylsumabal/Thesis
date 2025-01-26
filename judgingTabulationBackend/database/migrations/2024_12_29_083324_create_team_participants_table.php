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
        Schema::create('team_participants', function (Blueprint $table) {
            $table->id();
            $table->string('team_name');
            $table->text('team_description');
            $table->string('team_captain');
            $table->string('poster_url');
            $table->unsignedBigInteger('contest_id');
            $table->foreign('contest_id')->references('id')->on('add_contests')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_participants');
    }
};
