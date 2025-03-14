<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ExportLaporan implements FromCollection, WithMapping, WithHeadings, WithColumnFormatting, WithEvents
{
    public $nomor = 0;
    protected $data;

    /**
     * Terima data secara dinamis melalui constructor
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->data;
    }

    public function map($value): array
    {
        $this->nomor++;

        return [
            $this->nomor,
            $value->user->name,
            $value->booking_date,
            $value->travelPackage->title,
            $value->passenger_count,
            $value->travelPackage->price,
            $value->payment->amount,
        ];
    }

    /**
     * Custom format untuk kolom
     */
    public function columnFormats(): array
    {
        return [
            "A" => NumberFormat::FORMAT_TEXT, // Format teks
            'B' => NumberFormat::FORMAT_TEXT, // Format teks
            'C' => NumberFormat::FORMAT_DATE_DDMMYYYY, // Format teks
            'D' => NumberFormat::FORMAT_TEXT, // Format teks
            'E' => NumberFormat::FORMAT_TEXT, // Format text
            'F' => NumberFormat::FORMAT_ACCOUNTING_USD, // Format teks
            'G' => NumberFormat::FORMAT_ACCOUNTING_USD, // Format teks
        ];
    }

    /**
     * Tambahkan judul kolom
     */
    public function headings(): array
    {
        return [
            "No",
            'Customer',
            'Tanggal',
            'Paket',
            'Jumlah Penumpang',
            'Harga ',
            'Total',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet;

                // **1. Buat Heading Bold & Tengah**
                $sheet->getStyle('A1:G1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 12,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'D3D3D3'], // Warna abu-abu
                    ],
                ]);

                // **2. Auto-size Semua Kolom**
                foreach (range('A', 'G') as $column) {
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                }

                // **3. Tambahkan Filter di Heading**
                $sheet->setAutoFilter('A1:G1');

                // **4. Buat Border untuk Semua Data**
                $rowCount = $sheet->getHighestRow();
                $sheet->getStyle("A1:G$rowCount")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['rgb' => '000000'],
                        ],
                    ],
                ]);
            },
        ];
    }
}
