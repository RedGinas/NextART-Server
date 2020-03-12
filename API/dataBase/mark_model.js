const app = require('../app.js').get();
const control = require('../pg');
const path = require('path');
//Mark Table
//Get All Marks
app.get('/mark',async (req,res)=>{
  let response = await control.get("SELECT id,mark,image FROM storage.mark ORDER BY mark ASC", "ERROR: getMark :");
  res.status(200).send({
      data: response
    })
});

//Insert Into Mark
app.post('/mark/insert',async (req,res)=>{
  if(req.body.image){
    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    var image_path = `/src/image/${req.body.mark}.png`;
    req.body.image = image_path;
    require("fs").writeFile(path.join(__dirname,'/../..',image_path), base64Data, 'base64', function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({
          text: err
        }).end();
      }
    });
  }else {
    res.status(500).send({
      text: "image not sended"
    }).end();
  }
  let result = await control.insert('mark',req.body, "ERROR: insertMark :");
  res.status(200).send({
      text: result.result,
      response: result.response
    }).end();
});

//Update Mark
app.post('/mark/update',async (req,res)=>{
  if(req.body.image){
    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    var image_path = `/src/image/${req.body.mark}.png`;
    req.body.image = image_path;
    require("fs").writeFile(path.join(__dirname,'/../..',image_path), base64Data, 'base64', function(err) {
      if (err) {
        console.log(err);
        res.status(500).send({
          text: err
        }).end();
      }
    });
  }
 
  let result = await control.update("mark", req.body, "ERROR: updateMark :");
  res.status(200).send({
      text: result.result,
      response: result.response
    }).end();
});

//Model Table
//Get All Models by mark
app.get('/model/:ex_mark',async (req,res)=>{
  let response = await control.getWithParams("SELECT id,model FROM storage.model WHERE ex_mark = ${ex_mark} ORDER BY model ASC",{"ex_mark":req.params.ex_mark}, "ERROR: getModel :");
  res.status(200).send({
      data: response
    })
});

//Insert Into Model
app.post('/model/insert',async (req,res)=>{
  let result = await control.insert("model", req.body, "ERROR: insertModel :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});

//Update Model
app.post('/model/update',async (req,res)=>{
  let result = await control.update("model", req.body, "ERROR: updateModel :");
  res.status(200).send({
      text: result.result,
      response: result.response
    })
});
