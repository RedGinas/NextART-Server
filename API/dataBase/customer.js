const app = require('../app.js').get();
const control = require('../pg');

app.post('/customer/insert',async (req,res)=>{
  let result = await control.insert('customer',req.body, "ERROR: insertCustomer :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});