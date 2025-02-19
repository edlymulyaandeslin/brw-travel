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
        const now = new Date().toLocaleDateString("en-CA");

        setLoading(true);

        if (checkIn < now) {
            toast.warning("Tanggal Check-in tidak boleh kurang dari hari ini");
            setLoading((prev) => !prev);

            return;
        }

        if (checkIn > checkOut) {
            toast.warning("Tanggal Check-in harus lebih kecil dari check-out");
            setLoading((prev) => !prev);

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
                                        type="datetime-local"
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
                                        type="datetime-local"
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

            {/* About Our Company */}
            <div className="py-16 bg-white" id="about">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                src="/img/about-2.jpeg" // Ganti dengan gambar tentang perusahaan Anda
                                alt="About Us"
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col justify-center">
                            <h2 className="mb-6 text-3xl font-bold text-gray-800">
                                Tentang Kami
                            </h2>
                            <p className="mb-4 text-gray-600">
                                Kami adalah perusahaan travel terpercaya yang
                                telah membantu ribuan pelanggan menjelajahi
                                dunia dengan kemudahan dan kenyamanan. Dengan
                                pengalaman lebih dari 10 tahun, kami menawarkan
                                paket wisata terbaik dengan harga kompetitif.
                            </p>
                            <p className="mb-4 text-gray-600">
                                Tim kami terdiri dari para profesional yang siap
                                membantu Anda merencanakan perjalanan impian
                                Anda. Dari destinasi populer hingga tempat
                                tersembunyi, kami memiliki segalanya untuk
                                memenuhi kebutuhan perjalanan Anda.
                            </p>
                            <ul className="mb-6 text-gray-600 list-disc list-inside">
                                <li>
                                    Paket wisata lengkap dengan akomodasi dan
                                    transportasi
                                </li>
                                <li>Dukungan pelanggan 24/7</li>
                                <li>Garansi harga terbaik</li>
                            </ul>
                            <button className="self-start px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Company */}
            <div className="py-16 bg-gray-100" id="contact">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
                        Hubungi Kami
                    </h2>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="p-8 bg-white rounded-lg shadow-md">
                            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
                                Kirim Pesan
                            </h3>
                            <form>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan nama Anda"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan email Anda"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Pesan
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tulis pesan Anda"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="p-8 bg-white rounded-lg shadow-md">
                            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
                                Informasi Kontak
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
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
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">
                                            Jl. Contoh No. 123, Kota Pasir
                                            Pengaraian, Rokan Hulu, Riau,
                                            Indonesia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
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
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">
                                            +62 123 4567 890
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
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
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-600">
                                            info@travelcompany.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
