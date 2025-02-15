import Layout from "@/Layouts/Layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export default function HomePage({ destinations }) {
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [travelers, setTravelers] = useState(1);
    const [loading, setLoading] = useState(false);

    const features = [
        { title: "Harga Terbaik", desc: "Garansi harga terbaik di pasar" },
        { title: "Destinasi Populer", desc: "Akses ke 5000+ destinasi wisata" },
        {
            title: "Dukungan 24/7",
            desc: "Tim support siap membantu kapan saja",
        },
        { title: "Kepuasan Pelanggan", desc: "98% rating kepuasan pengguna" },
    ];

    const handleFindPackages = () => {
        const now = new Date().toISOString().split("T")[0];
        setLoading(true);

        if (checkIn < now) {
            toast.warning("Tanggal Check-in tidak boleh kurang dari hari ini");
            return;
        }

        if (checkIn > checkOut) {
            toast.warning("Tanggal Check-in harus lebih kecil dari check-out");
            return;
        }

        const formData = new FormData();
        formData.append("destination", destination);
        formData.append("check_in", checkIn);
        formData.append("check_out", checkOut);
        formData.append("travelers", travelers);

        router.post(route("findpackages"), formData);
    };

    return (
        <Layout>
            <Head title="Home" />

            {/* Hero Section */}
            <div className="relative h-[600px] bg-gray-900">
                <img
                    src={"/img/hero-background.jpeg"}
                    alt="Travel"
                    className="object-cover w-full h-full opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl px-4 text-center">
                        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                            Jelajahi Dunia dengan Kemudahan
                        </h1>

                        {/* Search Form */}
                        <div className="p-6 bg-white rounded-lg shadow-2xl">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Destinasi
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border rounded-lg"
                                        placeholder="Mau kemana?"
                                        value={destination}
                                        onChange={(e) =>
                                            setDestination(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Check-in
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border rounded-lg"
                                        value={checkIn}
                                        onChange={(e) =>
                                            setCheckIn(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Check-out
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border rounded-lg"
                                        value={checkOut}
                                        onChange={(e) =>
                                            setCheckOut(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Travelers
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full p-3 border rounded-lg"
                                        value={travelers}
                                        onChange={(e) =>
                                            setTravelers(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleFindPackages}
                                className="w-full py-4 mt-6 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                {loading ? "Mencari..." : "Cari Paket Wisata"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
                        >
                            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Destinations */}
            <div className="py-16 bg-gray-100" id="destination">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-3xl font-bold text-center">
                        Destinasi Populer
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {destinations.map((dest, index) => (
                            <div
                                key={index}
                                className="overflow-hidden transition-shadow bg-white shadow-md rounded-xl hover:shadow-xl"
                            >
                                <img
                                    src={
                                        dest.image
                                            ? "/storage/" + dest.image
                                            : "https://placehold.co/600x400/gray/white"
                                    }
                                    alt={dest.name}
                                    className="object-cover w-full h-48 transition-all hover:scale-105"
                                />
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {dest.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={route(
                                                "destination.show",
                                                dest.slug
                                            )}
                                            className="px-4 py-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
