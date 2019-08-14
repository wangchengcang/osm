var express = require('express');
var sql=require('./mysql.js');
var router = express.Router();

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
    // sql.con({
   //      arr:[json.number],
   //      sql:'select * from leave where number=?',
   //      success(data){
   //          if(data.length){
			// 	res.send('no')
			// }else{
               
            // }
        // }
    
// })

module.exports = router;