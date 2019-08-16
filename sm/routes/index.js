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
//修改违纪学员信息

router.get('/updatea',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.bj,json.xh,json.name,json.date,json.getday,json.Reason,json.f,json.kf,json.uid],
		// sql:'update integral set bj=?,xh=?,name=?,date=?,getday=?,Reason=?,f=?,kf=? where uid=?',
		sql:'insert into integral(bj,xh,name,date,getday,Reason,f,kf) values(?,?,?,?,?,?,?,?)',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})
//判断是否是管理员
router.get('/state',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.uid],
		sql:'select * from login where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
// 请求后台有班级阶段
router.get('/Read_class',function(req,res){
	sql.con({
		sql:'select * from mydata',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//学号失去焦点的时候发送请求判断当前班级是否存在改学员学号
router.get('/stu_number',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.stunum,json.stu],
		sql:'select * from mydata where id=? and class=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//提交学员成绩
router.get('/Entry',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.stu_number],
		sql:'select * from achievement where xh=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.class_ban,json.stu_number,json.stu_name,json.written,json.machine,json.Interview,json.zhouone,json.zhoutwo,json.thouthree,json.gender],
					sql:'insert into achievement(class,xh,name,written,machine,Interview,zhouone,zhoutwo,zhouthree,adopt) values(?,?,?,?,?,?,?,?,?,?)',
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
module.exports = router;
