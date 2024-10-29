import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";

export function Profile() {
    const [oldProfile, setOldProfile] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    const getProfileData = async () => {
        try {
            const response = await baseAxios(METHOD_HTTP.GET, `users/get-profile`);
            setOldProfile(response); // Ensure response has 'data'
            setDataLoaded(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    if (!dataLoaded) return <div>Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Profile Header */}
            <div className="flex items-center border-b border-gray-300 pb-6 mb-6">
                <img
                    src={oldProfile.image || "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"}
                    alt="Profile"
                    className="w-36 h-36 rounded-full mr-8"
                />
                <div className="flex-grow">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-3xl font-light">{oldProfile.username || 'username'}</h2>
                        <Link to={"/editProfile"} className="px-4 py-2 border border-gray-400 rounded-lg text-sm font-semibold hover:bg-gray-100">
                            Edit Profile
                        </Link>
                    </div>
                    <div className="flex space-x-8 mt-4">
                        <span><strong className="font-semibold">50</strong> posts</span>
                        <span><strong className="font-semibold">200</strong> followers</span>
                        <span><strong className="font-semibold">180</strong> following</span>
                    </div>
                    <p className="mt-4 text-gray-700">Birthday: {oldProfile.dob || "This is the bio section. You can describe yourself here."}</p>
                </div>
            </div>

            {/* Profile Posts */}
            <div className="grid grid-cols-3 gap-4">
                {/* Placeholder for posts */}
                <div className="w-full h-64 bg-gray-300"></div>
                <div className="w-full h-64 bg-gray-300"></div>
                <div className="w-full h-64 bg-gray-300"></div>
                <div className="w-full h-64 bg-gray-300"></div>
                <div className="w-full h-64 bg-gray-300"></div>
                <div className="w-full h-64 bg-gray-300"></div>
            </div>
        </div>
    );
}