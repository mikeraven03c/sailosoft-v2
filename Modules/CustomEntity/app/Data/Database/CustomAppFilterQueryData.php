<?php

namespace Modules\CustomEntity\Data\Database;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\CustomEntity\Services\CustomEntityDatabaseService;

class CustomAppFilterQueryData
{
    const SORT_ASC = 'asc';
    const SORT_DESC = 'desc';
    const MODE_PAGINATE = 1;
    const MODE_ALL = 0;

    const METHOD_LATEST = 1;
    const METHOD_ASCENDING = 1;

    public function __construct(
        public int $paginate = 10,
        public ?string $sortBy = 'id',
        public string $sortMode = self::SORT_DESC,
        public ?array $filters = [],
        public ?string $search = '',
        public int $mode = self::MODE_PAGINATE,
        public int $method = self::METHOD_LATEST
    ) {}

    public static function fromRequest(Request $request): self
    {
        $sort = $request->query('sort');
        $sortMode = self::SORT_DESC;

        if ($sort) {
            $isDescending = Str::startsWith($sort, '-');

            if ($isDescending) {
                $sort = substr($sort, 1);
            }

            $sortMode = $isDescending ? 'desc' : 'asc';
        }

        return new static(
            search: $request->query('search', ''),
            sortBy: $sort,
            sortMode: $sortMode,
            filters: $request->query('filter', []),
            paginate: $request->query('per_page', 10)
        );
    }

    public function resolveSortQueryParams(string $sort): array
    {
        $isDescending = Str::startsWith($sort, '-');

        if ($isDescending) {
            $sort = substr($sort, 1);
        }

        return [$sort, $isDescending ? 'desc' : 'asc'];

        return [];
    }

    public function isLatest() : bool
    {
        return $this->method == self::METHOD_LATEST;
    }

    public function isPaginate() : bool
    {
        return $this->mode == self::MODE_PAGINATE;
    }
}
