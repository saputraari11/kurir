const router = require("express").Router()
const request = require("request");

const city=(req,res,next)=>{
  let headers = req.headers.key
  if(headers){
      let options = {
          method: 'GET',
          url: 'https://api.rajaongkir.com/starter/city',
          qs: {},
          headers: {key:headers}
        };
        request(options,(error, response, body) =>{
            if(error){
                console.log(error);
            }
            else{
              req.city=JSON.parse(body)
                next()
            }
        });
  }
  else{
      console.log("there's not headers");
  }
  
 
}

router.get("/",city,(req,res)=>{
    let data = req.city.rajaongkir.results
    
    res.json(data)    
})
router.get("/:province",city,(req,res)=>{
    let r=req.city.rajaongkir.results
  let data=[]
  r.map((e,i)=>{
      if(e.province===req.params.province){
        data.push(r[i])
      }
  })
  
  res.json(data)    
   
})
router.get("/:province/:city",city,(req,res)=>{
    let data= req.city.rajaongkir.results
    let index = data.findIndex(e=>e.city_name===req.params.city&&e.province===req.params.province)
    res.json(data[index])    
   
})
module.exports = router