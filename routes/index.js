const { name } = require('ejs');
var express = require('express');
const { Error } = require('mongoose');
var multer = require('multer');
var path = require('path');
// var deepPopulate = require('mongoose-deep-populate');

const app = require('../app');
var empModel = require('../modules/employee');
var router = express.Router();
var employee = empModel.find({});

router.use(express.static(__dirname + "./public/"))


var Storage = multer.diskStorage({
  destination:"./public/upload/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+ "_" + Date.now()+ path.extname(file.originalname))
  }
});

var upload = multer({
  storage:Storage
}).single('file');



/* GET home page. */
router.get('/', function(req, res, next) {
empModel.find({},function(err,data){              //here for mongoose eroor i replaced exec to find 
    if(err) throw err;
    res.render('index', { title: 'Employee Record', record:data });
  })
 
});

router.post('/upload',upload,function(req, res, next) {
    
      res.render('upload-file', { title: 'upload File'});
    })
   

  

router.get('/upload', function(req, res, next) {
  empModel.find({},function(err,data){              //here for mongoose eroor i replaced exec to find 
      if(err) throw err;
      res.render('upload-file', { title: 'upload File'});
    })
   
  });
  

router.get('/delete/:id', function(req, res, next) {

  var id = req.params.id;
  var del = empModel.findByIdAndDelete(id);

  del.exec(function(err){              //here for mongoose eroor i replaced exec to find 
      if(err) throw err;
      res.redirect('/');
    })
   
  });

router.post('/', function(req, res, next) {


  var empDetails = new empModel({

    name:req.body.uname,
    email:req.body.email,
    eType:req.body.emptype,
    hourlyRate:req.body.hrlyrate,
    totalHour:req.body.ttlhr,
  
  });
  
empDetails.save(function(err,res1){

  empModel.find({},function(err,data){
    if(err) throw err;
    // console.log(req.body.emptype);
    res.render('index', { title: 'Employee Record', record:data });
  })
  
  });
});



router.post('/search/', function(req, res, next) {

var fltrName = req.body.fltrname;
var fltrEmail = req.body.fltremail;
var fltrtype = req.body.fltremptype;

if(fltrName != '' && fltrEmail != ''&& fltrtype !=''){

  var flterParameter = { $and: [{name:fltrName},
   {$and: [{email:fltrEmail},{eType:fltrtype}]}
  ]}
}

else if(fltrName != '' && fltrEmail == '' && fltrtype !=''){

  var flterParameter = { $and: [{name:fltrName},{eType:fltrtype}]
   }
}

else if(fltrName == '' && fltrEmail != '' && fltrtype !=''){


  var flterParameter = { $and: [{email:fltrEmail},{eType:fltrtype}]
   }

}
else{
  var flterParameter={}
   
}

var employeeFilter = empModel.find(flterParameter);

// console.log(flterParameter);

  
  employeeFilter.exec(function(err,data){
  //  console.log(data);
    if(err) throw err;
    res.render('index', { title: 'Employee Record', record:data });
  })
  
  });

  router.get('/edit/:id', function(req, res, next) {
    var id = req.params.id;
    var edit = empModel.findById(id);
  
  
    edit.exec(function(err,data){              //here for mongoose eroor i replaced exec to find 
        if(err) throw err;
        res.render('edit',{title:'Edit employee Record', record:data });
      });

    });


  router.post('/update/', function(req, res, next) {

    var update = empModel.findByIdAndUpdate(req.body.id,{
      name:req.body.uname,
      email:req.body.email,
      eType:req.body.emptype,
      hourlyRate:req.body.hrlyrate,
      totalHour:req.body.ttlhr, 
    
    });

    update.exec(function(err,data){              //here for mongoose eroor i replaced exec to find 
        if(err) throw err;
        employee.exec(function(err,data){
          // console.log(data)
           if(err) throw err;
           res.render('index', { title: 'Employee Record', record:data });
         })
         
         });
      });


  // {$and: [{ name: 'pratik' },{eType:'hourly'}]}

// app.listen(3000,()=> console.log("server runnning in port 3000"));
module.exports = router;
