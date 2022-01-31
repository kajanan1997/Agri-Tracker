import React, {useState} from "react";
import auth from "../auth/auth-helper";
import {create} from "./api-harvest";
import {Redirect} from "react-router";

export default function AddHarvestPage() {
    const [values,setValues] = useState({
        farmer_name:"",
        officer_name:auth.isAuthenticated().user.name,
        address:"",
        contact_no:"",
        vegetable_type:"",
        vegetable_grade:"",
        plant_date:"",
        harvest_date:"",
        amount:"",
        province:"",
        division:"",

    })
    const [error,setError] = useState("")
    const [success,setSuccess] = useState(false)
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const submitForm = async (event)=>{
        event.preventDefault()
        const harvest = values
        let response = await create(harvest,auth.isAuthenticated().token)
        if(response.error){
            setError(response.error)
        }else {
            setSuccess(true)
        }
    }
    if(success){
        return (<Redirect to={"/harvest"}/>)
    }
    return(
        <div className={"container"}>
            <div className={"content section"}>
                <h1>Add Harvest</h1>
            </div>
            <div className={"section mt-0 pt-0"}>
                <form onSubmit={submitForm}>
                    <div className="field">
                        <label className="label">Farmer Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Farmer Name" onChange={handleChange("farmer_name")}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Officer Name</label>
                        <div className="control">
                            <input disabled className="input" type="text" placeholder="Officer Name" value={auth.isAuthenticated().user.name}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Address" onChange={handleChange("address")}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Province</label>
                        <div className="control">
                            <div className="select">
                                <select onChange={handleChange("province")}>
                                    <option disabled selected value={""}> -- select an option -- </option>
                                    <option value={"Northern"}>Northern</option>
                                    <option value={"Western"}>Western</option>
                                    <option value={"Central"}>Central</option>
                                    <option value={"Uva"}>Uva</option>
                                    <option value={"Southern"}>Southern</option>
                                    <option value={"Eastern"}>Eastern</option>
                                    <option value={"Sabragamuwa"}>Sabragamuwa</option>
                                    <option value={"North Central"}>North Central</option>
                                    <option value={"North Western"}>North Western</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Division</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Division" onChange={handleChange("division")} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Telephone Number</label>
                        <div className="control">
                            <input className="input" type="tel" placeholder="Telephone Number" onChange={handleChange("contact_no")}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Vegetable Type</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Vegetable Type" onChange={handleChange("vegetable_type")}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Grade</label>
                        <div className="control">
                            <div className="select">
                                <select onChange={handleChange("vegetable_grade")}>
                                    <option disabled selected value={""}> -- select an option -- </option>
                                    <option value={"A"}>A</option>
                                    <option value={"B"}>B</option>
                                    <option value={"C"}>C</option>
                                    <option value={"D"}>D</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Amount(In Kgs)</label>
                        <div className="control">
                            <input className="input" type="Number" placeholder="In Kg" onChange={handleChange("amount")}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Plant Date</label>
                        <div className="control">
                            <input className="input" type="date" placeholder="Plant date" onChange={handleChange("plant_date")} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Harvest Date</label>
                        <div className="control">
                            <input className="input" type="date" placeholder="Harvest date" onChange={handleChange("harvest_date")}/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Cancel</button>
                        </div>
                    </div>
                </form>
                {error &&(<div className="notification is-danger">
                    <button className="delete" onClick={(event)=>{
                        setError("")
                    }}/>
                    {error}
                </div>)}
            </div>
        </div>
    )
}