const app = require('../app.js').get();
const control = require('../pg');

//Type Table
//Get All Types
app.get("/type",async (req,res) => {
  let response = await control.get("SELECT id,type FROM storage.type ORDER BY type ASC", "ERROR: getType :");
  res.status(200).send({
      data: response
    })
})

//Insert Into Type
app.post('/type/insert',async (req,res)=>{
  let result = await control.insert("type", req.body, "ERROR: insertType :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});

//Update Type
app.post('/type/update',async (req,res)=>{
  let result = await control.update("type", req.body, "ERROR: updateType :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});

//Producer Table
//Get All Producers
app.get('/producer',async (req,res)=>{
  let response = await control.get("SELECT id,producer FROM storage.producer ORDER BY id ASC", "ERROR: getProducer :");
  res.status(200).send({
      data: response
    })
});

//Insert Into Producer
app.post('/producer/insert',async (req,res)=>{
  let result = await control.insert("producer", req.body, "ERROR: insertProducer :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});

//Update Producer
app.post('/producer/update',async (req,res)=>{
  let result = await control.update("producer", req.body, "ERROR: updateProducer :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});
