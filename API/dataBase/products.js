const app = require('../app.js').get();
const control = require('../pg');

//Get All products
app.get("/product",async (req,res)=>{
    let response = await control.get(`SELECT products.id,title,name,producer,type,amount,second_amount,price_in,price_out from storage.products LEFT JOIN storage.type on ex_type = type.id LEFT JOIN storage.producer on ex_producer = producer.id ORDER BY spec_id ASC`)
    res.status(200).send({
        data: response
      })
})

app.get("/product/:id",async (req,res)=>{
    let response = await control.findOne('products',req.params.id,'Error: Get One product');
    res.status(200).send({
        data: response
      })
})

app.post("/product/insert", async (req,res)=>{
    let result = await control.insert('products',req.body,"Error: Product Insert");
    res.status(200).send({
        text: result.result,
        response: result.response
    });
})

app.post('/product/update', async (req,res)=>{
    let result = await control.update('products',req.body,'Error: Product update');
    res.status(200).send({
        text: result.result,
        response: result.response
    })
})