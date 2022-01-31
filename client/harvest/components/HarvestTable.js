import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables"
import auth from "../../auth/auth-helper";
import {list, remove} from "../api-harvest";
import {Box, Tooltip} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit"
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BookmarkStar from "./BookmarkStar";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function HarvestTable() {
    const classes = useStyles()
    const [harvests,setHarvests] = useState([])
    const [backdrop,setBackdrop] = useState(false)
    useEffect(()=>{
        const jwt = auth.isAuthenticated()
        list({t:jwt.token}).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                const newData = data.map((obj,i)=>{
                    return{
                        ...obj,
                        plant_date:obj.plant_date.substring(0,10),
                        harvest_date:obj.harvest_date.substring(0,10),
                    }
                })
                setHarvests(newData)
            }
        })
    },[])
    const columns =["Farmer Name","Officer Name","Address","Contact No","Vegetable Type","Vegetable Grade","Plant Date","Harvest Date","Amount","Province","Edit","Select"] ;
    const keys = ["farmer_name","officer_name","address","contact_no","vegetable_type","vegetable_grade","plant_date","harvest_date","amount","province","_id","bookmark"]

    const handleClose = ()=>{
        setBackdrop(false)
    }

    const options = {
        filterType: 'checkbox',
        onRowsDelete:async (rowsDeleted,data)=>{
            setBackdrop(true)
            let deleted = []
            for(const obj of rowsDeleted.data){
                console.log(obj)
                let data = await remove(harvests[obj.dataIndex]._id,{t:auth.isAuthenticated().token})
                if(data.error){
                    console.log(data.error)
                }else{
                    console.log(data)
                    deleted.push(harvests[obj.dataIndex])
                }
            }
            setHarvests(harvests.filter((ob)=>(deleted.indexOf(ob)===-1)))
            setBackdrop(false)
        }
    }

    return(
        <>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <MUIDataTable
                title={"Harvests"}
                data={harvests.map((obj,i)=>{
                    return keys.map((key,j)=>{
                        if(key !== "_id" && key !=="bookmark"){
                            return obj[key]
                        }else if(key === "_id"){
                            return (<Link to={"/harvest/edit/"+obj[key]}>
                                <EditIcon/>
                            </Link>)
                        }else{
                            return (
                                <BookmarkStar harvest={obj}/>
                            )
                        }
                    })
                })}
                columns={columns}
                options={options}
            />
            {(auth.isAuthenticated() && (auth.isAuthenticated().user.role === "officer" || auth.isAuthenticated().user.role ==="Admin")&&
                <Box display={"flex"} flexDirection={"row-reverse"} mr={3} mt={3}>
                    <Tooltip title={"Add Harvest"}>
                        <Fab color="primary" aria-label="add">
                            <Link to={"/harvest/add"} style={{color: "white"}}>
                                <AddIcon />
                            </Link>
                        </Fab>
                    </Tooltip>
                </Box>
            )}
        </>
    )
}