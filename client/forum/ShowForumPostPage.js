import React, {useEffect, useState} from "react";
import CommentCard from "./components/CommentCard";
import {addComment, read} from "./api-forum";
import auth from "../auth/auth-helper";
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress} from "@material-ui/core";

export default function ShowForumPostPage({match}) {
    const [post,setPost] = useState({})
    const [backdrop,setBackdrop] = useState(true)
    const [error,setError] = useState("")
    const [values,setValues] = useState({
        content:""
    })
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        const sendData = {
            postId:match.params.postId,
            comment:{
                commentContent:values.content
            }
        }
        setBackdrop(true)
        addComment(sendData, auth.isAuthenticated().token).then((data)=>{
            if(data.error){

            }else{
                setPost(data)
                setBackdrop(false)
                setValues({
                    content: ""
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        read(match.params.postId,auth.isAuthenticated().token,signal).then((data)=>{
            setPost(data)
            setBackdrop(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    if(backdrop){
        return (
            <Backdrop open={backdrop} >
               <CircularProgress/>
            </Backdrop>
        )
    }
    return(
        <div className={"container"}>
            <div className={"section content pb-1"}>
                <div className={"has-background-info px-2 py-2"} style={{
                    borderRadius:"10px"
                }}>
                    <h1 className={"is-size-1 "}>{post.heading}</h1>
                    <p className={"is-size-2"}>
                        {post.content}
                    </p>
                    <p className={"is-size-6 has-text-weight-semibold"}>
                        <a href={"/user/"+post.postedBy._id}>@{post.postedBy.name}</a>
                    </p>
                </div>
            </div>
            <div>
                {post.comments.map((obj,i)=>{
                    return(
                        <CommentCard key={i} content={obj.commentContent} commentedByName={obj.commentedBy.name} commentedById={obj.commentedBy._id}
                        timestamp={new Date(obj.timestamp)} postedById={post.postedBy._id}
                        commentId={obj._id} postId={post._id} setPost={setPost}
                        />
                    )
                })}
            </div>
            <div>
                <form className={"form"} onSubmit={handleSubmit}>
                    <div className={"field"}>
                        <div className={"control"}>
                                      <textarea className="textarea" placeholder="Add Comment" required onChange={handleChange("content")} value={values.content}>

                                      </textarea>
                        </div>
                    </div>
                    <div className={"field"}>
                        <div className={"control"}>
                            <div className={"level"}>
                                <div className={"level-left"}>
                                    <div className={"level-item"}>
                                        <button className={"button is-success"} type={"submit"}>Add comment</button>
                                        <button className={"button is-danger"} onClick={(event => {
                                            event.preventDefault()
                                            setValues({content: ""})
                                        })}>Reset</button>
                                    </div>
                                </div>
                                <div className={"level-right"}>
                                    <div className={"level-item"}>
                                        <span className={"mr-4"}>Posting as</span>
                                        <span className={"is-size-6 has-text-weight-semibold"}>@{auth.isAuthenticated().user.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className={"block mt-4"}>
                    {error &&(<div className="notification is-danger">
                        <button className="delete" onClick={(event)=>{
                            event.preventDefault()
                            setError("")
                        }}/>
                        {error}
                    </div>)}
                </div>
            </div>
        </div>
    )
}