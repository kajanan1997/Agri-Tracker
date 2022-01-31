import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {Link, Redirect} from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import DeleteIcon from '@material-ui/icons/Delete'
import auth from "../../auth/auth-helper";
import {remove} from "../api-forum";
const useStyles = makeStyles((theme)=>({
    post:{
        margin: "1rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid #E6EAEE",
        fontFamily:"-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif",
        '&:last-child':{
            paddingBottom: 0,
            borderBottom: "none",
        }
    },
    mediaContentP:{
        fontSize: "14px",
        lineHeight: "2.3",
        fontWeight: 700,
        color: "#8F99A3"
    },
}))
export default function ForumCard({question,setProgress}) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const classes = useStyles()
    const [redirect,setRedirect] = useState(false)
    const deletePost = (event)=>{
        event.preventDefault()
        setProgress(true)
        remove(question.id,auth.isAuthenticated().token).then((data)=>{
             setProgress(false)
             setRedirect(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
    if(redirect)
        return <Redirect to={"/forum/"}/>
    return(
        <article className={classes.post}>
            <Link to={"/forum/"+question.id} >
            <h4 className={"is-size-3"}>{question.heading}</h4>
            </Link>
            <div className="media">
                <div className="media-left">
                    <p className="image is-32x32">

                    </p>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p className={classes.mediaContentP}>
                            <Link to={"/user/"+question.askedById}>@{question.askedBy}</Link>    <span>Added  {timeAgo.format(question.time)}</span>
                        </p>
                    </div>
                </div>
                <div className="media-right is-flex is-flex-direction-row ">

                    <div className={"mr-4"}>
                        {
                            (auth.isAuthenticated() && (auth.isAuthenticated().user._id == question.askedById))&&(
                                    <DeleteIcon onClick={deletePost} className={"is-clickable"}/>
                            )
                        }
                    </div>
                    <div className="has-text-grey-dark">{question.answerCount}<ChatBubbleIcon/></div>

                </div>
            </div>
        </article>
    )
}