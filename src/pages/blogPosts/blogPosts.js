import { useEffect } from "react"
import { connect } from "react-redux"
import { getBlogs } from "../../actions/dataActions"

import BasicCard from "./postCard"

const BlogPosts = ({ getBlogs, posts, ...rest }) => {

    useEffect(() => {
        getBlogs()
        document.title = "Blogs View"
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {posts.map((el) =>
                <div key={el.id} style={{ marginBottom: 20 }}>
                    <BasicCard data={el} />
                </div>
            )}
        </>
    )
}

const mapState = state => {
    return {
        posts: state.data.posts
    }
}
const mapDispatch = {
    getBlogs
}
export default connect(mapState, mapDispatch)(BlogPosts)