import Tiny from "../../components/Tiny";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function EditPost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
    const [loading, setLoading] = useState(false); // Loading state
    const [oldPost, setOldPost] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false); // Trạng thái để kiểm tra dữ liệu đã được tải chưa

    const UserSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"), // Validation for content
        type: Yup.string().required("Type is required"),
        status: Yup.string().required("Status is required"),
    });

    const submit = async (values) => {
        setLoading(true); // Đặt trạng thái loading thành true
        setErrorMessage(""); // Đặt thông báo lỗi về rỗng
        try {
            // Gửi yêu cầu cập nhật bài viết
            let response = await baseAxios(METHOD_HTTP.PUT, `/posts/${postId}`, values);
            navigate("/posts"); // Chuyển hướng đến trang chính sau khi thành công
            return response; // Trả về dữ liệu phản hồi nếu cần
        } catch (e) {
            // Hiển thị thông báo lỗi từ server
            if (e.response && e.response.data && e.response.data.message) {
                setErrorMessage(e.response.data.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setLoading(false); // Đặt trạng thái loading thành false
        }
    };

    const getOneData = async () => {
        try {
            const response = await baseAxios(METHOD_HTTP.GET, `/posts/${postId}`);
            setOldPost(response); // Cập nhật trạng thái với dữ liệu lấy được
            setDataLoaded(true); // Đánh dấu rằng dữ liệu đã được tải
        } catch (error) {
            console.error("Error fetching data:", error); // Ghi log lỗi nếu có
        }
    };

    useEffect(() => {
        getOneData();
    }, []);

    // Chỉ hiển thị Formik khi dữ liệu đã được tải
    if (!dataLoaded) {
        return <div>Loading...</div>; // Hoặc bạn có thể hiển thị một spinner
    }

    return (
        <Formik
            initialValues={{
                title: oldPost.title || '',
                content: oldPost.content || '',
                type: oldPost.type || '',
                status: oldPost.status || '',
            }}
            validationSchema={UserSchema}
            onSubmit={submit}
            enableReinitialize // Thêm thuộc tính này để cho phép khởi tạo lại giá trị khi dữ liệu thay đổi
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
                            initialValue={oldPost.content || ''} // Đảm bảo editor bắt đầu với nội dung cũ
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
                        />
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