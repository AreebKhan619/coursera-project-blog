import { useEffect, useMemo } from "react"
import { connect } from "react-redux"
import { getBlogs, handleSearchText } from "../../actions/dataActions"

import BasicCard from "./postCard"

const BlogPosts = ({ getBlogs, posts, searchText, handleSearchText, ...rest }) => {

    useEffect(() => {
        getBlogs()
        document.title = "Blogs View"
        //eslint-disable-next-line
    }, [])


    const filteredPosts = useMemo(() => posts.filter(post => {
        return post.title.toLowerCase().includes(searchText.toLowerCase())
        //eslint-disable-next-line
    }), [searchText, posts])

    return (
        <>
            <div>
                <input
                    style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid lightgrey",
                        padding: 10,
                        fontSize: 20,
                        marginBottom: 10
                    }}
                    placeholder="Filter by title..."
                    value={searchText}
                    onChange={handleSearchText}
                />
            </div>
            <div>
                {filteredPosts.map((el) =>
                    <div key={el.id} style={{ marginBottom: 20 }}>
                        <BasicCard data={el} />
                    </div>
                )}
            </div>
        </>
    )
}

const mapState = state => {
    return {
        posts: state.data.posts,
        searchText: state.data.searchText
    }
}
const mapDispatch = {
    getBlogs,
    handleSearchText
}
export default connect(mapState, mapDispatch)(BlogPosts)