const getChartData = async (token)=>{
    try {
        let response = await fetch('/api/harvest/chart_data', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const harvest_data = await response.json()
        let harvest_data_organized = {
            "Northern":{},
            "Central":{},
            "Western":{},
            "Uva":{},
            "Southern":{},
            "Eastern":{},
            "Sabragamuwa":{},
            "North Central":{},
            "North Western":{}
        }
        harvest_data.map((obj,i)=>{
            harvest_data_organized[obj._id.province][obj._id.vegetable_type] =  {
                supply:obj.total,
                demand:0,
            }
        })
        let response2 = await fetch('/api/demand/chart_data', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const demand_data = await response2.json()
        demand_data.map((obj,i)=>{
            try{
                harvest_data_organized[obj.province][obj.vegetable_type]["demand"] = obj.demand_amount
            }catch (e) {
                harvest_data_organized[obj.province][obj.vegetable_type] = {
                    demand:obj.demand_amount,
                    supply:0
                }
            }
        })
        let display_data = {
            "Northern":[],
            "Central":[],
            "Western":[],
            "Uva":[],
            "Southern":[],
            "Eastern":[],
            "Sabragamuwa":[],
            "North Central":[],
            "North Western":[]
        }
        console.log(harvest_data_organized)
        Object.keys(harvest_data_organized).map((province,i)=>{
            Object.keys(harvest_data_organized[province]).map((veg_type,j)=>{
                display_data[province].push({
                    vegetable_type:veg_type,
                    supply:harvest_data_organized[province][veg_type]["supply"],
                    demand:harvest_data_organized[province][veg_type]["demand"]
                })
            })
        })
        console.log(display_data)
        return display_data
    } catch(err) {
        console.log(err)
    }
}
export {getChartData}