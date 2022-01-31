import React, {useEffect, useState} from "react";
import FeedBackCard from "./components/FeedBackCard";
import {list} from "./api-feedback";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ViewFeedBacksPage() {

    const [feedBacks,setFeedBacks] = useState([])
    const [backDrop,setBackDrop] = useState(true)
    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data)=>{
            setFeedBacks(data.reverse())
            setBackDrop(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(<div className={"container"}>
        <Backdrop open={backDrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
       <div className={"section  content is-flex is-justify-content-center"}>
           <h1 className={"is-size-2"}>
               Feedbacks
           </h1>
       </div>
        <div className={"container "}>
            <div className={"is-flex is-flex-direction-column"}>
                {feedBacks.map((fb,i)=>{
                    return(
                        <FeedBackCard name={fb.name} content={fb.content} date={fb.timestamp.substring(0,10)} subject={fb.subject} id={fb._id}/>
                    )
                })}
            </div>
        </div>
    </div>)
}