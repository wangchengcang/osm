var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var url=require('url');
var querystring=require('querystring');
var path=require('path');
var router = express.Router();

module.exports = router;
