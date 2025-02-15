import Navbar from "@/Components/Navbar";
import { Toaster } from "sonner";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {children}

            <Toaster richColors />
        </div>
    );
}
