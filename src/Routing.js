import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import BlogPosts from "./pages/blogPosts/blogPosts"
import PostWithComments from "./pages/postsWithComments/postWithComments";

const Routing = () => {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogPosts />} />
          <Route path="/blogs/:postId" element={<PostWithComments />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default Routing