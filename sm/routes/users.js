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
					arr:[json.id,json.aname,json.gender,json.idsf,json.cs,json.mz,json.jg,json.mmao,json.myimg,json.mydh,json.jzname,json.jzdw,json.jzzw,json.jzdh,json.zhuzhi,json.yz,json.age,json.xj,json.bj,json.dq,json.system],//nation民族face面貌
					sql:'insert into mydata(id,name,gender,idcard,birth,nation,place,face,photo,mytelephone,parentname,parentwark,parentposition,parentelephone,address,code,myage,xj,bj,dq,system) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
//读取新学员信息
router.get('/read',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	sql.con({
		arr:[],
		sql:'select * from mydata order by uid desc',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});
// 学生个人详细资料
router.get('/msg',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var thisUid=req.query
	console.log(thisUid);
	sql.con({
		arr:[thisUid.i],
		sql:'select * from mydata where uid = ?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});
// 讲师
router.post('/teacher',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body;
	console.log(json)
	sql.con({
		arr:[json.classroom,json.door],
		sql:'select * from teacher where class=? or door=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.classroom,json.door,json.lecturer,json.curriculum,json.people,],
					sql:'insert into teacher(class,door,lecturer,curriculum,number) values(?,?,?,?,?)',
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
//读取讲师
router.get('/r',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	sql.con({
		arr:[],
		sql:'select * from teacher order by uid desc',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});		
//搜索学生个人资料
router.get('/s',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json=req.query
	sql.con({
		arr:[json.val],
		sql:'select * from mydata where name like "%"?"%"',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});	
module.exports = router;
