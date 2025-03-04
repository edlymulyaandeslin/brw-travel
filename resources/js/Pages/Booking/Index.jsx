import Layout from "@/Layouts/Layout";
import { formatDate, formattingDateWithYear, formattingPrice } from "@/utils";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Eye, X } from "react-feather";
import { FaPrint } from "react-icons/fa6";

export default function Index({ bookings }) {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const appName = import.meta.env.VITE_APP_NAME;
    console.log(appName);

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
    };

    const handlePrintBooking = (booking) => {
        // Buat konten HTML dengan tampilan nota yang diperbesar
        const printContent = `
          <html>
            <head>
              <title>Booking Receipt</title>
              <style>
                body {
                  font-family: 'Courier New', Courier, monospace;
                  margin: 0;
                  padding: 40px;
                  background: #f9f9f9;
                  color: #333;
                  font-size: 24px;
                }
                .receipt {
                  max-width: 1000px;
                  margin: 0 auto;
                  background: #fff;
                  border: 2px solid #333;
                  padding: 40px;
                }
                .receipt header {
                  text-align: center;
                  border-bottom: 3px solid #333;
                  padding-bottom: 20px;
                  margin-bottom: 40px;
                }
                .receipt header h1 {
                  margin: 0;
                  font-size: 48px;
                }
                .receipt header p {
                  margin: 10px 0;
                  font-size: 28px;
                }
                .receipt .details p {
                  margin: 15px 0;
                  font-size: 28px;
                  line-height: 1.6;
                }
                .receipt .details p span {
                  display: inline-block;
                  width: 300px;
                  font-weight: bold;
                }
                .receipt footer {
                  text-align: center;
                  border-top: 3px solid #333;
                  padding-top: 20px;
                  margin-top: 40px;
                  font-size: 24px;
                }
              </style>
            </head>
            <body>
              <div class="receipt">
                <header>
                  <h1>Booking Receipt</h1>
                  <p>${appName}</p>
                  <p>Date: ${formattingDateWithYear(booking.booking_date)}</p>
                </header>
                <div class="details">
                  <p><span>Package:</span> ${booking.travel_package.title}</p>
                  <p><span>Destination:</span> ${
                      booking.travel_package.destination.name
                  }</p>
                  <p><span>Booking Date:</span> ${formattingDateWithYear(
                      booking.booking_date
                  )}</p>
                  <p><span>Passengers:</span> ${booking.passenger_count}</p>
                  <p><span>Price:</span> ${formattingPrice(
                      booking.travel_package.price
                  )}/person</p>
                  <p><span>Payment Method:</span> ${
                      booking.payment.payment_method
                  }</p>
                  <p><span>Down Payment:</span> ${formattingPrice(
                      booking.payment.jumlah_dp
                  )}</p>
                  <p><span>Amount:</span> ${formattingPrice(
                      booking.payment.amount
                  )}</p>
                  <p><span>Remaining:</span> ${formattingPrice(
                      booking.payment.amount - booking.payment.jumlah_dp
                  )}</p>
                  <p><span>Status:</span> ${booking.status}</p>
                  <p><span>Payment Status:</span> ${booking.payment.status}</p>
                </div>
                <footer>
                  <p>Thank you for your booking!</p>
                  <p>Contact us: yourcompany@example.com</p>
                </footer>
              </div>
            </body>
          </html>
        `;

        const newWindow = window.open("", "", "width=1200,height=800");
        newWindow.document.write(printContent);
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
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
                                        Destination
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
                                        Payment Method
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Down Payment
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Amount
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Remaining Payment
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Payment Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Action
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
                                            {
                                                booking.travel_package
                                                    .destination.name
                                            }
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
                                            {booking.payment.payment_method}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(
                                                booking.payment.jumlah_dp
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(
                                                booking.payment.amount
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(
                                                booking.payment.amount -
                                                    booking.payment.jumlah_dp
                                            )}
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
                                            <span
                                                className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                                    booking.payment.status ===
                                                    "Paid"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : booking.payment
                                                              .status === "DP"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                            >
                                                {booking.payment.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex w-full gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleViewBooking(
                                                            booking
                                                        )
                                                    }
                                                    className="flex items-center justify-center p-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handlePrintBooking(
                                                            booking
                                                        )
                                                    }
                                                    className="flex items-center justify-center p-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
                                                >
                                                    <FaPrint size={20} />
                                                </button>
                                            </div>
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
                <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white shadow-lg md:max-w-3xl md:rounded-lg md:p-6">
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
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <div className="space-y-4 text-sm text-gray-700 md:text-base">
                                <p>
                                    <strong>Package:</strong>{" "}
                                    {selectedBooking.travel_package.title}
                                </p>
                                <p>
                                    <strong>Destination:</strong>{" "}
                                    {
                                        selectedBooking.travel_package
                                            .destination.name
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
                                    {selectedBooking.passenger_count} slot
                                </p>
                                <p>
                                    <strong>Down Payment:</strong>{" "}
                                    {formattingPrice(
                                        selectedBooking.payment.jumlah_dp
                                    )}
                                </p>
                                <p>
                                    <strong>Amount:</strong>{" "}
                                    {formattingPrice(
                                        selectedBooking.payment.amount
                                    )}
                                </p>
                                <p>
                                    <strong>Remaining Payment:</strong>{" "}
                                    {formattingPrice(
                                        selectedBooking.payment.amount -
                                            selectedBooking.payment.jumlah_dp
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
                                                : selectedBooking.payment
                                                      .status === "DP"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : "bg-red-200 text-red-800"
                                        }`}
                                    >
                                        {selectedBooking.payment.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                            selectedBooking.status ===
                                            "Confirmed"
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
                            </div>
                            <div className="space-y-4 text-sm text-gray-700 md:text-base">
                                <p>
                                    <strong>Start Date:</strong>{" "}
                                    {formatDate(
                                        selectedBooking.travel_package
                                            .start_date
                                    )}
                                </p>
                                <p>
                                    <strong>End Date:</strong>{" "}
                                    {formatDate(
                                        selectedBooking.travel_package.end_date
                                    )}
                                </p>
                                <p>
                                    <strong>Car:</strong>{" "}
                                    {selectedBooking.travel_package.car.name} [
                                    {
                                        selectedBooking.travel_package.car
                                            .plate_number
                                    }
                                    ]
                                </p>
                                <p>
                                    <strong>Driver name:</strong>{" "}
                                    {selectedBooking.travel_package.driver}
                                </p>
                                {selectedBooking.payment.bukti_bayar && (
                                    <p>
                                        <strong>Payment Proof:</strong>
                                        <br />
                                        <img
                                            src={
                                                "/storage/" +
                                                selectedBooking.payment
                                                    .bukti_bayar
                                            }
                                            alt="Payment Proof"
                                            className="object-cover w-full max-w-[180px] rounded-2xl"
                                        />
                                    </p>
                                )}
                            </div>
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
