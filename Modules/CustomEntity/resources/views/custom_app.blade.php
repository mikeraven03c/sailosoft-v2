<x-filament-panels::page>
    <ul class="filament-list space-y-4">
        @foreach ($customEntities as $customEntity)
            <li
                class="filament-list-item flex items-center gap-2 rounded-md bg-white dark:bg-gray-800 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <a href="/app/custom-apps/{{$customEntity->navigation}}" wire:navigate>
                    {{-- <span class="filament-icon-document text-gray-500 dark:text-gray-400"></span> --}}
                    <span class="text-gray-700 dark:text-gray-200 font-medium">
                        {{ $customEntity->name }}
                    </span>
                </a>
            </li>
        @endforeach

    </ul>
</x-filament-panels::page>
