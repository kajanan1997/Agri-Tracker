import React, {useEffect, useState} from 'react'
import ForumCard from "./components/ForumCard";
import {makeStyles} from "@material-ui/core/styles";
import {create, list} from "./api-forum";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import auth from "../auth/auth-helper";


const useStyles = makeStyles((theme)=>({
    containerColumns:{
        margin: "3rem 0"
    }
}))
export default function ViewForumPage() {
    const [posts,setPosts] = useState([])
    const [backdrop,setBackdrop] = useState(true)
    const [showNewPost,setShowNewPost] = useState(true)
    const [progress,setProgress] = useState(false)
    const [values,setValues] = useState({
           heading:"",
           content:"",
    })
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal,auth.isAuthenticated().token).then((data)=>{
            setPosts(data)
            setBackdrop(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    const handleSubmit = (event)=>{
        event.preventDefault()
        setBackdrop(true)
        const post = values
        create(post,auth.isAuthenticated().user._id,auth.isAuthenticated().token).then((data)=>{
            setPosts([data,...posts])
            setValues({
                heading: "",
                content: ""
            })
            setBackdrop(false)

        }).catch((err)=>{
            console.log(err)
        })
    }
    if(backdrop){
        return (
            <Backdrop open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    return(
        <div className={"container"}>
           <div className={"content section"}>
               <h1>Forum</h1>
               {

                   progress&&( <progress className="progress is-small is-link" max="100">15%</progress>)
               }
           </div>
            <div className={"container"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-12"}>
                        {
                            showNewPost && (
                                <div className={"box content has-background-link-light"}>
                                    <form className={"form"} onSubmit={handleSubmit}>
                                        <div className={"field"}>
                                            <div className={"control"}>
                                                <input className="input" type="text" placeholder="Post Heading" required onChange={handleChange("heading")} value={values.heading}/>
                                            </div>
                                        </div>
                                        <div className={"field"}>
                                            <div className={"control"}>
                                      <textarea className="textarea" placeholder="Add Post" required onChange={handleChange("content")} value={values.content}>

                                      </textarea>
                                            </div>
                                        </div>
                                        <div className={"field"}>
                                            <div className={"control"}>
                                                <div className={"level"}>
                                                    <div className={"level-left"}>
                                                        <div className={"level-item"}>
                                                            <button className={"button is-success"} type={"submit"}>Add post</button>
                                                            <button className={"button is-danger"} onClick={(event)=>{
                                                                event.preventDefault()
                                                                setShowNewPost(false)
                                                            }}>Cancel post</button>
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
                                </div>
                            )
                        }


                        <div className={"box content"}>
                            {posts.map((pst,i)=>{
                                return(
                                    <ForumCard question={{
                                        heading: pst.heading,
                                        askedBy: pst.postedBy.name,
                                        askedById:pst.postedBy._id,
                                        answerCount: pst.comments.length,
                                        time: new Date(pst.createdAt),
                                        id:pst._id
                                    }
                                    } key={i} setProgress={setProgress}/>
                                )
                            })   }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}