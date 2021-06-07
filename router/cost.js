const e = require("express")
const router = e.Router()
const request = require("request");
router.use(e.urlencoded({extended:true}))
const cost=(req,res,next)=>{
  let headers = req.headers.key
  if(headers){
    request({ method: 'GET',
    url: 'https://api.rajaongkir.com/starter/city',
    headers: {key: req.headers.key}},(e,r,body)=>{
        let b=JSON.parse(body).rajaongkir.results
        let o = b[b.findIndex(element=>element.city_name===req.body.kota_asal)].city_id
        let des = b[b.findIndex(element=>element.city_name===req.body.kota_tujuan)].city_id
        let options = {
            method: 'POST',
            url: 'https://api.rajaongkir.com/starter/cost',
            headers: {key:headers},
            form:{origin:o, destination: des, weight: req.body.weight, courier: req.body.courier}
          };
          request(options,(error, response, isi) =>{
              if(error){
                  console.log(error);
              }
              else{
                req.cost=JSON.parse(isi)
                next()
              }
          });
          
    })
   
      
  }
  else{
      console.log("there's not headers");
  }
  
 
}

router.post("/",cost,(req,res)=>{
    let rj = {o:req.cost.rajaongkir.origin_details,d:req.cost.rajaongkir.destination_details,r:req.cost.rajaongkir.results[0],w:req.cost.rajaongkir.query.weight}
    let data = {"kota asal":`${rj.o.city_name},${rj.o.province}`,"kota tujuan":`${rj.d.province},${rj.d.city_name}`,"bobot_barang":`${rj.w} gram`,"pengantaran kurir":[]}
    rj.r.costs.map((i)=>{
        data["pengantaran kurir"].push({"spesialis kurir":`${i.description}(${i.service})`,"ongkir":`${i.cost[0].value}.Rp`,"jangka waktu":`${i.cost[0].etd} hari`})
    })
    
    res.json(data)    
})

module.exports = router