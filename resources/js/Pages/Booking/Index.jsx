import Layout from "@/Layouts/Layout";
import { formattingDateWithYear, formattingPrice } from "@/utils";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Eye, X } from "react-feather";

export default function Index({ bookings }) {
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
    };

    const closeModal = () => {
        setSelectedBooking(null);
    };

    return (
        <Layout>
            <Head title="My Booking" />
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">My Bookings</h1>
                {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                            <thead className="text-white bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Travel Package
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Booking Date
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Passengers
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Travel Price
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Payment Amount
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Payment Method
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Payment Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-100"
                                    >
                                        <td className="px-4 py-2">
                                            {booking.travel_package.title}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingDateWithYear(
                                                booking.booking_date
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.passenger_count}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(
                                                booking.travel_package.price
                                            )}
                                            /person
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                                    booking.status ===
                                                    "Confirmed"
                                                        ? "bg-green-200 text-green-800"
                                                        : booking.status ===
                                                          "Pending"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : booking.status ===
                                                          "Completed"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : booking.status ===
                                                          "Cancelled"
                                                        ? "bg-red-200 text-red-800"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(
                                                booking.payment.amount
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.payment.payment_method}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                                    booking.payment.status ===
                                                    "Paid"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                            >
                                                {booking.payment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    handleViewBooking(booking)
                                                }
                                                className="flex items-center justify-center p-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No bookings found.</p>
                )}
            </div>
            {selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full h-full p-4 overflow-y-auto bg-white shadow-lg md:h-auto md:max-w-3xl md:rounded-lg md:p-6">
                        {/* Tombol Close */}
                        <button
                            onClick={closeModal}
                            className="absolute text-gray-600 top-4 right-4 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <h2 className="mb-6 text-2xl font-bold text-center">
                            Booking Details
                        </h2>

                        {/* Konten Modal */}
                        <div className="space-y-4 text-sm text-gray-700 md:text-base">
                            <p>
                                <strong>Package:</strong>{" "}
                                {selectedBooking.travel_package.title}
                            </p>
                            <p>
                                <strong>Destination:</strong>{" "}
                                {
                                    selectedBooking.travel_package.destination
                                        .name
                                }
                            </p>
                            <p>
                                <strong>Booking Date:</strong>{" "}
                                {formattingDateWithYear(
                                    selectedBooking.booking_date
                                )}
                            </p>
                            <p>
                                <strong>Passengers:</strong>{" "}
                                {selectedBooking.passenger_count}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                        selectedBooking.status === "Confirmed"
                                            ? "bg-green-200 text-green-800"
                                            : selectedBooking.status ===
                                              "Pending"
                                            ? "bg-yellow-200 text-yellow-800"
                                            : selectedBooking.status ===
                                              "Completed"
                                            ? "bg-blue-200 text-blue-800"
                                            : selectedBooking.status ===
                                              "Cancelled"
                                            ? "bg-red-200 text-red-800"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {selectedBooking.status}
                                </span>
                            </p>
                            <p>
                                <strong>Payment Amount:</strong>{" "}
                                {formattingPrice(
                                    selectedBooking.payment.amount
                                )}
                            </p>
                            <p>
                                <strong>Payment Method:</strong>{" "}
                                {selectedBooking.payment.payment_method}
                            </p>
                            <p>
                                <strong>Payment Status:</strong>{" "}
                                <span
                                    className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                        selectedBooking.payment.status ===
                                        "Paid"
                                            ? "bg-blue-200 text-blue-800"
                                            : "bg-red-200 text-red-800"
                                    }`}
                                >
                                    {selectedBooking.payment.status}
                                </span>
                            </p>
                        </div>

                        {/* Tombol Close */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
