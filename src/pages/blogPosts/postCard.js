import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"
import { setCurrentPost } from '../../actions/dataActions';
import { connect } from 'react-redux';

function BasicCard({ data, setCurrentPost }) {
    const { id, title, body, name, username } = data
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Post #{id}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    by {name} ({username})
                </Typography>
                <Typography variant="body2">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link}
                    onClick={() => setCurrentPost(data)}
                    to={`/blogs/${id}`}
                    key={id}
                    variant="contained" size="small">View Post</Button>
            </CardActions>
        </Card>
    );
}

const mapDispatch = {
    setCurrentPost
}
export default connect(null, mapDispatch)(BasicCard)