import React from "react";
import HarvestTable from "./components/HarvestTable";

export default function ViewHarvestPage() {
    return(
        <div className={"container"} >
            <div className={"section content"}>
                <h1>View Harvest</h1>
            </div>
            <HarvestTable/>

        </div>
    )
}