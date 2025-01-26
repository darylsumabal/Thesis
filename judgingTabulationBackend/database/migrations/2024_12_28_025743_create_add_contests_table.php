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
        Schema::create('add_contests', function (Blueprint $table) {
            $table->id();
            $table->string('contest_name');
            $table->string('contest_description');
            $table->string('contest_scoring_type');
            $table->string('contest_venue');
            $table->string('contest_poster');
            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('add_events')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('add_contests');
    }
};
