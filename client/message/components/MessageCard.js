import React, {useState} from "react";
import {Redirect} from "react-router";
import {remove} from "../api-message";
import auth from "../../auth/auth-helper";
import {Link} from "react-router-dom";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
export default function MessageCard({subject,message,type,date,recepient,id,recepientId}) {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
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
            <Redirect to={"/message/"}/>
        )
    }
    return(
        <div style={{
            height:"auto",
        }}>
            <div className={"Box has-background-warning-light mx-4 my-2 py-2 px-3"} style={{
                border:"solid black",
                borderRadius:"10px"
            }}>
                <div className={"py-3 pl-2 "}>
                    <h4 className={" is-size-3"}>{subject}</h4>
                </div>
                <div className={"py-3 pl-2"}>
                    <h4 className={"is-size-6"}><span className={"has-text-weight-bold pr-4"}>{(type?"To : ":"From : ")}</span>
                        <Link to={"/user/"+recepientId}>{recepient}</Link></h4>
                </div>
                <div className={"py-1 pl-2 "}>
                    <h6 className={"is-size-6"}><span className={"has-text-weight-bold pr-4"}>{type?"Sent :":"Received : "} </span>{timeAgo.format(new Date(date))}</h6>
                </div>
                <div className={"py-3 pl-2"}>
                    <p className={"is-size-5"}>
                        {message}
                    </p>
                </div>
                <div className={"is-flex is-flex-direction-row-reverse"}>
                    <button className={"ml-5 button is-danger"}  onClick={deleteCard}>Delete for Everyone</button>
                </div>
            </div>
        </div>

    )
}