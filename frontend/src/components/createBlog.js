import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleTagAdd = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handlePost = async () => {
    try {
      if (!title || !description) {
        alert("Title and description are required!");
        return;
      }

      setIsPosting(true);

      const body = {
        title,
        description,
        tags,
      };

      const apiUrl = `${process.env.REACT_APP_API_URL}/`;
      const response = await axios.post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Blog posted successfully!");
      navigate(`/${response.data._id}`, { state: response.data });
    } catch (error) {
      console.error("Error posting blog:", error.message);
      alert("Failed to post the blog. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setTags([]);
    setNewTag("");
  };

  return (
    <div className="ml-[15%] w-[85%] h-screen flex flex-col justify-evenly text-center items-center">
      <textarea
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Enter title"
        className="h-[10%] w-[90%] p-4 rounded-md shadow-md text-center resize-none border-2 border-gray-400 focus:outline-none focus:border-black"
      ></textarea>

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Enter description"
        className="h-[50%] w-[90%] p-4 rounded-md shadow-md text-left resize-none border-2 border-gray-400 focus:outline-none focus:border-black"
      ></textarea>

      <div className="bg-gray-300 h-[10%] w-[90%] flex items-center justify-center rounded-md shadow-md">
        Tags:
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag"
            className="px-2 py-1 rounded-md border-2 border-gray-400"
          />
          <button
            onClick={handleTagAdd}
            className="px-4 py-2 rounded-md bg-black text-white font-black hover:scale-110"
          >
            Add Tag
          </button>
        </div>
        <div className="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="bg-gray-400 p-1 m-1 rounded-md text-sm">
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[40%] flex justify-evenly h-[5%]">
        <button
          onClick={handlePost}
          disabled={isPosting || !token}
          className={`px-6 rounded-md bg-black text-white font-black hover:scale-110 ${!token ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPosting ? "Posting..." : "Post Blog"}
        </button>
        <button
          onClick={handleCancel}
          disabled={isPosting}
          className="px-6 rounded-md bg-gray-500 text-white font-black hover:scale-110"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
