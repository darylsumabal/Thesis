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
        Schema::create('total_scores_multiple_rounds', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('participant_id');
            $table->foreign('participant_id')->references('participant_id')->on('judging_multiple_rounds')->cascadeOnDelete();

            $table->unsignedBigInteger('contest_id');
            $table->foreign('contest_id')->references('contest_id')->on('judging_multiple_rounds')->cascadeOnDelete();

            $table->string('group_id');
            $table->foreign('group_id')->references('group_id')->on('judging_multiple_rounds')->cascadeOnDelete();

            $table->string("evaluationCriterion");
            $table->integer('score');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('total_scores_multiple_rounds');
    }
};
