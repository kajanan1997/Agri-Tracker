import React, {useEffect, useState} from "react";
import {list} from "./api-message";
import auth from "../auth/auth-helper";
import MessageCard from "./components/MessageCard";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ViewMessages() {
    const [receivedMessages,setReceivedMessages] = useState([])
    const [sentMessages,setSentMessages] = useState([])
    const [toggle,setToggle] = useState(false)
    const [backDrop,setBackDrop] = useState(true)
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal,auth.isAuthenticated().token).then((data)=>{
            setReceivedMessages(data.receivedMessages)
            setSentMessages(data.sentMessages)
            setBackDrop(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <div className={"container"}>
            <Backdrop open={backDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={"section content"}>
                <h1 className={"is-size-1"}>{toggle?" Sent ":" Received "} Messages</h1>
            </div>
            <div className={"section content pt-0 is-flex is-justify-content-center"}>
                <button className={"button is-link "} onClick={(event => {
                    event.preventDefault()
                    setToggle(!toggle)
                })}>
                    {toggle?"Show received":"Show sent"}
                </button>
            </div>
            {!toggle && (<div className={"container"}>
                {receivedMessages.map((message,i)=>{
                    return(
                        <MessageCard key={i} type={false} subject={message.subject} date={message.timestamp} message={message.message} recepient={message.from.name}
                                     recepientId={message.from._id} id={message._id}/>
                    )
                })}
            </div>)}
            {toggle && (<div className={"container"}>
                {sentMessages.map((message,i)=>{
                    return(
                        <MessageCard key={i} type={true} subject={message.subject} date={message.timestamp} message={message.message}
                                     recepientId={message.to._id} recepient={message.to.name}  id={message._id}/>
                    )
                })}
            </div>)}
        </div>
    )
}