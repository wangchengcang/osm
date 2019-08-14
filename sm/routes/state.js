var express = require('express');
// var fs=require('fs');
var sql=require('./mysql.js');
// var multer=require('multer');
// var url=require('url');
// var querystring=require('querystring');
// var path=require('path');
var router = express.Router();

router.post('/luru',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var json=req.body;
    console.log(json)
    // sql.con({
   //      arr:[json.number],
   //      sql:'select * from leave where number=?',
   //      success(data){
   //          if(data.length){
			// 	res.send('no')
			// }else{
                sql.con({
                    arr:[json.class,json.name,json.number,json.start,json.end,json.reason],
                    sql:'insert into leave(class,name,number,start,end,reason) values(?,?,?,?,?,?)',
                    success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
                })
            // }
        // }
    })
// })

module.exports = router;