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
        Schema::rename('criterias', 'point_based_criterias');
        Schema::rename('overall_scores', 'overall_scores_points');
        Schema::rename('result_scores', 'total_scores_point_bases');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('point_based_criterias', 'criterias');
        Schema::rename('overall_scores_points', 'overall_scores');
        Schema::rename('total_scores_point_bases', 'result_scores');
    }
};
