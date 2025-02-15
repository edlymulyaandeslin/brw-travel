import Layout from "@/Layouts/Layout";
import { formatDate, formattingPrice } from "@/utils";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function Create({ travelPackage }) {
    const { data, setData, post, processing, errors } = useForm({
        travel_package_id: travelPackage.id,
        booking_date: "",
        passenger_count: 1,
        price: travelPackage.price,
        total_amount: travelPackage.price,
        payment_method: "",
        payment_status: "Unpaid",
    });

    // Update total_amount saat passenger_count berubah
    const handlePassengerChange = (e) => {
        const count = parseInt(e.target.value, 10) || 1;
        setData("passenger_count", count);
        setData("total_amount", count * data.price);
    };

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        const now = new Date().toLocaleDateString("en-CA");

        if (!data.booking_date || !data.passenger_count || !data.payment_method)
            return toast.warning("Pastikan semua data telah diisi");

        if (data.booking_date < now) {
            return toast.warning(
                "Tanggal booking tidak boleh kurang dari hari ini"
            );
        }

        post(route("booking.store"));
    };

    return (
        <Layout>
            <Head title="Create Booking" />
            <div className="container p-6 mx-auto">
                <h1 className="mb-6 text-2xl font-bold text-center">
                    Create Booking
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
                                    Price
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {formattingPrice(travelPackage.price)}
                                </p>
                            </div>
                            {/* Duration */}
                            <div>
                                <p className="text-xs text-gray-500 uppercase">
                                    Duration
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {travelPackage.duration_days} days
                                </p>
                            </div>
                            {/* Dates */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Dates
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {formatDate(travelPackage.start_date)} -{" "}
                                    {formatDate(travelPackage.end_date)}
                                </p>
                            </div>
                            {/* Capacity & Available Capacity with Progress Bar */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Capacity
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
                                            Booked:{" "}
                                            {travelPackage.capacity -
                                                travelPackage.available_capacity}{" "}
                                            / {travelPackage.capacity}
                                        </span>
                                        <span className="text-sm font-medium text-green-600">
                                            Available:{" "}
                                            {travelPackage.available_capacity}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Agent */}
                            <div className="sm:col-span-2">
                                <p className="text-xs text-gray-500 uppercase">
                                    Agent
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                    {travelPackage.agent}
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
                            {/* Booking Date */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Booking Date
                                </label>
                                <input
                                    type="date"
                                    value={data.booking_date}
                                    onChange={(e) =>
                                        setData("booking_date", e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                                {errors.booking_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.booking_date}
                                    </p>
                                )}
                            </div>

                            {/* Passenger Count */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Passenger Count
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
                                    Price
                                </label>
                                <input
                                    type="text"
                                    value={formattingPrice(data.price)}
                                    className="w-full p-2 bg-gray-100 border rounded-md"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Kanan: Payment Details */}
                        <div>
                            {/* Total Amount (Readonly) */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">
                                    Total Amount
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
                                    Payment Method
                                </label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) =>
                                        setData(
                                            "payment_method",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value={""}>
                                        Select Payment Method
                                    </option>
                                    <option value="Cash">Cash</option>
                                </select>
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
                            {processing ? "Processing..." : "Create Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
