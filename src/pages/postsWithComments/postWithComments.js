import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { clearCurrentPost, getComments } from "../../actions/dataActions"
import { connect } from "react-redux"

const PostWithComments = ({ getComments, clearCurrentPost, ...rest }) => {

    const { postId } = useParams()

    useEffect(() => {
        getComments(postId)
        return () => clearCurrentPost()
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            Hello World
            {JSON.stringify(rest)}
        </div>
    )
}

const mapState = state => state
const mapDispatch = { getComments, clearCurrentPost }
export default connect(mapState, mapDispatch)(PostWithComments)