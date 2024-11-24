import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AllBlogs = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  const onCardClick = (item) => {
    navigate(`/${item._id}`, { state: item });
  };
  useEffect(() => {
    if (textSearch === "") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs((prev) => {
        let res = prev.filter(
          (item) =>
            item["title"].includes(textSearch) ||
            item["description"].includes(textSearch),
        );
        return res;
      });
    }
  }, [textSearch]);
  useEffect((effect) => {
    axios
      .get(process.env.REACT_APP_API_URL)
      .then((res) => {
        let newData = res.data.map((item, i) => {
          return {
            ...item,
            image: `/images/${Math.floor(Math.random() * (4 - 1)) + 1}.png`,
          };
        });
        console.log(newData);
        setBlogs(newData);
        setFilteredBlogs(newData);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="ml-[15%] w-[85%]">
      <div className="w-full p-4 text-center ">
        <input
          ref={searchInputRef}
          type="text"
          onChange={(e) => {
            setTextSearch(e.target.value);
          }}
          placeholder="Search here..."
          className="w-[80%] mx-auto py-4 px-6 rounded-lg border-2 border-[rgb(211,211,211)] text-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
        />
      </div>

      <div className="flex flex-wrap justify-evenly overflow-y-auto gap-10 p-5">
        {filteredBlogs.map((item, i) => {
          return (
            <div
              key={item._id}
              onClick={() => onCardClick(item)}
              className="w-[26%] max-sm:w-full bg-[rgb(211,211,211)] h-[400px] rounded-3xl p-3 cursor-pointer"
            >
              <div className="w-[90%]  m-auto h-[60%]">
                <img
                  src={item.image}
                  alt="mountains"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-[90%] m-auto font-black text-center p-2">
                {item.title.slice(0, 50)}
              </div>
              <div className="w-[90%] m-auto font-medium text-left p-2">
                {item.description.slice(0, 100) + "..."}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AllBlogs;
