import React, {useEffect, useState} from "react";
import {list} from "./api-news";
import auth from "../auth/auth-helper";
import NewsCard from "./components/NewsCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {Link} from "react-router-dom";


export default function ViewNewsPage() {
    const [news,setNews] = useState([])
    const [backdrop,setBackDrop] = useState(false)
    useEffect(()=>{
        setBackDrop(true)
        list({t:auth.isAuthenticated().token}).then((data)=>{
           setNews(data.reverse())
           setBackDrop(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <div className={"container"}>
            <Backdrop open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
           <div className={"section content"}>
              <h1>Announcements</h1>
           </div>
            <div>
                <div className={"row columns is-multiline content"}>
                    {news.map((n,i)=>{
                        return (
                            <NewsCard title={n.news_heading} content={n.content} created={n.created.substring(0,10)} id={n._id}/>
                        )
                    })}
                </div>
            </div>
            <div className={"section"}>
                <Link to={"/news/add"}>
                    <button className={"button is-info"}>Add Announcement</button>
                </Link>
            </div>
        </div>
    )
}