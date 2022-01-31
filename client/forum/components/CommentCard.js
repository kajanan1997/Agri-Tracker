import React from "react";
import {Link} from "react-router-dom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import {makeStyles} from "@material-ui/core/styles";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import auth from "../../auth/auth-helper";
import {removeComment} from "../api-forum";
const useStyles = makeStyles((theme)=>({
    post:{
        margin: "1rem",
        padding:"1rem",
        paddingBottom: "1rem",
        borderRadius:"10px",
        borderBottom: "1px solid #E6EAEE",
        fontFamily:"-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif",
        '&:last-child':{
            paddingBottom: 0,
            borderBottom: "none",
        },
        backgroundColor:"lightblue"
    },
    mediaContentP:{
        fontSize: "14px",
        lineHeight: "2.3",
        fontWeight: 700,
        color: "#8F99A3"
    },
}))
export default function CommentCard({content,commentedByName,timestamp,commentedById,postedById,commentId,postId,setPost}) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const classes = useStyles()
    const deleteComment = (event)=>{
        event.preventDefault()
        const sendData = {
            commentId:commentId,
            postId:postId,
        }
        removeComment(sendData,auth.isAuthenticated().token).then((data)=>{
            setPost(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <article className={classes.post}>
            <p className={"is-size-4"}>{content}</p>
            <div className="media">
                <div className="media-content">
                    <div className="content">
                        <p className={classes.mediaContentP}>
                            <Link to={"/user/"+commentedById}>@{commentedByName}</Link>
                        </p>
                    </div>
                </div>
                <div className="media-right">
                    <span className={"mr-5"}>Added  {timeAgo.format(timestamp)}</span>
                    {
                        (auth.isAuthenticated().user._id == commentedById || auth.isAuthenticated().user._id == postedById)&&(
                            <button className="is-small button has-text-grey " onClick={deleteComment}>Delete</button>
                        )
                    }
                </div>
            </div>
        </article>
    )
}