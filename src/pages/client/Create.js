import Tiny from "../../components/Tiny";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Create() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
    const [loading, setLoading] = useState(false); // Loading state

    const UserSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"), // Validation for content
        type: Yup.string().required("Type is required"),
        status: Yup.string().required("Status is required"),
    });

    const submit = async (values) => {
        setLoading(true); // Set loading state
        setErrorMessage(""); // Reset any previous error messages
        try {
            let data = await baseAxios(METHOD_HTTP.POST, "/posts", values);
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

    return (
        <Formik
            initialValues={{
                title: "",
                content: "", // Managed by TinyMCE
                status: "",
                type: ""
            }}
            validationSchema={UserSchema}
            onSubmit={submit}
        >
            {({ setFieldValue, setFieldTouched }) => (
                <Form>
                    <div className="mb-3">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Title
                        </label>
                        <Field
                            type="text"
                            name="title"
                            id="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your title"
                        />
                        <span style={{ color: "red" }}>
                            <ErrorMessage name="title" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Content
                        </label>
                        {/* TinyMCE Editor */}
                        <Tiny
                            onChange={(content) => {
                                setFieldValue("content", content);
                                setFieldTouched("content", true); // Mark field as touched
                            }}
                        />
                        <span style={{ color: "red" }}>
                            <ErrorMessage name="content" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="type"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Type
                        </label>
                        <Field
                            name="type"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                        </Field>
                        <span style={{ color: "red" }}>
                            <ErrorMessage name="type" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Status
                        </label>
                        <Field
                            as="select"
                            name="status"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select status</option>
                            <option value="Active">Public</option>
                            <option value="Inactive">Private</option>
                        </Field>
                        <span style={{ color: "red" }}>
                            <ErrorMessage name="status" />
                        </span>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </Form>
            )}
        </Formik>
    );
}