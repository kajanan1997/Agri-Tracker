import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, LineChart, XAxis, YAxis} from "recharts";



export default function TestBarChart({data,province}) {
    return(
        <div className={"content"}>
            <div className={"content"}>
               <h1>{province}</h1>
            </div>
            <BarChart width={screen.width * 0.75} height={400} data={data}>
                <YAxis />
                <XAxis dataKey={"vegetable_type"}/>
                <Bar dataKey="supply" barSize={30} fill="#8884d8"
                />
                <Bar dataKey="demand" barSize={30} fill="#000000"
                />
                <CartesianGrid/>
                <Legend />
            </BarChart>
        </div>
    )
}