var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var url=require('url');
var querystring=require('querystring');
var path=require('path');
var router = express.Router();
//本人图片
router.use(multer({
	dest:'./public/file'
}).any())
router.post('/img',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
 	var f=req.files[0];
 	console.log(f)
 	var name=f.filename;
	var newname=name+path.parse(f.originalname).ext;
	fs.renameSync('./public/file/'+name,'./public/file/'+newname)
	res.send('/file/'+newname)
})
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
					sql:'insert into login(name,user,pass) values(?,?,?)',
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
//录入学员人信息
router.post('/arr',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body;
	console.log(json)
	sql.con({
		arr:[json.id],
		sql:'select * from mydata where id=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.id,json.aname,json.xb,json.idsf,json.age,json.cs,json.mz,json.jg,json.mmao,json.myimg,json.mydh,json.jzname,json.jzdw,json.zjzw,json.jzdh,json.zhuzhi,json.yz],
					sql:'insert into mydata(id,name,gender,idcard,birth,nation,place,face,photo,mytelephone,parentname,parentwark,parentposition,parentelephone,address,code,myage) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
					success(data){
						res.send('ok')
					}
				})
			}
		}
	})
})
module.exports = router;
