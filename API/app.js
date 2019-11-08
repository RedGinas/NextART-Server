const express = require('express');
const bodyParser = require('body-parser');
var app = (function () {
    var app;
    function create() {
      var expressapp = express();
      expressapp.use(bodyParser.urlencoded({ extended: true }));
      expressapp.use(bodyParser.json());
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
