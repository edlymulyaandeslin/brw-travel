import Layout from "@/Layouts/Layout";
import { formatDate, formattingDateWithYear } from "@/utils";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Box, Calendar, Clock, Users } from "react-feather";
import { FaBoxesPacking, FaCarSide } from "react-icons/fa6";

export default function Show({ destination }) {
    const [packages, setPackages] = useState(destination.travel_packages);
    const [cargoPackages, setCargoPackages] = useState(
        destination.cargo_packages
    );

    return (
        <Layout>
            <Head title={destination.name} />

            {/* Tombol Kembali */}
            <div className="container px-4 py-6 mx-auto">
                <Link
                    href="/#destination"
                    className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali ke Destinasi
                </Link>
            </div>

            {/* Konten Utama */}
            <main className="container px-4 pb-12 mx-auto">
                {/* Header Destinasi */}
                <div className="mb-8">
                    <img
                        src={
                            destination.image
                                ? "/storage/" + destination.image
                                : "https://placehold.co/600x400/gray/white"
                        }
                        alt={destination.name}
                        className="object-cover w-full shadow-xl h-96 rounded-2xl"
                    />
                    <div className="mt-6">
                        <h1 className="mb-2 text-4xl font-bold text-gray-900">
                            {destination.name}
                        </h1>
                        <p className="leading-relaxed text-gray-600">
                            {destination.description}
                        </p>
                    </div>
                </div>

                {/* Paket Perjalanan Tersedia */}
                <div className="p-6 bg-white shadow-sm rounded-2xl">
                    <h2 className="mb-6 text-2xl font-semibold">
                        Paket Perjalanan Tersedia
                    </h2>

                    <div className="space-y-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="p-6 transition-shadow border rounded-xl hover:shadow-md"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {/* Informasi Paket */}
                                    <div className="md:col-span-2">
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {pkg.title}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
                                            <div className="flex items-center space-x-2">
                                                <Box className="w-5 h-5 text-blue-600" />
                                                <span>{pkg.category.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-5 h-5 text-blue-600" />
                                                <span>
                                                    {pkg.duration_days} Hari
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-5 h-5 text-blue-600" />
                                                <span>{pkg.capacity} Slot</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        {formatDate(
                                                            pkg.start_date
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        sampai{" "}
                                                        {formatDate(
                                                            pkg.end_date
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaCarSide className="w-5 h-5 text-blue-600" />
                                                <span>
                                                    {pkg.car.name}{" "}
                                                    {pkg.car.tahun}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mb-4 text-gray-600">
                                            {pkg.description}
                                        </p>
                                    </div>

                                    {/* Bagian Pemesanan */}
                                    <div className="space-y-4">
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-blue-600">
                                                Rp {pkg.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-600">
                                                / orang
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <span className="text-sm font-bold text-green-600">
                                                {pkg.available_capacity} slot
                                                tersedia
                                            </span>
                                        </div>

                                        <Link
                                            href={
                                                pkg.available_capacity == 0
                                                    ? "#"
                                                    : route(
                                                          "booking.create",
                                                          pkg.slug
                                                      )
                                            }
                                            className={`w-full block text-center py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 ${
                                                pkg.available_capacity == 0
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            {pkg.available_capacity > 0
                                                ? "Pesan Sekarang"
                                                : "Penuh"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {packages.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-lg text-gray-600">
                                    Tidak ada paket yang tersedia
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Paket Cargo Tersedia */}
                <div className="p-6 mt-4 bg-white shadow-sm rounded-2xl">
                    <h2 className="mb-6 text-2xl font-semibold">
                        Paket Barang Tersedia
                    </h2>

                    <div className="space-y-6">
                        {cargoPackages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="p-6 transition-shadow border rounded-xl hover:shadow-md"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {/* Informasi Paket */}
                                    <div className="md:col-span-2">
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {pkg.title}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
                                            <div className="flex items-center space-x-2">
                                                <Box className="w-5 h-5 text-blue-600" />
                                                <span>{pkg.category.name}</span>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <FaBoxesPacking className="w-5 h-5 text-blue-600" />
                                                <span>
                                                    Maksimal Muatan{" "}
                                                    {pkg.max_capacity_gram}{" "}
                                                    <span className="text-xs text-gray-500">
                                                        (gram)
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        {formattingDateWithYear(
                                                            pkg.departure_date
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaCarSide className="w-5 h-5 text-blue-600" />
                                                <span>
                                                    {pkg.car.name}{" "}
                                                    {pkg.car.tahun}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mb-4 text-gray-600">
                                            {pkg.description}
                                        </p>
                                    </div>

                                    {/* Bagian Pemesanan */}
                                    <div className="space-y-4">
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-blue-600">
                                                Rp {pkg.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-600">
                                                / paket
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <span className="text-sm font-bold text-green-600">
                                                Muatan Tersedia{" "}
                                                {pkg.capacity_gram}
                                                <span className="text-xs text-green-500">
                                                    (gram)
                                                </span>
                                            </span>
                                        </div>

                                        <Link
                                            href={
                                                pkg.capacity_gram == 0
                                                    ? "#"
                                                    : route(
                                                          "booking.create",
                                                          pkg.slug
                                                      )
                                            }
                                            className={`w-full block text-center py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 ${
                                                pkg.capacity_gram == 0
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            {pkg.capacity_gram > 0
                                                ? "Pesan Sekarang"
                                                : "Penuh"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {cargoPackages.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-lg text-gray-600">
                                    Tidak ada paket yang tersedia
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
