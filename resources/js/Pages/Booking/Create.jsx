import Layout from "@/Layouts/Layout";
import { formatDate, formattingPrice } from "@/utils";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Create({ travelPackage, bookingSeats }) {
    const { data, setData, post, processing, errors } = useForm({
        travel_package_id: travelPackage.id,
        booking_date: new Date().toISOString().split("T")[0],
        passenger_count: 1,
        price: travelPackage.price,
        total_amount: travelPackage.price,
        payment_method: "",
        payment_status: "",
        bukti_bayar: null,
        jumlah_dp: 0,
        notes: "",
        seats: [],
    });

    // Update total_amount saat passenger_count berubah
    const handlePassengerChange = (e) => {
        const count = parseInt(e.target.value, 10) || 1;
        setData("passenger_count", count);
        setData("total_amount", count * data.price);
        if (count < data.seats.length) {
            setData("seats", data.seats.slice(0, count));
        }
    };

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.passenger_count || !data.payment_method)
            return toast.warning("Pastikan semua data telah diisi");

        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        const file = data.bukti_bayar;

        if (file) {
            if (!validImageTypes.includes(file.type)) {
                toast.warning("File harus berupa gambar (JPEG/PNG)");
                return;
            }

            if (file.size > maxSize) {
                toast.warning("Ukuran file tidak boleh lebih dari 2MB");
                return;
            }
        }

        if (data.seats.length < data.passenger_count) {
            toast.warning(
                `Silakan pilih ${
                    data.passenger_count - data.seats.length
                } kursi lagi untuk melanjutkan.`
            );
            return;
        }

        console.log(data);

        post(route("booking.store"));
    };

    return (
        <Layout>
            <Head title="Buat Pemesanan" />
            <div className="container p-6 mx-auto">
                <h1 className="mb-6 text-2xl font-bold text-center">
                    Buat Pemesanan
                </h1>

                {/* Card Menampilkan Data Travel Package */}
                <div className="mb-6">
                    <div className="relative overflow-hidden transition-all duration-300 transform bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg ">
                        {/* Decorative Accent */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-teal-400"></div>
                        {/* Header */}
                        <div className="px-6 py-4 bg-gray-50">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {travelPackage.title}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {travelPackage.category.name} &bull;{" "}
                                {travelPackage.destination.name}
                            </p>
                        </div>
                        {/* Detail Grid */}
                        <div className="grid grid-cols-1 px-6 py-4 sm:grid-cols-2 gap-y-4 gap-x-6">
                            {/* Price */}
                            <div>
                                <p className="text-xs text-gray-500 uppercase">
                                    Harga
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {formattingPrice(travelPackage.price)}
                                </p>
                            </div>
                            {/* Duration */}
                            <div>
                                <p className="text-xs text-gray-500 uppercase">
                                    Durasi
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {travelPackage.duration_days} hari
                                </p>
                            </div>
                            {/* Dates */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Tanggal
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {formatDate(travelPackage.start_date)} -{" "}
                                    {formatDate(travelPackage.end_date)}
                                </p>
                            </div>
                            {/* Capacity & Available Capacity with Progress Bar */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Kapasitas
                                </p>
                                <div className="relative pt-1">
                                    <div className="flex h-2 mb-2 overflow-hidden text-xs bg-gray-200 rounded">
                                        <div
                                            style={{
                                                width: `${
                                                    ((travelPackage.capacity -
                                                        travelPackage.available_capacity) /
                                                        travelPackage.capacity) *
                                                    100
                                                }%`,
                                            }}
                                            className="flex flex-col justify-center text-center text-white transition-all duration-300 bg-blue-500 whitespace-nowrap"
                                        ></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            Terpesan:{" "}
                                            {travelPackage.capacity -
                                                travelPackage.available_capacity}{" "}
                                            / {travelPackage.capacity}
                                        </span>
                                        <span className="text-sm font-medium text-green-600">
                                            Tersedia:{" "}
                                            {travelPackage.available_capacity}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Driver */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Sopir
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {travelPackage.driver}
                                </p>
                            </div>

                            {/* Car */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Mobil
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {travelPackage.car.merk}{" "}
                                    {travelPackage.car.name}{" "}
                                    {travelPackage.car.tahun} [
                                    {travelPackage.car.plate_number}]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Input Booking */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 bg-white rounded-lg shadow-md"
                >
                    {/* Grid Layout: 1 Kolom di Mobile, 2 Kolom di md ke atas */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Kiri: Booking Details */}
                        <div>
                            {/* Passenger Count */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Jumlah Penumpang
                                </label>
                                <input
                                    type="number"
                                    value={data.passenger_count}
                                    onChange={handlePassengerChange}
                                    min="1"
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                                {errors.passenger_count && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.passenger_count}
                                    </p>
                                )}
                            </div>

                            {/* Price (Readonly) */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    value={formattingPrice(data.price)}
                                    className="w-full p-2 bg-gray-100 border rounded-md"
                                    readOnly
                                />
                            </div>

                            {/* Notes */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Catatan
                                </label>
                                <textarea
                                    type="text"
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    value={data.notes}
                                    className="w-full p-2 border rounded-md"
                                    rows={5}
                                />
                            </div>

                            {/* Kursi */}
                            {data.passenger_count && (
                                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-700">
                                        Pilih Kursi:
                                    </h2>
                                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
                                        {Array.from({
                                            length: travelPackage.capacity,
                                        }).map((_, index) => {
                                            // Cek apakah kursi dengan nomor (index+1) sudah ada di bookingSeats
                                            const isBooked = bookingSeats.some(
                                                (seat) =>
                                                    Number(seat.seat_number) ===
                                                    index + 1
                                            );
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`seat-${index}`}
                                                        disabled={isBooked}
                                                        className={`hidden ${
                                                            data.seats.includes(
                                                                index + 1
                                                            ) && "peer"
                                                        }`}
                                                        onChange={(e) => {
                                                            const isChecked =
                                                                e.target
                                                                    .checked;

                                                            if (isChecked) {
                                                                const seatsLength =
                                                                    data.seats
                                                                        .length +
                                                                    1;
                                                                if (
                                                                    seatsLength <=
                                                                    data.passenger_count
                                                                ) {
                                                                    setData(
                                                                        "seats",
                                                                        [
                                                                            ...data.seats,
                                                                            index +
                                                                                1,
                                                                        ]
                                                                    );
                                                                    return;
                                                                }
                                                                toast.warning(
                                                                    "Pemilihan kursi sudah mencapai maksimal"
                                                                );
                                                                return;
                                                            } else {
                                                                setData(
                                                                    "seats",
                                                                    data.seats.filter(
                                                                        (
                                                                            seat
                                                                        ) =>
                                                                            seat !==
                                                                            index +
                                                                                1
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`seat-${index}`}
                                                        className={`flex items-center justify-center p-3 text-sm font-medium transition-all duration-300 border border-gray-300 rounded-md ${
                                                            isBooked
                                                                ? "cursor-not-allowed bg-gray-300"
                                                                : "cursor-pointer hover:border-blue-500 peer-checked:border-2 peer-checked:border-blue-500"
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Kanan: Payment Details */}
                        <div>
                            {/* Total Amount (Readonly) */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Jumlah Total
                                </label>
                                <input
                                    type="text"
                                    value={formattingPrice(data.total_amount)}
                                    className="w-full p-2 bg-gray-100 border rounded-md"
                                    readOnly
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Metode Pembayaran
                                </label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => {
                                        let payment_method = e.target.value;
                                        setData(
                                            "payment_method",
                                            payment_method
                                        );

                                        if (payment_method == "Transfer") {
                                            setData("payment_status", "DP");
                                        } else {
                                            setData("payment_status", "Unpaid");
                                            setData("jumlah_dp", 0);
                                            setData("bukti_bayar", null);
                                        }
                                    }}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value={""}>
                                        Pilih Metode Pembayaran
                                    </option>
                                    <option value="Cash">Cash</option>
                                    <option value="Transfer">Transfer</option>
                                </select>
                            </div>

                            {data.payment_method == "Transfer" && (
                                <>
                                    {/* Rekening TF */}
                                    <p className="text-sm font-bold text-green-600">
                                        Silakan Transfer ke rekening BNI :
                                        123456789098765 Rexy Prasetiya. <br />
                                        Nominal transfer:{" "}
                                        {formattingPrice(
                                            (data.total_amount * 50) / 100
                                        )}{" "}
                                        untuk uang muka.
                                    </p>
                                    {/* Bukti TF */}
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">
                                            Unggah Bukti Transfer
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) =>
                                                setData(
                                                    "bukti_bayar",
                                                    e.target.files[0]
                                                )
                                            }
                                            className="w-full p-2 border rounded-md form-input"
                                            required
                                        />
                                    </div>
                                    {/* Jumlah TF */}
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">
                                            Jumlah Transfer
                                        </label>
                                        <input
                                            type="number"
                                            value={data.jumlah_dp}
                                            onChange={(e) =>
                                                setData(
                                                    "jumlah_dp",
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-full p-2 border rounded-md form-input"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-800 disabled:bg-gray-400 md:w-1/2"
                        >
                            {processing
                                ? "Sedang Diproses..."
                                : "Buat Pemesanan"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
