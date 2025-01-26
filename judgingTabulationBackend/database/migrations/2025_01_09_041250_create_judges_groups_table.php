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
        Schema::create('judges_groups', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('contest_id');
            $table->foreign('contest_id')->references('contest_id')->on('contest_judges')->cascadeOnDelete();

            // $table->foreignId('contest_id')->constrained('add_contests');

            $table->string('group_id');
            $table->foreign('group_id')->references('group_id')->on('contest_judges')->cascadeOnDelete();

            $table->unsignedBigInteger('judges_id');
            $table->foreign('judges_id')->references('judge_id')->on('contest_judges');

            $table->tinyInteger('is_finished')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('judges_groups');
    }
};
