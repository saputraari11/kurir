const router = require("express").Router()
const request = require("request");

const province=(req,res,next)=>{
  let headers = req.headers.key
  if(headers){
      let options = {
          method: 'GET',
          url: 'https://api.rajaongkir.com/starter/province',
          qs: {},
          headers: {key:headers}
        };
        request(options,(error, response, body) =>{
            if(error){
                console.log(error);
            }
            else{
              req.province=JSON.parse(body)
                next()
            }
        });
  }
  else{
      console.log("there's not headers");
  }
  
 
}

router.get("/",province,(req,res)=>{
    let data = req.province.rajaongkir.results
    
    res.json(data)    
})
router.get("/:province",province,(req,res)=>{
  let data= req.province.rajaongkir.results
  let index = data.findIndex(e=>e.province===req.params.province)
  res.json(data[index])    
   
})
module.exports = router