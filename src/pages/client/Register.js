import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";
import { useContext } from "react";
import { InfoContext } from "../../components/context/InfoContext.js";
import * as Yup from "yup";

export function Register() {
    const navigate = useNavigate();
    const { setUser } = useContext(InfoContext);

    const UserSchema = Yup.object().shape({
        username: Yup.string()
            .required("username is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        dob: Yup.date().required("Date of birth is required"),
        terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
    });

    const submit = async (values) => {
        try {
            console.log("Data register", values);
            let data = await baseAxios(METHOD_HTTP.POST, "/register", values)
            console.log("Data", data);
            alert(data.message)
            navigate("/login")
        } catch (e) {
            alert(e.message);
            
        }

    }

    const getInfo = async () => {
        let data = await baseAxios(METHOD_HTTP.GET, "get-info");
        setUser(data);
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: "",
                                    confirmPassword: "",
                                    dob: "",
                                    terms: false,
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
                                            type="username"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
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
                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Confirm password
                                        </label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <span style={{ color: "red" }}>
                                            <ErrorMessage name="confirmPassword" />
                                        </span>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="dob"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Birthday
                                        </label>
                                        <Field
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <span style={{ color: "red" }}>
                                            <ErrorMessage name="dob" />
                                        </span>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <Field
                                                type="checkbox"
                                                name="terms"
                                                id="terms"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="terms"
                                                className="font-light text-gray-500 dark:text-gray-300"
                                            >
                                                I accept the{" "}
                                                <a
                                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                    href="#"
                                                >
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                            <ErrorMessage name="terms" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Create an account
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link
                                            to={"/login"}
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Login here
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