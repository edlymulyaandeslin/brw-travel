import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-blue-600"
                        >
                            {import.meta.env.VITE_APP_NAME}
                        </Link>
                    </div>
                    <div className="items-center hidden space-x-8 md:flex">
                        <a
                            href="#destination"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Paket Wisata
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Tentang Kami
                        </a>
                        <a
                            href="#"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Kontak
                        </a>
                        <button className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
                            Masuk/Daftar
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
