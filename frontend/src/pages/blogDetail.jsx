import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BlogDetail = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  let blogData = location.state;
  const [newTitle, setNewTitle] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [newDescription, setNewDescription] = useState();
  let { blogId } = useParams();
  let [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // If token is available, decode it to get the userId
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Assuming the token contains userId
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    if (blogData) {
      setTitle(blogData.title);
      setDescription(blogData.description);
      setNewTitle(blogData.title);
      setNewDescription(blogData.description);
    }
  }, [blogData, token]);

  const handleEdit = () => {
    setIsEditing(true);
    setNewTitle(blogData.title);
    setNewDescription(blogData.description);
  };

  const handleSave = async () => {
    try {
      setIsEditing(false);

      const body = {
        title: newTitle,
        description: newDescription,
      };

      const apiUrl = `${process.env.REACT_APP_API_URL}/${blogData._id}`;
      const response = await axios.put(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedBlog = response.data;
      setTitle(updatedBlog.title);
      setDescription(updatedBlog.description);
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error.message);
      alert("Failed to update the blog. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/${blogData._id}`;
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      alert(
        error.response?.data?.message ||
          "Failed to delete the blog. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(blogData.title);
    setNewDescription(blogData.description);
  };

  const isAdminOrOwner = token && blogData?.createdBy === userId;

  if (!blogData) {
    return (
      <div className="ml-[15%] w-[85%] h-screen">
        Invalid route: There is no blog with this id "{blogId}"
      </div>
    );
  }

  return (
    blogId === blogData._id && (
      <div className="ml-[15%] w-[85%] h-screen flex flex-col justify-evenly text-center items-center">
        {isEditing ? (
          <textarea
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            value={newTitle}
            className=" h-[10%] w-[90%] p-4 rounded-md shadow-md text-center resize-none border-2 border-gray-400 focus:outline-none focus:border-black"
          ></textarea>
        ) : (
          <div className="bg-gray-300 h-[10%] w-[90%] flex items-center justify-center rounded-md shadow-md">
            {title}
          </div>
        )}

        {isEditing ? (
          <textarea
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
            value={newDescription}
            className=" h-[50%] w-[90%] p-4 rounded-md shadow-md text-left resize-none border-2 border-gray-400 focus:outline-none focus:border-black"
          ></textarea>
        ) : (
          <div className="bg-gray-300 h-[50%] w-[90%] p-4 rounded-md shadow-md overflow-y-auto">
            {description}
          </div>
        )}

        <div className="bg-gray-300 h-[10%] w-[90%] flex items-center justify-center rounded-md shadow-md">
          Tags:{" "}
          {blogData.tags.map((item, i) => (
            <b key={i} className="bg-gray-400 p-1 m-1 rounded-md text-sm">
              {item}
            </b>
          ))}
        </div>

        <div className="w-[40%] flex justify-evenly h-[5%]">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={!isAdminOrOwner}
              className={`px-6 rounded-md bg-black text-white font-black hover:scale-110 ${!isAdminOrOwner ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              disabled={!isAdminOrOwner}
              className={`px-6 rounded-md bg-black text-white font-black hover:scale-110 ${!isAdminOrOwner ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Edit
            </button>
          )}
          {isEditing ? (
            <button
              onClick={handleCancel}
              disabled={!isAdminOrOwner}
              className={`px-6 rounded-md bg-black text-white font-black hover:scale-110 ${!isAdminOrOwner ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={handleDelete}
              disabled={!isAdminOrOwner}
              className={`px-6 rounded-md bg-black text-white font-black hover:scale-110 ${!isAdminOrOwner ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default BlogDetail;
