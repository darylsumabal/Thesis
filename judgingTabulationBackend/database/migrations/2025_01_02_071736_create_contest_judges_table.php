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
        Schema::create('contest_judges', function (Blueprint $table) {
            $table->id();
            $table->string('group_id');
            $table->index('group_id'); 
            $table->unsignedBigInteger('judge_id');
            $table->foreign('judge_id')->references('id')->on('accounts')->onDelete('cascade');
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
        Schema::dropIfExists('contest_judges');
    }
};




            // $table->float('score')->nullable();
            // $table->unsignedBigInteger('criteria_id');
            // $table->foreign('criteria_id')->references('id')->on('criterias')->onDelete('cascade');

            // $table->unsignedBigInteger('judges_id');
            // $table->foreign('judges_id')->references('id')->on('contest_judges')->onDelete('cascade');

            // $table->unsignedBigInteger('contest_id');
            // $table->foreign('contest_id')->references('id')->on('add_contests')->onDelete('cascade');