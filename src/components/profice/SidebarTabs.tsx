import { useState } from "react";
import { FaCogs, FaHeadset, FaUser } from "react-icons/fa";
import EditProfile from "./EditProfile";
import { Profice } from "./Profice";



const tabs = [
    { name: "Profile", icon: <FaUser />, component: <Profice /> },
    { name: "Settings", icon: <FaCogs />, component: <EditProfile /> },
    { name: "Contact", icon: <FaHeadset />, component: <EditProfile />, disabled: true },
];

export const SidebarTabs = () => {
    const [activeTab, setActiveTab] = useState("Profile");

    return (
        <div className="flex container max-w-7xl mx-auto bg-white text-white py-20">
            <div className="w-64 p-4 bg-gray-800">
                <ul className="space-y-2">
                    {tabs.map((tab) => (
                        <li key={tab.name}>
                            <button
                                className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition duration-300 ${tab.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : activeTab === tab.name
                                        ? "bg-[#5d6b98]"
                                        : "hover:bg-gray-700"
                                    }`}
                                onClick={() => !tab.disabled && setActiveTab(tab.name)}
                                disabled={tab.disabled}
                            >
                                <span className="mr-3 text-lg">{tab.icon}</span>
                                {tab.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-2">{activeTab} Tab</h2>
                <div className="text-gray-300">{tabs.find((tab) => tab.name === activeTab)?.component}</div>
            </div>
        </div>
    );
}
