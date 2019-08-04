var express = require('express');
// var fs=require('fs');
var sql=require('./mysql.js');
// var multer=require('multer');
// var url=require('url');
// var querystring=require('querystring');
// var path=require('path');
var router = express.Router();

router.post('/grade',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var json=req.body;
    console.log(json)
    sql.con({
        arr:[json.class],
        sql:'select * from class where class=?',
        success(data){
            if(data.length){
				res.send('no')
			}else{
                sql.con({
                    arr:[json.class,json.stage,json.door,json.assets,json.number],
                    sql:'insert into class(class,stage,door,assets,number) values(?,?,?,?,?)',
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

//读取班级信息
router.get('/read',function(req,res){
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


//搜索
router.post('/search',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
    var json=req.body;
	console.log(json);
	sql.con({
		arr:[json.class,json.stage,json.door],
		// arr:[],
		sql:'select * from class where class like "%"?"%" or stage like "%"?"%" or door like "%"?"%"',
		success(data){
			res.send(data);
		},
		error(err){
			res.send(err);
		}
	})
})

module.exports = router;