<?php

namespace Modules\Multitenancy\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class MigrateCentralDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'central:migrate';

    /**
     * The console command description.
     */
    protected $description = 'Run a migrate for central database';

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
        Artisan::call('migrate', ['--path' => "Modules/Multitenancy/database/migrations"]);
        echo Artisan::output();
    }

    /**
     * Get the console command arguments.
     */
    protected function getArguments(): array
    {
        return [
            // ['example', InputArgument::REQUIRED, 'An example argument.'],
        ];
    }

    /**
     * Get the console command options.
     */
    protected function getOptions(): array
    {
        return [
            // ['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
        ];
    }
}
