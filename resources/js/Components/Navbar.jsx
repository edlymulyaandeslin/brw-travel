import { Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const { user } = usePage().props.auth;
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-lg">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-blue-600"
                        >
                            {import.meta.env.VITE_APP_NAME}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="items-center hidden space-x-8 md:flex">
                        <a
                            href="#destination"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Paket Wisata
                        </a>
                        <a
                            href="#about"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Tentang Kami
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-700 hover:text-blue-600"
                        >
                            Kontak
                        </a>

                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center px-4 py-2 space-x-1 border rounded shadow shadow-gray-900 focus:outline-none"
                                >
                                    <span className="font-medium text-gray-700">
                                        {user.name}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-gray-600 transition-transform ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Profil
                                            </Link>
                                            <Link
                                                href={route("mybooking")}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                My Booking
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                                            >
                                                Keluar
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                            >
                                Masuk/Daftar
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        mobileMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="#destination"
                                className="block px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                                Paket Wisata
                            </Link>
                            <Link
                                href="#about"
                                className="block px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="#contact"
                                className="block px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                                Kontak
                            </Link>
                            {user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="block px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                                    >
                                        Profil
                                    </Link>
                                    <Link
                                        href={route("mybooking")}
                                        className="block px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                                    >
                                        My Booking
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full px-3 py-2 text-left text-red-600 rounded-md hover:bg-red-50"
                                    >
                                        Keluar
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block w-full px-3 py-2 text-center text-white bg-blue-600 rounded-full hover:bg-blue-700"
                                >
                                    Masuk/Daftar
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
