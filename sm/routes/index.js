var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var url=require('url');
var querystring=require('querystring');
var path=require('path');
var router = express.Router();
//
router.get('/testing',function(req,res){
	var json=req.query;
	console.log(json)
	sql.con({
		arr:[json.xh],
		sql:'select * from mydata where id=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//提交违规学员信息
router.get('/integral',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.xh],
		sql:'select * from integral where xh=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.bj,json.xh,json.name,json.date,json.getday,json.reason,json.f,json.kf],
					sql:'insert into integral(bj,xh,name,date,getday,Reason,f,kf) values(?,?,?,?,?,?,?,?)',
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
//读取违规学员信息
router.get('/read',function(req,res){
	var json=req.query;
	sql.con({
		arr:[],
		sql:'select * from integral order by uid desc',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
module.exports = router;
