import React, {useEffect, useState} from "react";
import bookmark from "../datastores/bookmark-ds";
import BookMarkCard from "./components/BookMarkCard";

export default function ViewBookMarksPage() {
    const [bookmarks,setBookmarks] = useState([])
    useEffect(()=>{
        setBookmarks(Object.values(bookmark.getStore()))
    },[])
    const emptyBookmarks = (event)=>{
        event.preventDefault()
        setBookmarks([])
        bookmark.emptyStore()
    }
    return(
        <div className={"container"}>
           <div className={"content section"}>
               <h1>Bookmarked Harvests</h1>
               <div className={"is-flex is-flex-direction-row-reverse"}>
                   <button className={"button is-link"} onClick={emptyBookmarks}>
                      Clear Bookmarks
                   </button>
               </div>
           </div>
            <div className={"section"}>
                <div className={"row columns is-multiline"}>
                    {bookmarks.map((data,i)=>{
                        return(
                                <BookMarkCard item={data} number={i+1}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}