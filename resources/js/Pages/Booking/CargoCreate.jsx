import Layout from "@/Layouts/Layout";
import { formattingDateWithYear, formattingPrice } from "@/utils";
import { Head, useForm } from "@inertiajs/react";
import { setDate } from "date-fns";
import { toast } from "sonner";

export default function Create({ cargoPackage, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        cargo_package_id: cargoPackage.id,
        product_name: "",
        size: "",
        sender: auth?.user?.name,
        sender_address: "",
        recipient: "",
        recipient_address: "",
        delivery_date: new Date().toISOString().split("T")[0],
        notes: "",
        price: cargoPackage.price,
        amount: cargoPackage.price,
    });

    // Update amount saat size berubah
    const handlePassengerChange = (e) => {
        const size = parseInt(e.target.value, 10) || 1;
        setData("size", size);

        // Hitung berapa kali kapasitas melebihi kelipatan 1000
        const multiplier = Math.floor(size / 1000);

        // Hitung total harga berdasarkan kelipatan 1000
        const newTotalAmount =
            data.price + multiplier * cargoPackage.additional_price;

        setData("amount", newTotalAmount);
    };

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (cargoPackage.capacity_gram < data.size) {
            return toast.warning(
                "Not enough capacity. Only " +
                    cargoPackage.capacity_gram +
                    " gram available."
            );
        }

        post(route("cargo-booking.store"));
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
                                {cargoPackage.title}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {cargoPackage.category.name} &bull;{" "}
                                {cargoPackage.destination.name}
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
                                    {formattingPrice(cargoPackage.price)}
                                </p>
                            </div>
                            {/* Dates */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Tanggal
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {formattingDateWithYear(
                                        cargoPackage.departure_date
                                    )}
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
                                                    ((cargoPackage.max_capacity_gram -
                                                        cargoPackage.capacity_gram) /
                                                        cargoPackage.max_capacity_gram) *
                                                    100
                                                }%`,
                                            }}
                                            className="flex flex-col justify-center text-center text-white transition-all duration-300 bg-blue-500 whitespace-nowrap"
                                        ></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            Terisi:{" "}
                                            {cargoPackage.max_capacity_gram -
                                                cargoPackage.capacity_gram}{" "}
                                            / {cargoPackage.max_capacity_gram}
                                        </span>
                                        <span className="text-sm font-medium text-green-600">
                                            Tersedia:{" "}
                                            {cargoPackage.capacity_gram}
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
                                    {cargoPackage.driver}
                                </p>
                            </div>

                            {/* Car */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Mobil
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {cargoPackage.car.merk}{" "}
                                    {cargoPackage.car.name}{" "}
                                    {cargoPackage.car.tahun} [
                                    {cargoPackage.car.plate_number}]
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
                            {/* Nama Produk */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Nama Barang
                                </label>
                                <input
                                    type="text"
                                    value={data.product_name}
                                    onChange={(e) =>
                                        setData("product_name", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                                {errors.product_name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.product_name}
                                    </p>
                                )}
                            </div>

                            {/* Size */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Berat{" "}
                                    <span className="text-xs text-gray-400">
                                        (gram)
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    value={data.size}
                                    onChange={handlePassengerChange}
                                    min="1"
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                                {errors.size && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.size}
                                    </p>
                                )}
                            </div>

                            {/* Price (Readonly) */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Harga <br />
                                    <span className="text-xs text-gray-400">
                                        Jika berat lebih dari 1000 gram, biaya
                                        tambahan{" "}
                                        {formattingPrice(
                                            cargoPackage.additional_price
                                        )}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={formattingPrice(data.price)}
                                    className="w-full p-2 bg-gray-100 border rounded-md"
                                    readOnly
                                />
                            </div>

                            {/* Total Amount (Readonly) */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Total
                                </label>
                                <input
                                    type="text"
                                    value={formattingPrice(data.amount)}
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
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Kanan: Payment Details */}
                        <div>
                            {/* Sender */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Pengirim
                                </label>
                                <input
                                    type="text"
                                    value={data.sender}
                                    onChange={(e) =>
                                        setDate("sender", e.target.value)
                                    }
                                    className="w-full p-2 bg-gray-100 border rounded-md"
                                    readOnly
                                />
                                {errors.sender && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.sender}
                                    </p>
                                )}
                            </div>

                            {/* Sender Address */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Alamat Pengirim
                                </label>
                                <textarea
                                    type="text"
                                    onChange={(e) =>
                                        setData(
                                            "sender_address",
                                            e.target.value
                                        )
                                    }
                                    value={data.sender_address}
                                    className="w-full p-2 border rounded-md"
                                    rows={3}
                                />
                            </div>

                            {/* Recipient */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Penerima
                                </label>
                                <input
                                    type="text"
                                    value={data.recipient}
                                    onChange={(e) =>
                                        setData("recipient", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                                {errors.recipient && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.recipient}
                                    </p>
                                )}
                            </div>

                            {/* Recipient Address */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Alamat Penerima
                                </label>
                                <textarea
                                    type="text"
                                    onChange={(e) =>
                                        setData(
                                            "recipient_address",
                                            e.target.value
                                        )
                                    }
                                    value={data.recipient_address}
                                    className="w-full p-2 border rounded-md"
                                    rows={3}
                                />
                            </div>
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
