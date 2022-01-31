import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {Redirect} from "react-router";
import {remove} from "../api-feedback";
import auth from "../../auth/auth-helper";

export default function FeedBackCard({subject,content,name,date,id}) {
    const [redirect,setRedirect] = useState(false)
    const deleteCard = (event)=>{
         event.preventDefault()
         remove(id,auth.isAuthenticated().token).then(
             (data)=>{
                 if(data.error){
                     console.log(data.error)
                 }else {
                     setRedirect(true)
                 }
             }
         ).catch((err)=>{
             console.log(err)
         })
    }
    if(redirect){
        return(
            <Redirect to={"/feedback/view"}/>
        )
    }
    return(
        <div style={{
            height:"auto",
        }}>
               <div className={"Box has-background-info-light mx-4 my-2 py-2 px-3"} style={{
                   border:"solid black"
               }}>
                   <div className={"py-3 pl-2 "}>
                       <h4 className={" is-size-3"}>{subject}</h4>
                   </div>
                   <div className={"py-3 pl-2"}>
                       <h4 className={"is-size-6"}>{name}</h4>
                   </div>
                   <div className={"py-1 pl-2 "}>
                       <h6 className={"is-size-6"}>{date}</h6>
                   </div>
                    <div className={"py-3 pl-2"}>
                        <p>
                            {content}
                        </p>
                    </div>
                   <div className={"is-flex is-flex-direction-row-reverse"}>
                       <DeleteIcon className={"ml-5"}  style={{
                           cursor:"pointer"
                       }} onClick={deleteCard}/>
                   </div>
               </div>
           </div>

    )
}