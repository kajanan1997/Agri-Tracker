import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables"
import auth from "../../auth/auth-helper";
import {list, remove} from "../api-demand";
import {Box, Tooltip} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit"
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function DemandTable() {
    const classes = useStyles()
    const [demands,setDemands] = useState([])
    const [backdrop,setBackdrop] = useState(false)
    useEffect(()=>{
       const jwt = auth.isAuthenticated()
        list({t:jwt.token}).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                setDemands(data)
            }
        })
    },[])
    const columns =["Vegetable","Amount","Year","Province","Edit"] ;
    const keys = ["vegetable_type","demand_amount","demand_year","province","_id"]

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
                let data = await remove(demands[obj.dataIndex]._id,{t:auth.isAuthenticated().token})
                if(data.error){
                    console.log(data.error)
                }else{
                    console.log(data)
                    deleted.push(demands[obj.dataIndex])
                }
                }
            setDemands(demands.filter((ob)=>(deleted.indexOf(ob)===-1)))
            setBackdrop(false)
            }
        }

    return(
        <>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <MUIDataTable
                title={"Demands"}
                data={demands.map((obj,i)=>{
                    return keys.map((key,j)=>{
                       if(key !== "_id"){
                           return obj[key]
                       }else{
                           return (<Link to={"/demand/edit/"+obj[key]}>
                             <EditIcon/>
                           </Link>)
                       }
                    })
                })}
                columns={columns}
                options={options}
            />
            {(auth.isAuthenticated() && auth.isAuthenticated().user.role === "Admin" &&
                <Box display={"flex"} flexDirection={"row-reverse"} mr={3} mt={3}>
                    <Tooltip title={"Add Demand"}>
                        <Fab color="primary" aria-label="add">
                            <Link to={"/demand/add"} style={{color: "white"}}>
                                <AddIcon />
                            </Link>
                        </Fab>
                    </Tooltip>
                </Box>
            )}
        </>
    )
}