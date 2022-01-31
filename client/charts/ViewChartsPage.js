import React, {useEffect, useState} from "react";
import TestChart from "./components/TestChart";
import TestBarChart from "./components/TestBarChart";
import {getChartData} from "./api-charts";
import auth from "../auth/auth-helper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


const provinces = ["Northern","Western","Eastern","North Central","Central","North Western","Southern","Uva","Sabragamuwa"]
export default function ViewChartsPage() {
    const [data,setData] = useState({})
    const [backdrop,setBackDrop] = useState(false)
    useEffect(()=>{
        setBackDrop(true)
       getChartData(auth.isAuthenticated().token).then((display_data)=>{
            setData(display_data)
            setBackDrop(false)
       }).catch((err)=>{
           console.log(err)
       })
    },[])

    return(
       <>
           <Backdrop open={backdrop}>
               <CircularProgress color="inherit" />
           </Backdrop>
           <div className={"container"}>
               <div className={"section content"}>
                   <h1 className={"is-size-1"}>Charts</h1>
               </div>
               <div className={"section"}>
                   {Object.keys(data).map((k,i)=>{
                       return(
                           <TestBarChart data={data[k]} key={i} province={k}/>
                       )
                   })}
               </div>
           </div>
       </>
    )
}