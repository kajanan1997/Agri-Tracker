import React, {useState} from "react";
import {Link} from "react-router-dom";
import auth from "../auth/auth-helper";
import {create} from "./api-feedback";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
export default function SendFeedBackPage({history}) {
    const [values,setValues] = useState({
        name:(auth.isAuthenticated() ? auth.isAuthenticated().user.name:"Guest"),
        subject:"",
        content:"",
    })
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleSubmit =(event)=>{
        setError("")
        setSuccess("")
        event.preventDefault()
        const feedback = values
        create(values).then((response)=>{
           if(response.error){
                setError(response.error)
           }else{
               setSuccess(response.message)
               setTimeout(()=>{
                   history.push("/")
               },1000)
           }
        }).catch((error)=>{
            console.log(error)
            setError("Some error occurred ")
        })
    }
    return(
        <div className={"container"}>
           <div className={"section content mb-0 mt-5 is-flex is-justify-content-center"}>
               <h1 className={"is-size-2"} >Give feedback</h1>
           </div>
            <div className={"section mt-0"}>
                <form className={"form"} onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label is-size-2">Subject</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Subject" onChange={handleChange("subject")} required/>
                        </div>
                    </div>
                    <div className="field ">
                        <label className="label is-size-2">Feedback </label>
                        <div className="control">
                           <textarea className="textarea" placeholder="Give your feedback"  rows={"20"} onChange={handleChange("content")}>

                           </textarea>
                        </div>
                    </div>
                    <button type={"submit"} className={"button is-success is-normal ml-5"}>
                        Send feedback
                    </button>
                    <Link to={"/feedback/"}>
                        <button className={"button is-danger is-normal ml-5"}>
                            Cancel
                        </button>
                    </Link>
                </form>
                <div className={"container section"}>
                    {error &&(<div className="notification is-danger">
                        <button className="delete" onClick={(event)=>{
                            setError("")
                        }}/>
                        {error}
                    </div>)}
                    {success &&(<div className="notification is-success">
                        <button className="delete" onClick={(event)=>{
                            setSuccess("")
                        }}/>
                        {success}
                    </div>)}
                </div>
            </div>
        </div>

    )
}