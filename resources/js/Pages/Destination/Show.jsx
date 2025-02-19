import Layout from "@/Layouts/Layout";
import { formatDate } from "@/utils";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Box, Calendar, Clock, Users } from "react-feather";
import { FaCarSide } from "react-icons/fa6";

export default function Show({ destination }) {
    const [packages, setPackages] = useState(destination.travel_packages);

    return (
        <Layout>
            <Head title={destination.name} />

            {/* Back Button */}
            <div className="container px-4 py-6 mx-auto">
                <Link
                    href="/#destination"
                    className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Destinations
                </Link>
            </div>

            {/* Main Content */}
            <main className="container px-4 pb-12 mx-auto">
                {/* Destination Header */}
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

                {/* Available Packages */}
                <div className="p-6 bg-white shadow-sm rounded-2xl">
                    <h2 className="mb-6 text-2xl font-semibold">
                        Available Travel Packages
                    </h2>

                    <div className="space-y-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="p-6 transition-shadow border rounded-xl hover:shadow-md"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {/* Package Info */}
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
                                                    {pkg.duration_days} Days
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-5 h-5 text-blue-600" />
                                                <span>
                                                    {pkg.capacity} Slots
                                                </span>
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
                                                        to{" "}
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
                                                    {pkg.car.merk}{" "}
                                                    {pkg.car.tahun}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mb-4 text-gray-600">
                                            {pkg.description}
                                        </p>
                                    </div>

                                    {/* Booking Section */}
                                    <div className="space-y-4">
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-blue-600">
                                                Rp {pkg.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-600">
                                                / person
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <span className="text-sm font-bold text-green-600">
                                                {pkg.available_capacity} slots
                                                available
                                            </span>
                                        </div>

                                        <Link
                                            href={route(
                                                "booking.create",
                                                pkg.slug
                                            )}
                                            className={`w-full block text-center py-3 text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 ${
                                                pkg.available_capacity === 0
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={
                                                pkg.available_capacity === 0
                                            }
                                        >
                                            {pkg.available_capacity > 0
                                                ? "Book Now"
                                                : "Fully Booked"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {packages.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-lg text-gray-600">
                                    No packages available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
