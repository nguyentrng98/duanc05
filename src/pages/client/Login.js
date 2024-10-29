import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";
import { useContext, useState } from "react";
import { InfoContext } from "../../components/context/InfoContext.js";
import * as Yup from "yup";

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(InfoContext);
    const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
    const [loading, setLoading] = useState(false); // Loading state

    const UserSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const submit = async (values) => {
        setLoading(true); // Set loading state
        setErrorMessage(""); // Reset any previous error messages
        try {
            let data = await baseAxios(METHOD_HTTP.POST, "/login", values);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("image", data.image);
            await getInfo();
            navigate("/home");
        } catch (e) {
            // Display error message returned from the server
            if (e.response && e.response.data && e.response.data.message) {
                setErrorMessage(e.response.data.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const getInfo = async () => {
        try {
            let data = await baseAxios(METHOD_HTTP.GET, "users/get-profile ");
            setUser(data);
        } catch (e) {
            console.error("Failed to fetch user info:", e.message);
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {errorMessage && (
                                <div className="text-red-500 mb-4">{errorMessage}</div>
                            )}
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: "",
                                }}
                                validationSchema={UserSchema}
                                onSubmit={submit}
                            >
                                <Form className="space-y-4 md:space-y-6">
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your username
                                        </label>
                                        <Field
                                            type="text" // Change from 'username' to 'text'
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter your username"
                                        />
                                        <span style={{ color: "red" }}>
                                            <ErrorMessage name="username" />
                                        </span>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <span style={{ color: "red" }}>
                                            <ErrorMessage name="password" />
                                        </span>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading} // Disable button when loading
                                        className={`w-full text-white ${loading ? "bg-gray-400" : "bg-primary-600 hover:bg-primary-700"} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                                    >
                                        {loading ? "Signing in..." : "Sign in"}
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
                                        <Link
                                            to="/register"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Sign up
                                        </Link>
                                    </p>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}