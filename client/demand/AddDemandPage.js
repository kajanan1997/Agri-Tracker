import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Box, InputLabel} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";

import {makeStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {create} from "./api-demand";
import auth from "../auth/auth-helper";
import LinearProgress from "@material-ui/core/LinearProgress";
import SnackBar from "@material-ui/core/Snackbar"
const useStyles = makeStyles(theme => ({
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width:300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        marginTop:theme.spacing(8),
        verticalAlign:"center"
    },
    selectEmpty:{
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300
    }
}))
export default function AddDemandPage () {
    const classes = useStyles()
    const [values,setValues] = useState({
        vegetable_type:'',
        demand_year:'',
        demand_amount:'',
        province:''
    })
    const [error,setError] = useState('')
    const [progress,setProgress] = useState(false)
    const [success,setSuccess] = useState(false)
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const handleClose = ()=>{
        setSuccess(false)
    }
    const clickSubmit = (event)=>{
        event.preventDefault()
        const jwt = auth.isAuthenticated()
        const demand = values
        setSuccess(false)
        setProgress(true)
        create(demand,{t:jwt.token}).then((data)=>{
            if(data.error){
                setError(data.error)
                setProgress(false)
            }else{
                setValues({
                    vegetable_type: '',
                    demand_year: '',
                    demand_amount: '',
                    province: ''
                })
                setError('')
                setSuccess(true)
                setProgress(false)
            }
        })
    }
    return(
        <Box mt={8}>
            <div className={"container content"}>
                <Container >
                    <Typography variant={"h2"}>Add Demand</Typography>
                    <Paper>
                        <Box display={"flex"} justifyContent={"center"}>
                            <form onSubmit={clickSubmit} className={"form"}>
                                <FormControl>
                                    <InputLabel>Vegetable Name</InputLabel>
                                    <Input id="VegetableName" className={classes.textField} value={values.vegetable_type} onChange={handleChange('vegetable_type')} margin="normal"/>
                                </FormControl><br/>
                                <FormControl>
                                    <InputLabel>Demand year</InputLabel>
                                    <Input id="email" type="Number"  className={classes.textField} value={values.demand_year} onChange={handleChange('demand_year')} margin="normal"/>
                                </FormControl><br/>
                                <FormControl>
                                    <InputLabel>Demand Amount</InputLabel>
                                    <Input id="Amount" type="Number"  className={classes.textField} value={values.demand_amount} onChange={handleChange('demand_amount')} margin="normal"/>
                                    <br/>
                                </FormControl>
                                <br/>
                                <FormControl>
                                    <InputLabel>Province</InputLabel>
                                    <Select value={values.province} onChange={handleChange("province")} displayEmpty className={classes.selectEmpty} >
                                        <MenuItem value={"Northern"}>Northern</MenuItem>
                                        <MenuItem value={"Western"}>Western</MenuItem>
                                        <MenuItem value={"Central"}>Central</MenuItem>
                                        <MenuItem value={"Uva"}>Uva</MenuItem>
                                        <MenuItem value={"Southern"}>Southern</MenuItem>
                                        <MenuItem value={"Eastern"}>Eastern</MenuItem>
                                        <MenuItem value={"Sabragamuwa"}>Sabragamuwa</MenuItem>
                                        <MenuItem value={"North Central"}>North Central</MenuItem>
                                        <MenuItem value={"North Western"}>North Western</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <FormControl>
                                    <Button color={"primary"} type={"submit"} variant={"outlined"} className={classes.submit}>
                                        Add Demand
                                    </Button>
                                </FormControl>
                                {
                                    progress && (<Box>
                                        <LinearProgress/>
                                    </Box>)
                                }
                                <SnackBar open={success} autoHideDuration={1000} message={"Success"} onClose={handleClose}/>

                                {
                                    error && (<Typography component="p" color="error">
                                        <Icon color="error" className={classes.error}>error</Icon>
                                        {error}</Typography>)
                                }
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </div>
        </Box>
    )
}