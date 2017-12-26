var express = require('express');
var router = express.Router();
var usr=require('dao/dbConnect');

/* GET home page. */
// router.get('/home', function(req, res) {
//   if(req.cookies.islogin){
//     req.session.islogin=req.cookies.islogin;
//   }
//   if(req.session.islogin){
//     res.locals.islogin=req.session.islogin;
//   }
//   res.render('home', {test:res.locals.islogin });
// });

/* HOME */
router.get('/home',function (req,res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('home',{user:res.locals.islogin});
});

/* LOGIN */
router.route('/login')
    .get(function (req,res) {
  if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
  }
  if(req.cookies.islogin){
    req.session.islogin=req.cookies.islogin;
  }
  res.render('login',{test:res.locals.islogin})
    })
    .post(function(req,res){

      client=usr.connect();
      result=null;
      usr.selectFun(client,req.body.username,function (result) {
        if(result[0]===undefined){
          res.send('没有该用户');
        }
        else{
          if(result[0].passwd===req.body.password) {
              req.session.islogin = req.body.username;
              res.locals.islogin = req.session.islogin;
              res.cookie('islogin', res.locals.islogin, {maxAge: 60000});
              res.redirect('/home');
          }else
            {
              res.redirect('/login');
              }

        }

      });
    });

/* LOGOUT */
router.get('/logout',function (req,res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

/*seats*/
router.get('/seats',function (req,res) {
   res.render('seats');
});

/*INTRODUCE*/
router.get('/introduce',function (req,res) {
   res.render('introduce');
});

/*DRAMA_ORDER*/
router.get('/drama_order',function(req,res){
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }

    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('drama_order',{user:res.locals.islogin});
});

/* Register */
router.route('/reg')
    .get(function (req,res) {
        res.render('reg');
    })
    .post(function (req,res) {
        // var name=req.body.username;
        // var password=req.body.password;
        // select('SELECT * FROM name WHERE name = "'+ name + '";')
        //     .then(function(data) {
        //         if (data.status == 99999) {
        //             res.send('用户名已存在');
        //         }
        //     });
        client=usr.connect();
        usr.insertFun(client,req.body.username,req.body.password,function (err) {
            if(err)throw err;
            // res.send('注册成功');
            // res.redirect('/login');
                console.log("注册成功！3秒后跳转...");
                setTimeout(function () {
                    res.redirect('/login')
                }, 3000);

        });
    });

module.exports = router;
