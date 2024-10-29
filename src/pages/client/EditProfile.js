import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";
import { imageDb } from '../../firebase'; // Import Firebase storage reference
import { v4 } from "uuid";

export function EditProfile() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [oldProfile, setOldProfile] = useState({});
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Validation schema
    const UserSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        dob: Yup.string().required("Date of Birth is required"),
        profileImage: Yup.mixed().required("Profile image is required"),
    });

    // Fetch user data from the backend
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

    // Firebase image upload function
    const uploadImageToFirebase = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                console.error("No file selected");
                reject("No file selected");
                return;
            }

            const imgRef = ref(imageDb, `profiles/${v4()}`);
            const uploadTask = uploadBytesResumable(imgRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload error:", error);
                    reject(error);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url);
                }
            );
        });
    };

    // Submit function
    const submit = async (values) => {
        setLoading(true);
        setErrorMessage("");
        try {
            // Upload the image to Firebase and get the URL
            const uploadedImageURL = await uploadImageToFirebase(values.profileImage);

            // Update profile with image URL
            const response = await baseAxios(METHOD_HTTP.PUT, `/users/update-profile`, {
                ...values,
                image: uploadedImageURL
            });

            await getProfileData();

            console.log("Profile updated successfully:", response);
            // Optionally navigate after successful update
            // navigate("/profile");
        } catch (e) {
            setErrorMessage(e.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Wait until data is loaded
    if (!dataLoaded) return <div>Loading...</div>;

    return (
        <>
            <h1 className="text-4xl font-bold mb-5 text-center">Edit Profile</h1>
            <div className="w-full flex">
                <div className="w-1/3">
                    <img
                        src={oldProfile.image || "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"}
                        alt="Profile"
                        className="w-4/5 rounded-3xl border border-gray-300"
                    />
                </div>
                <Formik
                    initialValues={{
                        username: oldProfile.username || '',
                        password: oldProfile.password || '',
                        dob: oldProfile.dob || '',
                        profileImage: null,
                    }}
                    validationSchema={UserSchema}
                    onSubmit={submit}
                    enableReinitialize
                >
                    {({ setFieldValue }) => (
                        <Form className='w-2/3'>
                            <div className="mb-3">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                                    placeholder="Enter your username"
                                />
                                <ErrorMessage name="username" component="span" className="text-red-500 text-sm" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Date of Birth
                                </label>
                                <Field
                                    type="date"
                                    name="dob"
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                                />
                                <ErrorMessage name="dob" component="span" className="text-red-500 text-sm" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    name="profileImage"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files[0];
                                        setFieldValue("profileImage", file); // Set the file in Formik state
                                    }}
                                    className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full"
                                />
                                <ErrorMessage name="profileImage" component="span" className="text-red-500 text-sm" />
                                {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        </Form>
                    )}
                </Formik>
            </div>

        </>

    );
}