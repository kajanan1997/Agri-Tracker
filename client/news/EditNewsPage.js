import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {create, read, update} from "./api-news";
import auth from "../auth/auth-helper";

export default function EditNewsPage({match,history}) {
    const [values, setValues] = useState({
        news_heading:'',
        content:'',
    })
    const [error,setError] = useState("")
    useEffect(()=>{
       read(match.params,{t:auth.isAuthenticated().token}).then((data)=>{
           setValues({
               news_heading: data.news_heading,
               content: data.content
           })
       }).catch((err)=>{
           console.log(err)
       })
    },[])
    const submitFunc = (event)=>{
        event.preventDefault()
        const news = values
        setError("")
        update(match.params,{t:auth.isAuthenticated().token},news).then((data)=>{
           if(data.error){
              setError(data.error)
           }else{
               history.push("/news/")
           }
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    return(
        <div className={"container"}>
            <div className={"section"}>
               <h1 className={"is-size-2"}>Edit Announcement </h1>
            </div>
            <div>
                <div className={"section mt-0"}>
                    <form className={"form"} onSubmit={submitFunc}>
                        <div className="field">
                            <label className="label is-size-2">Heading</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Heading" onChange={handleChange("news_heading")} value={values.news_heading} required/>
                            </div>
                        </div>
                        <div className="field ">
                            <label className="label is-size-2">Content</label>
                            <div className="control">
                           <textarea className="textarea" placeholder="Add news content here" onChange={handleChange("content")} rows={"5"} value={values.content}>

                           </textarea>
                            </div>
                        </div>
                        <button type={"submit"} className={"button is-success is-normal ml-5"}>
                            Update Announcement
                        </button>
                        <Link to={"/news/"}>
                            <button className={"button is-danger is-normal ml-5"}>
                                Cancel
                            </button>
                        </Link>
                    </form>
                </div>
                {error &&(<div className="notification is-danger">
                    <button className="delete" onClick={(event)=>{
                        setError("")
                    }}/>
                    {error}
                </div>)}
            </div>
        </div>
    )
}