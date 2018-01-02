
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});


// // basicServer.js
//
// // node.js의 http모듈을 변수 http로 추출합니다.
// var http = require('http');
//
// // http모듈의 createServer 함수를 호출하여 서버를 생성합니다.
// // req: request. 웹 요청 매개변수, res: response. 웹 응답 매개변수
// http.createServer(function (req, res) {
//     // 200: 응답 성공, text/html: html문서
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     // end: 응답 본문을 작성합니다.
//     res.end('Travel note 2');
//     // listen: 매개변수로 포트와 호스트를 지정합니다.
// }).listen(3030, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:3030/');
//
// // jade를 포함한 템플릿 엔진 안쓰고 해보자
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// //var index = require('./public/index');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
//
//
// //app.use('/', index);
//
// app.use(express.static('public'));
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
