import React, {useEffect, useState} from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import bookmark from "../../datastores/bookmark-ds";
export default function BookmarkStar ({harvest}) {
    const[selected,setSelected] = useState(false)
    useEffect(()=>{
        if(bookmark.checkPresent(harvest._id)){
            setSelected(true)
        }
    },[])
    const toggleSelections = (event)=>{
        event.preventDefault()
        setSelected(!selected)
        if(!selected){
            bookmark.addItem(harvest)
        }else {
            bookmark.removeItem(harvest._id)
        }
    }
    if(selected){
        return <StarIcon onClick={toggleSelections}/>
    }
    else {
        return <StarBorderIcon onClick={toggleSelections}/>
    }
}