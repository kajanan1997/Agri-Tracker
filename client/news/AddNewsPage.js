import React, {useState} from "react";
import {Link} from "react-router-dom";
import {create} from "./api-news";
import auth from "../auth/auth-helper";

export default function AddNewsPage({history}) {
    const [values, setValues] = useState({
        news_heading:'',
        content:'',
    })
    const submitFunc = (event)=>{
       event.preventDefault()
        const news = values
        create(news,{t:auth.isAuthenticated().token}).then(
           history.push("/news/")
        ).catch((err)=>{
            console.log(err)
        })
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    return(
        <div className={"container"}>
            <div className={"section content mb-0 is-flex is-justify-content-center"}>
                <h1 className={"is-size-1"}>Add Announcement </h1>
            </div>
            <div className={"section mt-0"}>
               <form className={"form"} onSubmit={submitFunc}>
                   <div className="field">
                       <label className="label is-size-2">Heading</label>
                       <div className="control">
                           <input className="input" type="text" placeholder="Heading" onChange={handleChange("news_heading")} required/>
                       </div>
                   </div>
                   <div className="field ">
                       <label className="label is-size-2">Content</label>
                       <div className="control">
                           <textarea className="textarea" placeholder="Add news content here" onChange={handleChange("content")} rows={"5"}>

                           </textarea>
                       </div>
                   </div>
                   <button type={"submit"} className={"button is-success is-normal ml-5"}>
                       Post Announcement
                   </button>
                   <Link to={"/news/"}>
                       <button className={"button is-danger is-normal ml-5"}>
                           Cancel
                       </button>
                   </Link>
               </form>
            </div>
        </div>
    )
}