import Layout from "@/Layouts/Layout";
import { formatDate, formattingDateWithYear, formattingPrice } from "@/utils";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Eye, X } from "react-feather";
import { FaPrint } from "react-icons/fa6";

export default function Index({ bookings, cargoBookings }) {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedCargoBooking, setSelectedCargoBooking] = useState(null);
    const appName = import.meta.env.VITE_APP_NAME;

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking);
    };

    const handlePrintBooking = (booking) => {
        // Buat konten HTML dengan tampilan nota yang diperbesar
        const printContent = `
        <html>
          <head>
            <title>Bukti Pemesanan</title>
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
                max-width: 800px;
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
                width: 250px;
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
                <h1>Bukti Pemesanan</h1>
                <p>${appName}</p>
                <p>Tanggal: ${formattingDateWithYear(booking.booking_date)}</p>
              </header>
              <div class="details">
                <p><span>Paket:</span> ${booking.travel_package.title}</p>
                <p><span>Destinasi:</span> ${
                    booking.travel_package.destination.name
                }</p>
                <p><span>Tanggal Pemesanan:</span> ${formattingDateWithYear(
                    booking.booking_date
                )}</p>
                <p><span>Penumpang:</span> ${booking.passenger_count}</p>
                <p><span>Harga:</span> ${formattingPrice(
                    booking.travel_package.price
                )}/orang</p>
                <p><span>Metode Pembayaran:</span> ${
                    booking.payment.payment_method
                }</p>
                <p><span>Uang Muka:</span> ${formattingPrice(
                    booking.payment.jumlah_dp
                )}</p>
                <p><span>Jumlah:</span> ${formattingPrice(
                    booking.payment.amount
                )}</p>
                <p><span>Sisa:</span> ${formattingPrice(
                    booking.payment.amount - booking.payment.jumlah_dp
                )}</p>
                <p><span>Status:</span> ${booking.status}</p>
                <p><span>Status Pembayaran:</span> ${booking.payment.status}</p>
              </div>
              <footer>
                <p>Terima kasih atas pemesanan Anda!</p>
                <p>Hubungi kami: yourcompany@example.com</p>
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

    const handlePrintCargoBooking = (booking) => {
        // Buat konten HTML dengan tampilan nota yang diperbesar
        const printContent = `
        <html>
          <head>
            <title>Bukti Pemesanan</title>
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
                max-width: 800px;
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
                width: 250px;
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
                <h1>Bukti Pemesanan</h1>
                <p>${appName}</p>
                <p>Tanggal: ${formattingDateWithYear(booking.delivery_date)}</p>
              </header>
              <div class="details">
                <p><span>Jenis Paket:</span> ${booking.cargo_package.title}</p>
                <p><span>Destinasi:</span> ${
                    booking.cargo_package.destination.name
                }</p>
                <p><span>Tanggal:</span> ${formattingDateWithYear(
                    booking.delivery_date
                )}</p>
                <p><span>Nama Barang:</span> ${booking.product_name}</p>
                <p><span>Berat:</span> ${booking.size} gram</p>
                <p><span>Biaya:</span> ${formattingPrice(booking.amount)}</p>
                <p><span>Pengirim:</span> ${booking.sender}</p>
                <p><span>Alamat Pengirim:</span> ${booking.sender_address}</p>
                <p><span>Penerima:</span> ${booking.recipient}</p>
                <p><span>Alamat Penerima:</span> ${
                    booking.recipient_address
                }</p>
                <p><span>Status:</span> ${booking.status}</p>
              </div>
              <footer>
                <p>Terima kasih atas pemesanan Anda!</p>
                <p>Hubungi kami: yourcompany@example.com</p>
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
        setSelectedCargoBooking(null);
    };

    return (
        <Layout>
            <Head title="Pemesanan Saya" />
            {/* Pemesanan saya */}
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">Pemesanan Saya</h1>
                {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                            <thead className="text-white bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Paket Perjalanan
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Destinasi
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Tanggal Pemesanan
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Penumpang
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Harga Perjalanan
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Metode Pembayaran
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Uang Muka
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Jumlah
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Sisa Pembayaran
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status Pembayaran
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Aksi
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
                    <p className="text-gray-500">
                        Tidak ada pemesanan yang ditemukan.
                    </p>
                )}
            </div>

            {/* Pengiriman saya */}
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">Pengiriman Saya</h1>
                {cargoBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
                            <thead className="text-white bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Paket
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Destinasi
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Nama Barang
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Berat{" "}
                                        <span className="text-xs text-gray-400">
                                            (gram)
                                        </span>
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Harga
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Jumlah Bayar
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cargoBookings.map((booking, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-100"
                                    >
                                        <td className="px-4 py-2">
                                            {booking.cargo_package.title}
                                        </td>
                                        <td className="px-4 py-2">
                                            {
                                                booking.cargo_package
                                                    .destination.name
                                            }
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingDateWithYear(
                                                booking.delivery_date
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.product_name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {booking.size}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(
                                                booking.cargo_package.price
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {formattingPrice(booking.amount)}
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
                                            <div className="flex w-full gap-2">
                                                <button
                                                    onClick={() =>
                                                        setSelectedCargoBooking(
                                                            booking
                                                        )
                                                    }
                                                    className="flex items-center justify-center p-2 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handlePrintCargoBooking(
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
                    <p className="text-gray-500">
                        Tidak ada pemesanan yang ditemukan.
                    </p>
                )}
            </div>

            {selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white shadow-lg md:max-w-3xl md:rounded-lg md:p-6">
                        {/* Tombol Tutup */}
                        <button
                            onClick={closeModal}
                            className="absolute text-gray-600 top-4 right-4 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <h2 className="mb-6 text-2xl font-bold text-center">
                            Detail Pemesanan
                        </h2>

                        {/* Konten Modal */}
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <div className="space-y-4 text-sm text-gray-700 md:text-base">
                                <p>
                                    <strong>Paket:</strong>{" "}
                                    {selectedBooking.travel_package.title}
                                </p>
                                <p>
                                    <strong>Destinasi:</strong>{" "}
                                    {
                                        selectedBooking.travel_package
                                            .destination.name
                                    }
                                </p>
                                <p>
                                    <strong>Tanggal Pemesanan:</strong>{" "}
                                    {formattingDateWithYear(
                                        selectedBooking.booking_date
                                    )}
                                </p>
                                <p>
                                    <strong>Penumpang:</strong>{" "}
                                    {selectedBooking.passenger_count} slot
                                </p>
                                <p>
                                    <strong>Uang Muka:</strong>{" "}
                                    {formattingPrice(
                                        selectedBooking.payment.jumlah_dp
                                    )}
                                </p>
                                <p>
                                    <strong>Jumlah:</strong>{" "}
                                    {formattingPrice(
                                        selectedBooking.payment.amount
                                    )}
                                </p>
                                <p>
                                    <strong>Sisa Pembayaran:</strong>{" "}
                                    {formattingPrice(
                                        selectedBooking.payment.amount -
                                            selectedBooking.payment.jumlah_dp
                                    )}
                                </p>
                                <p>
                                    <strong>Metode Pembayaran:</strong>{" "}
                                    {selectedBooking.payment.payment_method}
                                </p>
                                <p>
                                    <strong>Status Pembayaran:</strong>{" "}
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
                                    <strong>Tanggal Mulai:</strong>{" "}
                                    {formatDate(
                                        selectedBooking.travel_package
                                            .start_date
                                    )}
                                </p>
                                <p>
                                    <strong>Tanggal Selesai:</strong>{" "}
                                    {formatDate(
                                        selectedBooking.travel_package.end_date
                                    )}
                                </p>
                                <p>
                                    <strong>Mobil:</strong>{" "}
                                    {selectedBooking.travel_package.car.name} [
                                    {
                                        selectedBooking.travel_package.car
                                            .plate_number
                                    }{" "}
                                    ]
                                </p>
                                <p>
                                    <strong>Nama Sopir:</strong>{" "}
                                    {selectedBooking.travel_package.driver}
                                </p>
                                {selectedBooking.payment.bukti_bayar && (
                                    <p>
                                        <strong>Bukti Pembayaran:</strong>
                                        <br />
                                        <img
                                            src={
                                                "/storage/" +
                                                selectedBooking.payment
                                                    .bukti_bayar
                                            }
                                            alt="Bukti Pembayaran"
                                            className="object-cover w-full max-w-[180px] rounded-2xl"
                                        />
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tombol Tutup */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-700"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedCargoBooking && (
                <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative w-full max-h-[90vh] p-4 overflow-y-auto bg-white shadow-lg md:max-w-3xl md:rounded-lg md:p-6">
                        {/* Tombol Tutup */}
                        <button
                            onClick={closeModal}
                            className="absolute text-gray-600 top-4 right-4 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <h2 className="mb-6 text-2xl font-bold text-center">
                            Detail Pengiriman
                        </h2>

                        {/* Konten Modal */}
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <div className="space-y-4 text-sm text-gray-700 md:text-base">
                                <p>
                                    <strong>Paket:</strong>{" "}
                                    {selectedCargoBooking.cargo_package.title}
                                </p>
                                <p>
                                    <strong>Destinasi:</strong>{" "}
                                    {
                                        selectedCargoBooking.cargo_package
                                            .destination.name
                                    }
                                </p>
                                <p>
                                    <strong>Tanggal:</strong>{" "}
                                    {formattingDateWithYear(
                                        selectedCargoBooking.delivery_date
                                    )}
                                </p>
                                <p>
                                    <strong>Nama Barang:</strong>{" "}
                                    {selectedCargoBooking.product_name}
                                </p>
                                <p>
                                    <strong>Berat:</strong>{" "}
                                    {selectedCargoBooking.size} gram
                                </p>
                                <p>
                                    <strong>Biaya:</strong>{" "}
                                    {formattingPrice(
                                        selectedCargoBooking.amount
                                    )}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                                            selectedCargoBooking.status ===
                                            "Confirmed"
                                                ? "bg-green-200 text-green-800"
                                                : selectedCargoBooking.status ===
                                                  "Pending"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : selectedCargoBooking.status ===
                                                  "Completed"
                                                ? "bg-blue-200 text-blue-800"
                                                : selectedCargoBooking.status ===
                                                  "Cancelled"
                                                ? "bg-red-200 text-red-800"
                                                : "bg-gray-200 text-gray-800"
                                        }`}
                                    >
                                        {selectedCargoBooking.status}
                                    </span>
                                </p>
                            </div>
                            <div className="space-y-4 text-sm text-gray-700 md:text-base">
                                <p>
                                    <strong>Pengirim:</strong>{" "}
                                    {selectedCargoBooking.recipient}
                                </p>
                                <p>
                                    <strong>Alamat Pengirim:</strong>{" "}
                                    {selectedCargoBooking.sender_address}
                                </p>
                                <p>
                                    <strong>Penerima:</strong>{" "}
                                    {selectedCargoBooking.recipient}
                                </p>
                                <p>
                                    <strong>Alamat Penerima:</strong>{" "}
                                    {selectedCargoBooking.recipient_address}
                                </p>
                                <p>
                                    <strong>Mobil:</strong>{" "}
                                    {
                                        selectedCargoBooking.cargo_package.car
                                            .name
                                    }{" "}
                                    [
                                    {
                                        selectedCargoBooking.cargo_package.car
                                            .plate_number
                                    }
                                    ]
                                </p>
                                <p>
                                    <strong>Nama Sopir:</strong>{" "}
                                    {selectedCargoBooking.cargo_package.driver}
                                </p>
                            </div>
                        </div>

                        {/* Tombol Tutup */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-700"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
