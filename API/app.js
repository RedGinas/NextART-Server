const express = require('express');
const bodyParser = require('body-parser');
var path = require("path");
var app = (function () {
    var app;
    function create() {
      var expressapp = express();
      expressapp.use(bodyParser.urlencoded({limit: '16mb', extended: true }));
      expressapp.use(bodyParser.json({limit: '16mb'}));
      expressapp.use(express.static(path.join(__dirname ,'/../src')));
      
      return expressapp;
    }

    return {
        get: function () {
            if (!app) {
                app = create();
            }
            return app;
        }
    };
})();
module.exports = app;
