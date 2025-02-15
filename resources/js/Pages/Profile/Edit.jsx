import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState("profile");

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="mb-4 text-xl font-semibold">
                            Update Profile Information
                        </h2>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl mx-auto"
                        />
                    </div>
                );
            case "password":
                return (
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="mb-4 text-xl font-semibold">
                            Update Password
                        </h2>
                        <UpdatePasswordForm className="max-w-xl mx-auto" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout>
            <Head title="Profile" />

            <div className="px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Tab Navigation */}
                    <div className="flex flex-col mb-6 border-b border-gray-200 sm:flex-row">
                        <button
                            className={`py-2 px-4 text-center focus:outline-none ${
                                activeTab === "profile"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-600 hover:text-blue-500"
                            }`}
                            onClick={() => setActiveTab("profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={`py-2 px-4 text-center focus:outline-none ${
                                activeTab === "password"
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-600 hover:text-blue-500"
                            }`}
                            onClick={() => setActiveTab("password")}
                        >
                            Password
                        </button>
                    </div>

                    {/* Tab Content */}
                    {renderTabContent()}
                </div>
            </div>
        </Layout>
    );
}
