const app = require("express")()
const province = require("./router/province")
const city = require("./router/city")
const cost = require("./router/cost")
app.use("/rajaApi/api/v1/province",province)
app.use("/rajaApi/api/v1/city",city)
app.use("/rajaApi/api/v1/cost",cost)
app.listen(8080,()=>{
    console.log("server run on port 8080");
})