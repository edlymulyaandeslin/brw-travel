import Layout from "@/Layouts/Layout";
import {
    formattingDateWithoutYear,
    formattingDateWithYear,
    formattingPrice,
} from "@/utils";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "react-feather";

export default function Packages({ travelPackages }) {
    return (
        <Layout>
            <Head title={"Destination Packages"} />

            {/* Back Button */}
            <div className="container px-4 pt-6 mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
            </div>

            <div className="container px-4 py-8 mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-gray-800">
                    Travel Packages
                </h1>

                {travelPackages.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-600">
                            No packages found
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {travelPackages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                            >
                                {/* Image Section */}
                                <div className="relative bg-gray-200 aspect-video">
                                    <img
                                        src={
                                            pkg.destination.image
                                                ? "/storage/" +
                                                  pkg.destination.image
                                                : "https://placehold.co/600x400/gray/white"
                                        }
                                        alt={pkg.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <span className="absolute px-3 py-1 text-sm text-white bg-blue-500 rounded-full top-2 right-2">
                                        {pkg.category.name}
                                    </span>
                                </div>

                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {pkg.title}
                                        </h3>
                                        <span className="text-lg font-bold text-blue-600">
                                            {formattingPrice(pkg.price)}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-sm font-semibold text-gray-500">
                                            Destination: {pkg.destination.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center mb-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zM5 10h10v4H5v-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{pkg.duration_days} Days</span>
                                    </div>

                                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                                        {pkg.description}
                                    </p>

                                    <div className="pt-3 space-y-2 border-t">
                                        <div className="flex justify-between text-sm">
                                            <span>Available:</span>
                                            <span
                                                className={`font-semibold ${
                                                    pkg.available_capacity /
                                                        pkg.capacity <
                                                    0.3
                                                        ? "text-red-500"
                                                        : pkg.available_capacity /
                                                              pkg.capacity <
                                                          0.6
                                                        ? "text-yellow-500"
                                                        : "text-green-500"
                                                }`}
                                            >
                                                {pkg.available_capacity} /{" "}
                                                {pkg.capacity}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 bg-blue-500 rounded-full"
                                                style={{
                                                    width: `${
                                                        (pkg.available_capacity /
                                                            pkg.capacity) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            <p>
                                                Date:{" "}
                                                {formattingDateWithoutYear(
                                                    pkg.start_date
                                                )}{" "}
                                                -{" "}
                                                {formattingDateWithYear(
                                                    pkg.end_date
                                                )}
                                            </p>
                                            <p className="mt-1">
                                                Tour Guide: {pkg.agent}
                                            </p>
                                        </div>

                                        {/* Dynamic Booking Button */}
                                        <button
                                            className={`w-full mt-4 py-2 rounded-md text-white font-semibold ${
                                                pkg.available_capacity > 0
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            } transition-colors duration-200`}
                                            disabled={
                                                pkg.available_capacity <= 0
                                            }
                                        >
                                            {pkg.available_capacity > 0
                                                ? "Book Now"
                                                : "Fully Booked"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
