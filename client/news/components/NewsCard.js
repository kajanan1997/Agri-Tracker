import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import {Link, Redirect} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import {remove} from "../api-news";
import auth from "../../auth/auth-helper";
import {makeStyles} from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

const useStyles = makeStyles((theme)=>({
    large:{
        width:theme.spacing(11),
        height:theme.spacing(11),
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    }
}))
export default function NewsCard({title,created,content,id}) {
    const [redirect,setRedirect] = useState(false)
    const classes = useStyles()
    const deleteNews = (event)=>{
        remove({newsID:id},{t:auth.isAuthenticated().token}).then((data)=>{
            setRedirect(true)
        }).catch((err)=>{
            console.log(err)
        })
    }
    if(redirect){
        return (<Redirect to={"/news/"}/>)
    }
    return(
        <div className={"column is-4"}>
            <div className="card large has-background-info-light">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48 ml-0">
                                <Avatar className={classes.large}>
                                    A
                                </Avatar>
                            </figure>
                        </div>
                        <div className="media-content ml-2">
                            <p className="title is-4 no-padding">{title}</p>
                            <p>
                                <span className="title is-6">
                                    Admin
                                </span>
                            </p>
                            <p className="subtitle is-6">{created}</p>
                        </div>
                    </div>
                    <div className="content">
                        <div className={"is-size-6"}>
                            {content}
                        </div>
                        <div className={"is-flex  is-flex-direction-row-reverse"}>
                                <DeleteIcon className={"ml-5"} onClick={deleteNews} style={{
                                    cursor:"pointer"
                                }}/>
                            <Link to={"/news/edit/"+id}>
                                <EditIcon/>
                            </Link>
                        </div>
                        {/*<div className="background-icon"></div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}