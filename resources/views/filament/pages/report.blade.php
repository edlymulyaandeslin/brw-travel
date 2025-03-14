<x-filament-panels::page>
    <div class="flex flex-wrap items-end justify-between p-4 mb-4 bg-gray-900 rounded-lg shadow-md dark:bg-gray-800">
        <form method="GET" action="{{ request()->url() }}" class="flex flex-wrap items-end gap-x-4">
            <!-- Input Start Date -->
            <div class="flex flex-col">
                <label for="start_date" class="mb-1 text-sm text-gray-300">Dari Tanggal:</label>
                <input type="date" name="start_date" id="start_date" value="{{ request('start_date') }}"
                    class="p-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-md dark:bg-gray-700
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-400 min-w-[180px] w-full md:w-auto">
            </div>

            <!-- Input End Date -->
            <div class="flex flex-col">
                <label for="end_date" class="mb-1 text-sm text-gray-300">Sampai Tanggal:</label>
                <input type="date" name="end_date" id="end_date" value="{{ request('end_date') }}"
                    class="p-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-md dark:bg-gray-700
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-400 min-w-[180px] w-full md:w-auto">
            </div>

            <!-- Button Filter -->
            <button type="submit"
                style="background-color: #4B5563; color: #ffffff; padding: 10px 16px;
                         font-weight: 600; border-radius: 8px; border: none;
                         transition: background-color 0.3s ease-in-out;
                         box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"
                onmouseover="this.style.backgroundColor='#6B7280'" onmouseout="this.style.backgroundColor='#4B5563'">
                Filter
            </button>
        </form>

        @if ($reportData->count() > 0)
            <div class="flex items-end justify-end mb-4">
                <a href="{{ route('laporan.export', ['start_date' => request('start_date'), 'end_date' => request('end_date')]) }}"
                    style="background-color: #16A34A; color: #ffffff; padding: 10px 16px;
                       font-weight: 600; border-radius: 8px; border: none;
                       transition: background-color 0.3s ease-in-out;
                       text-decoration: none; display: inline-block;"
                    onmouseover="this.style.backgroundColor='#22C55E'"
                    onmouseout="this.style.backgroundColor='#16A34A'">
                    Cetak Laporan
                </a>

            </div>
        @endif
    </div>

    <!-- Tombol Cetak Laporan -->
    <div class="overflow-x-auto">
        <table class="w-full bg-gray-900 divide-y divide-gray-700">
            <thead class="bg-gray-800">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                        Customer
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                        Tanggal
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                        Paket
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                        Jumlah Penumpang
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                        Harga
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                        Total
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                @foreach ($reportData as $item)
                    <tr class="hover:bg-gray-700">
                        <td class="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                            {{ $item->user->name }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                            {{ \Carbon\Carbon::parse($item->booking_date)->format('d M Y') }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                            {{ $item->travelPackage->title }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                            {{ $item->passenger_count }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                            Rp{{ number_format($item->travelPackage->price) }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                            Rp{{ number_format($item->payment->amount) }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- Custom Pagination --}}
        @if ($reportData->hasPages())
            <nav role="navigation" aria-label="Pagination Navigation" class="flex justify-center mt-4">
                <div class="inline-flex items-center gap-1 space-x-1">
                    {{-- Tombol Previous --}}
                    @if ($reportData->onFirstPage())
                        <span class="px-4 py-2 text-gray-500 bg-gray-700 border border-gray-600 rounded-md">
                            {!! __('pagination.previous') !!}
                        </span>
                    @else
                        <a href="{{ $reportData->previousPageUrl() }}"
                            class="px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
                            rel="prev" aria-label="{{ __('pagination.previous') }}">
                            {!! __('pagination.previous') !!}
                        </a>
                    @endif

                    {{-- Elemen Halaman --}}
                    @foreach ($reportData->links()->elements as $element)
                        {{-- Separator ("...") --}}
                        @if (is_string($element))
                            <span class="px-4 py-2 text-gray-500 bg-gray-700 border border-gray-600 rounded-md">
                                {{ $element }}
                            </span>
                        @endif

                        {{-- Tautan Halaman --}}
                        @if (is_array($element))
                            @foreach ($element as $page => $url)
                                @if ($page == $reportData->currentPage())
                                    <span class="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-md">
                                        {{ $page }}
                                    </span>
                                @else
                                    <a href="{{ $url }}"
                                        class="px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
                                        aria-label="{{ __('Go to page :page', ['page' => $page]) }}">
                                        {{ $page }}
                                    </a>
                                @endif
                            @endforeach
                        @endif
                    @endforeach

                    {{-- Tombol Next --}}
                    @if ($reportData->hasMorePages())
                        <a href="{{ $reportData->nextPageUrl() }}"
                            class="px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
                            rel="next" aria-label="{{ __('pagination.next') }}">
                            {!! __('pagination.next') !!}
                        </a>
                    @else
                        <span class="px-4 py-2 text-gray-500 bg-gray-700 border border-gray-600 rounded-md">
                            {!! __('pagination.next') !!}
                        </span>
                    @endif
                </div>
            </nav>
        @endif

    </div>
</x-filament-panels::page>
