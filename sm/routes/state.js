var express = require('express');
var sql=require('./mysql.js');
var router = express.Router();

// 录入请假人
router.get('/luru',function(req,res){
    var json=req.query;
    console.log(json) 
	sql.con({
		arr:[json.aclass,json.aname,json.anumber,json.astart,json.aend,json.areason],
		sql:'insert into leaves(classa,namea,numbera,starta,enta,resona) values(?,?,?,?,?,?)',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})


// 获取所有请假名单
router.get('/getL',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.query;
    console.log(json) 
	sql.con({
		arr:[],
		sql:'select * from leaves',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});



// 根据班级名获取请假名单
router.get('/read',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.query;
    console.log(json) 
	sql.con({
		arr:[json.class],
		sql:'select * from leaves where classa=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});
// 获取所有的班级
router.get('/class',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	sql.con({
		arr:[],
		sql:'select * from class',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});



// 确认返校 删除该学生请假信息
router.get('/yes',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.query;
    console.log(json) 
	sql.con({
		arr:[json.num],
		sql:'delete from leaves where numbera=?',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
});


// 判断该学生是否是休学
router.post('/revise',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var json=req.body;
	console.log(json);
	sql.con({
		arr:[json.ora,json.numbera],
		sql:'update leaves set ora=? where numbera=?',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})
module.exports = router;