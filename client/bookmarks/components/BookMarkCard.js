import React from "react";

export default function BookMarkCard({number,item}) {
    const details = [
        "Farmer Name","Vegetable Type","Harvest Date","Amount","Address","Contact No"
    ]
    const attrib = [
        "farmer_name",
        "vegetable_type",
        "harvest_date",
        "amount",
        "address",
        "contact_no",
    ]
    return(
        <div className={"column is-4"}>
            <div className={"card large has-background-success"}>
               <div className={"card-header"}>
                   <p className={"card-header-title"}>
                       {number}
                   </p>
               </div>
                <div className={"card-content"}>
                    <div className={"content"}>
                        {attrib.map((att,i)=>{
                           return(
                               <div className={"level"}>
                                   <div className={"level-left"}>
                                       <div className={"level-item"}>
                                          <span className={"has-text-weight-bold"}>{details[i]}</span>
                                       </div>
                                   </div>
                                   <div className={"level-right"}>
                                       <div className={"level-item"}>
                                           {item[att]}
                                       </div>
                                   </div>
                               </div>
                           )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}