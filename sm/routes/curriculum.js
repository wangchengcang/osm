var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var url=require('url');
var querystring=require('querystring');
var path=require('path');
var router = express.Router();

// 课程存放到数据库
router.post('/kcluru',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var json=req.body;
    console.log(json)
    sql.con({
        arr:[json.stage],
        sql:'select * from curriculum where stage=?',
        success(data){
            if(data.length){
				res.send('no')
			}else{
                sql.con({
                    arr:[json.stage,json.curriculumName,json.teacher,json.headmaster],
                    sql:'insert into curriculum(stage,curriculumName,teacher,headmaster) values(?,?,?,?)',
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