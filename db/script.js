conn = new Mongo("mongodb+srv://Kajanan:kajanan1234@cluster0.bxsuc.mongodb.net/agriculture-app")
db = conn.getDB("harvestApp")
start = new Date("2022-01-30").getFullYear()
db.demands.aggregate([
    {
        $match:{
            "demand_year":start
        }
    },{
        $project:{
            _id:0,
            province:1,
            vegetable_type:1,
            demand_amount:1,
        }
    }
])
