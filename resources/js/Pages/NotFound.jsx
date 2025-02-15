import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <Layout>
            <Head title="404 - Not Found" />
            <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gray-100">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-xl text-gray-600">
                    Oops! Halaman yang kamu cari tidak ditemukan.
                </p>
                <p className="mt-2 text-gray-500 text-md">
                    Mungkin halaman telah dipindahkan atau kamu salah mengetik
                    URL.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 mt-6 text-lg font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </Layout>
    );
}
