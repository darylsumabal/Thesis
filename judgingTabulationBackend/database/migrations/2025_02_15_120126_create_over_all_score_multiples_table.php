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
        Schema::create('over_all_score_multiples', function (Blueprint $table) {
            $table->id();

            $table->decimal('score', 10, 2);

            $table->unsignedBigInteger('participant_id');
            $table->foreign('participant_id')->references('participant_id')->on('judging_multiple_rounds')->cascadeOnDelete();

            $table->unsignedBigInteger('contest_id');
            $table->foreign('contest_id')->references('contest_id')->on('judging_multiple_rounds')->cascadeOnDelete();

            $table->string('group_id');
            $table->foreign('group_id')->references('group_id')->on('judging_multiple_rounds')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('over_all_score_multiples');
    }
};
