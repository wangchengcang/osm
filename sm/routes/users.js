var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var url=require('url');
var querystring=require('querystring');
var path=require('path');
var router = express.Router();
// 注册
router.post('/login',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body;
	sql.con({
		arr:[json.user],
		sql:'select * from login where user=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.name,json.user,json.pass,json.img],
					sql:'insert into usera(name,user,pass,img) values(?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		}
	})
})
//登录 
router.post('/logon',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body;
	sql.con({
		arr:[json.user,json.pass],
		sql:'select * from login where user=? and pass=?',
		success(data){
			if(data.length){
     		    data[0].pass='';
     		    res.send(data[0])
			}else{
				res.send('ok')
			}
		},
		error(err){
			res.send(err)
		}
		
	})
})



module.exports = router;
