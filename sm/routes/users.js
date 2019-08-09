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
	console.log(json);
	sql.con({
		arr:[json.classroom,json.door],
		sql:'select * from teacher where class=? or door=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.classroom,json.door,json.lecturer,json.curriculum,json.people],
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
//搜索讲师
router.post('/sousuo',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
    var json=req.body;
	console.log(json);
	sql.con({
		arr:[json.lecturer],
		sql:'select * from teacher where lecturer like "%"?"%"',
		success(data){
			res.send(data);
		},
		error(err){
			res.send(err);
		}
	})
})
//修改讲师
router.get('/modify',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = req.query;
	console.log(json);
	sql.con({
		arr:[json.classroom,json.door,json.lecturer,json.curriculum,json.people,json.uid],
		sql:'update teacher set class=?,door=?,lecturer=?,curriculum=?,number=? where uid=?',
		success(data){
			res.send(data);
		},
		error(err){
			res.send(err);
		}
	})
})

//删除讲师
router.get('/dels',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json = req.query;
	console.log(json);
	sql.con({
		arr:[json.uid],
		sql:'delete from teacher where uid=?',
		success(data){
			res.send(data);
		},
		error(err){
			res.send(err);
		}
	})
})


//搜索学生个人资料
router.get('/s',function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	var json=req.query
	sql.con({
		arr:[json.val,json.name,json.gender,json.myage,json.place,json.dq],
		//json.mytelephone,json.parentelephone,
		sql:'select * from mydata where id like "%"?"%" or name like "%"?"%" or gender like "%"?"%" or myage like "%"?"%"or place like "%"?"%" or dq like "%"?"%"',
		// or mytelephone like "%"?"%" or parentelephone like "%"?"%" 
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
});	
//新学员入住寝室录入
router.get('/dorm',function(req,res){
	var json=req.query;
	console.log(json)
	sql.con({
		arr:[json.xh],
		sql:'select * from dormitory where xh=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.xh,json.name,json.xb,json.sushe,json.qinshi,json.dh,json.bzr],
					sql:'insert into dormitory(xh,name,xb,sushe,qinshi,dh,bzr) values(?,?,?,?,?,?,?)',
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
//读取寝室学员信息
router.get('/read_lu',function(req,res){
	sql.con({
		arr:[],
		sql:'select * from dormitory order by uid desc',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//记录学员缺寝信息
router.get('/queq',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.uid],
		sql:'select * from dormitory where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
<<<<<<< HEAD
//录入缺勤学员
router.get('/queqa',function(req,res){
	var json=req.query;
	console.log(json)
	sql.con({
		arr:[json.xh,json.name,json.xb,json.sushe,json.qinshi,json.dh,json.bzr,json.uid],
		sql:'insert into dormitory_copy(xh,name,xb,sushe,qinshi,dh,bzr,myuid) values(?,?,?,?,?,?,?,?)',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})
//读取学员缺勤
router.get('/duquee',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.uid],
		sql:'select * from dormitory_copy order by uid desc',
=======


// 课程录入
router.post('/l',function(req,res){
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
// 读取课程信息
router.get('/d',function(req,res){
	var json=req.query;
	sql.con({
		arr:[],
		sql:'select * from curriculum order by uid asc',
>>>>>>> a31b18d49ef773bbbd2755c93eb79bd7a657cf98
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
<<<<<<< HEAD
//移除学员缺勤记录
router.get('/yc',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.uid],
		sql:'delete from dormitory_copy where myuid=?',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})
//搜索寝室学员
router.get('/search',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.title],
		sql:'select * from dormitory where name like "%"?"%"',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//删除寝室学员
router.get('/AcademyDeletion',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.uid],
		sql:'delete from dormitory where uid=?',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
})
 //修改mysql表 
router.get('/updataa',function(req,res){
	var json=req.query;
	sql.con({
		arr:[json.xh,json.name,json.xb,json.sushe,json.qinshi,json.dh,json.bzr,json.uid],
		sql:'update dormitory set xh=?,name=?,xb=?,sushe=?,qinshi=?,dh=?,bzr=? where uid=?',
		success(data){
			res.send('修改成功')
		},
		error(err){
			res.send(err)
		}
	})
})
module.exports = router;
=======
module.exports = router;
>>>>>>> a31b18d49ef773bbbd2755c93eb79bd7a657cf98
