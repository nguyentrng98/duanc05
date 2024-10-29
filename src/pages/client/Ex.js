import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";

export function Ex() {
    const [likes, setLikes] = useState([]); // Khởi tạo state cho danh sách likes
    const [dataLoaded, setDataLoaded] = useState(false); // Kiểm tra trạng thái tải dữ liệu

    // Hàm để lấy dữ liệu người đã like
    const getDataLike = async () => {
        try {
            const response = await baseAxios(METHOD_HTTP.GET, `posts/1/likes`);
            setLikes(response.data || []); // Giả sử response.data chứa mảng likes
            setDataLoaded(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Gọi hàm khi component được mount
    useEffect(() => {
        getDataLike();
    }, []);

    // Kiểm tra trạng thái tải dữ liệu
    if (!dataLoaded) return <div>Loading...</div>;

    return (
        <div>
            <h1>Danh sách người đã like bài viết</h1>
            <ul>
                {likes.length > 0 ? (
                    likes.map((like, index) => (
                        <li key={index}>{like.username || like}</li> // Giả sử mỗi like có thuộc tính 'username'
                    ))
                ) : (
                    <li>Chưa có ai like bài viết này.</li>
                )}
            </ul>
            <Link to="/">Quay lại trang chủ</Link> {/* Thêm liên kết quay lại */}
        </div>
    );
}