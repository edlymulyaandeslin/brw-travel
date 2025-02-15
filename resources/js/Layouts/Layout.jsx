import Navbar from "@/Components/Navbar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function Layout({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {children}

            <Toaster richColors />
        </div>
    );
}
