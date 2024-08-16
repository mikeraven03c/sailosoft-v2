<?php

namespace Modules\CustomEntity\Console;

use Illuminate\Console\Command;
use Stancl\Tenancy\Concerns\HasATenantsOption;
use Stancl\Tenancy\Concerns\TenantAwareCommand;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Modules\CustomEntity\Services\CustomEntityDatabaseService;

class ClearTableFromCustomEntityCommand extends Command
{
    use TenantAwareCommand, HasATenantsOption;

    protected $signature = "custom-entity:clear
                            {--tenants=* : The tenant(s) to run the command for. Default: all}";

    /**
     * The console command description.
     */
    protected $description = 'Command description.';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $databaseService = app(CustomEntityDatabaseService::class);

        $databaseService->dropCustomEntityTables(function ($table) {
            $this->info('Dropping table ' . $table);
        });
        $this->info('Clear tables successfully');
    }

}
