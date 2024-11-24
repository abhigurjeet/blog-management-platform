import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BlogDetail from "./pages/blogDetail";
import PostNewBlog from "./pages/postNewBlog";
function App() {
  return (
    <div className="flex">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:blogId" element={<BlogDetail />}></Route>
        <Route path="/create" element={<PostNewBlog />}></Route>
      </Routes>
    </div>
  );
}

export default App;
