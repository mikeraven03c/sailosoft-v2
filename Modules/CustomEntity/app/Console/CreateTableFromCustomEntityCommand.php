<?php

namespace Modules\CustomEntity\Console;

use Illuminate\Console\Command;
use Modules\CustomEntity\Services\CustomEntityDatabaseService;
use Stancl\Tenancy\Concerns\HasATenantsOption;
use Stancl\Tenancy\Concerns\TenantAwareCommand;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class CreateTableFromCustomEntityCommand extends Command
{
    use TenantAwareCommand, HasATenantsOption;

    protected $signature = "custom-entity:schema
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

        $databaseService->createCustomEntityTables();
        $this->info('Create tables successfully');
    }

    /**
     * Get the console command arguments.
     */
    // protected function getArguments(): array
    // {
    //     return [
    //         // ['example', InputArgument::REQUIRED, 'An example argument.'],
    //     ];
    // }

    /**
     * Get the console command options.
     */
    // protected function getOptions(): array
    // {
    //     return [
    //         // ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
    //     ];
    // }
}
