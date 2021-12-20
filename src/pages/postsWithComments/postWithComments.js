import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { clearCurrentPost, getComments, getCurrentPost } from "../../actions/dataActions"
import { connect } from "react-redux"


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


const PostWithComments = ({ getComments, getCurrentPost, clearCurrentPost, ...rest }) => {
    const { postId } = useParams()
    const { currentPost, currentPostComments } = rest.data


    useEffect(() => {
        if (!currentPost) {
            getCurrentPost(postId)
        }
        window.scrollTo(0, 0)
        return () => clearCurrentPost()
        //eslint-disable-next-line
    }, [])


    return (
        <div>

            <div style={{ marginBottom: 20 }}>
                <Button component={Link} to="/">Back</Button>
            </div>

            <PostAndCommentsCard
                post={currentPost}
                comments={currentPostComments}
            />
        </div>
    )
}


const PostCommentsCard = ({ post, comments, getComments }) => {
    return <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {post?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {post?.body}
            </Typography>
        </CardContent>
        <CardActions>
            {
                (!comments?.length) && <Button onClick={() => getComments()} size="small">Load Comments</Button>
            }

        </CardActions>
        <CommentsList comments={comments} />
    </Card>
}

const PostAndCommentsCard = connect(null, {
    getComments
})(PostCommentsCard)


function CommentsList({ comments }) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {(comments || []).map(({ id, name, email, body }) => <ListItem key={id}>
                <ListItemAvatar>
                    <Avatar>
                        {name.charAt(0).toUpperCase()}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<div>
                        <div>{name}</div>
                        <div>{email}</div>
                    </div>}
                    secondary={body}
                />
            </ListItem>)}
        </List>
    );
}



const mapState = state => state
const mapDispatch = { getComments, getCurrentPost, clearCurrentPost }
export default connect(mapState, mapDispatch)(PostWithComments)