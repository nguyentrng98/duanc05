import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import baseAxios, { METHOD_HTTP } from "../../configs/baseAxios";
import React, { useEffect, useState } from 'react';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function Post() {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState({});
    const [userLikedPosts, setUserLikedPosts] = useState({});
    const currentUsername = localStorage.getItem('username');

    // const getPosts = async () => {
    //     try {
    //         // Gọi API để lấy danh sách các bài post
    //         let data = await baseAxios(METHOD_HTTP.GET, "posts"); // Thay đổi URL theo endpoint chính xác của bạn

    //         const username = localStorage.getItem("username"); // Lấy username từ localStorage

    //         // Lọc bài viết theo username
    //         const filteredPosts = data.filter(post => post.username === username);
    //         setPosts(filteredPosts); // Cập nhật state `posts` với dữ liệu từ API
    //     } catch (e) {
    //         console.error("Failed to fetch posts:", e.message); // Log lỗi khi không lấy được dữ liệu
    //     }
    // };

    const getPosts = async () => {
        try {
            let data = await baseAxios(METHOD_HTTP.GET, "posts");
            const username = localStorage.getItem("username"); // Lấy username từ localStorage

            // Lọc bài viết theo username
            const filteredPosts = data.filter(post => post.username === username);
            setPosts(filteredPosts); // Cập nhật state `posts` với dữ liệu từ API
            // Lấy likes cho tất cả các bài viết
            data.forEach(post => {
                getLikesForPost(post.id);
            });
        } catch (e) {
            console.error("Failed to fetch posts:", e.message);
        }
    };

    const getLikesForPost = async (postId) => {
        try {
            let likeData = await baseAxios(METHOD_HTTP.GET, `posts/${postId}/likes`);
            const countLikes = likeData.length; // Đếm số lượng likes
            const userLiked = likeData.some(user => user.username === currentUsername); // Kiểm tra nếu người dùng đã thích bài viết
            
            // Cập nhật số lượng likes và trạng thái liked cho bài viết
            setLikes((prevLikes) => ({
                ...prevLikes,
                [postId]: countLikes
            }));
            setUserLikedPosts((prevLikedPosts) => ({
                ...prevLikedPosts,
                [postId]: userLiked
            }));
        } catch (e) {
            console.error(`Failed to fetch likes for post ${postId}:`, e.message);
        }
    };

    const likePost = async (postId) => {
        const token = getAuthToken(); // Ensure you retrieve the token correctly
        try {
            const response = await baseAxios(METHOD_HTTP.POST, `posts/${postId}/like`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the Bearer token
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('API Response:', response); // Log the API response
    
            // Check if the response indicates success
            if (response && response.success) {
                // Update likes state based on the response
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [postId]: (prevLikes[postId] || 0) + 1 // Increment like count
                }));
                setUserLikedPosts((prevLikedPosts) => ({
                    ...prevLikedPosts,
                    [postId]: true // Update liked state
                }));
            } else {
                console.error(`Unexpected response structure for liking post ${postId}:`, response);
            }
        } catch (e) {
            console.error(`Failed to like post ${postId}:`, e.message);
            if (e.response) {
                // Log additional details if the response contains useful information
                console.error("Response data:", e.response.data);
                console.error("Response status:", e.response.status);
                console.error("Response headers:", e.response.headers);
            } else if (e.request) {
                // Request was made but no response received
                console.error("Request data:", e.request);
            } else {
                // Something else caused the error
                console.error("Error message:", e.message);
            }
        }
    };
    
    const getAuthToken = () => {
        return localStorage.getItem('token'); // Or wherever you store your token
    };
    

    const unlikePost = async (postId) => {
        const token = getAuthToken(); // Ensure you retrieve the token correctly
        try {
            const response = await baseAxios(METHOD_HTTP.POST, `posts/${postId}/unlike`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the Bearer token
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('API Response:', response); // Log the API response
    
            // Check if the response indicates success
            if (response && response.success) {
                // Update likes state based on the response
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [postId]: Math.max((prevLikes[postId] || 0) - 1, 0) // Decrement like count, ensuring it doesn't go below 0
                }));
                setUserLikedPosts((prevLikedPosts) => ({
                    ...prevLikedPosts,
                    [postId]: false // Update liked state
                }));
            } else {
                console.error(`Unexpected response structure for unliking post ${postId}:`, response);
            }
        } catch (e) {
            console.error(`Failed to unlike post ${postId}:`, e.message);
            if (e.response) {
                // Log additional details if the response contains useful information
                console.error("Response data:", e.response.data);
                console.error("Response status:", e.response.status);
                console.error("Response headers:", e.response.headers);
            } else if (e.request) {
                // Request was made but no response received
                console.error("Request data:", e.request);
            } else {
                // Something else caused the error
                console.error("Error message:", e.message);
            }
        }
    };

    useEffect(() => {
        getPosts(); // Gọi hàm getPosts khi component được render
    }, []);

    // State để theo dõi trạng thái mở rộng cho từng bài viết
    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleExpand = (postId) => {
        setExpandedPosts((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId], // Đổi trạng thái mở rộng cho bài viết tương ứng
        }));
    };

    const deletePost = async (postId) => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");

        if (!confirmed) {
            return;
        }

        try {
            // Lấy token từ localStorage hoặc nơi nào đó bạn lưu trữ
            const token = localStorage.getItem("token");

            await baseAxios(METHOD_HTTP.DELETE, `posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            });

            getPosts(); // Cập nhật lại danh sách bài viết
        } catch (e) {
            console.error("Failed to delete post:", e.message);
        }
    };

    return (
        <div className="w-full flex">
            <div className="w-2/3">
                <div className="flex justify-between w-full mb-10">
                    {/* Thay đổi avatar và username tại đây nếu cần */}
                    {Array(8).fill(0).map((_, index) => (
                        <div className="w-20 h-20" key={index}>
                            <img className="rounded-full h-14 w-14" src="https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-cap-doi-anime-nam-nu-yeu-nhau.jpg" />
                            <span className="text-[12px]">ktnguyen</span>
                        </div>
                    ))}
                </div>
                {posts.length > 0 ? (
                    posts.map((post) => {
                        const isExpanded = expandedPosts[post.id] || false;
                        const contentPreview = post.content.length > 400 ? post.content.slice(0, 400) + '...' : post.content;

                        return (
                            <div className="px-20" key={post.id}>
                                <div className="border-b border-[#333] pb-3 mb-3">
                                    <div className="flex items-center mb-3 justify-between">
                                        <div className="flex items-center">
                                            <img className="rounded-full h-10 w-10" src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/top-36-anh-dai-dien-dep-cho-nu/anh-dai-dien-dep-cho-nu-che-mat-anime.jpg?1708401649581" />
                                            <div className="ms-3">
                                                <span className="block font-bold">{post.username}</span>
                                                <span className="text-xs">{post.createAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p dangerouslySetInnerHTML={{ __html: isExpanded ? post.content : contentPreview }}></p>
                                    {post.content.length > 400 && (
                                        <button onClick={() => toggleExpand(post.id)} className="font-bold hover:underline">
                                            {isExpanded ? "Thu gọn" : "Xem thêm"}
                                        </button>
                                    )}
                                    <div className="mt-2 flex items-center">
                                        <button onClick={() => userLikedPosts[post.id] ? unlikePost(post.id) : likePost(post.id)}>
                                            <FontAwesomeIcon className="w-6 h-6 me-3 hover:opacity-70 bg-[" icon={faHeart} color={userLikedPosts[post.id] ? "red" : "black"} />
                                        </button>
                                        <FontAwesomeIcon className="w-6 h-6 me-3 hover:opacity-70" icon={faComment} />
                                        <FontAwesomeIcon className="w-6 h-6 me-3 hover:opacity-70" icon={faPaperPlane} />
                                    </div>
                                    <span className="font-bold">{likes[post.id] || 0} likes</span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
            <div className="w-1/3 ps-16">
                <div className="flex items-center mb-3">
                    <img className="rounded-full h-10 w-10" src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/top-36-anh-dai-dien-dep-cho-nu/anh-dai-dien-dep-cho-nu-che-mat-anime.jpg?1708401649581" />
                    <div>
                        <span className="ms-3 block font-bold">ktnguyen</span>
                    </div>
                </div>
                <p className="font-bold text-[#333] mb-4">Suggested for you</p>
                {/* Danh sách gợi ý */}
                {Array(4).fill(0).map((_, index) => (
                    <div className="flex items-center mb-3" key={index}>
                        <img className="rounded-full h-10 w-10" src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/top-36-anh-dai-dien-dep-cho-nu/anh-dai-dien-dep-cho-nu-che-mat-anime.jpg?1708401649581" />
                        <div>
                            <span className="ms-3 block font-bold">ktnguyen</span>
                        </div>
                    </div>
                ))}
                <p className="mt-5 text-sm text-[#333]">© 2024 Instagram from Meta</p>
            </div>
        </div>
    )

}