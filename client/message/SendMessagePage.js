import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {create} from "./api-message";
import auth from "../auth/auth-helper";

export default function SendMessagePage({match}) {
    const [values,setValues] = useState({
        subject:"",
        message:"",
    })
    const [error,setError] = useState("")
    const [progress,setProgress] = useState(false)
    const [success,setSuccess]= useState("")
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        setError("")
        setProgress(true)
        const sendData = {
            to:match.params.userId,
            message:values
        }
        create(sendData,auth.isAuthenticated().token).then((data)=>{
           if(data.error){
               setProgress(false)
               setError(data.error)
           }else{
               setProgress(false)
               setSuccess(data.message)
           }
        }).catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div className={"container"}>
            <div className={"section content mb-0"}>
               <h1 className={"is-size-2"} >Send Message </h1>
            </div>
            <div className={"section mt-0 pt-0"}>
                <form className={"form"} onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label is-size-2">Subject</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Subject" onChange={handleChange("subject")} required/>
                        </div>
                    </div>
                    <div className="field ">
                        <label className="label is-size-2">Message </label>
                        <div className="control">
                           <textarea className="textarea" placeholder="Message"  rows={"15"} onChange={handleChange("message")}>

                           </textarea>
                        </div>
                    </div>
                    <button type={"submit"} className={"button is-success is-normal ml-5"}>
                        Send message
                    </button>
                    <Link to={"/users/"}>
                        <button className={"button is-danger is-normal ml-5"}>
                            Cancel
                        </button>
                    </Link>
                </form>
                <div className={"container block mt-4"}>
                    {
                        progress&&( <progress className="progress is-small is-link" max="100">15%</progress>)
                    }
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