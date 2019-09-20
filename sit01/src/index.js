const express = require('express');
const app = express();
const url = require('url');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.urlencoded({extended: false}));



//靜態內容資料夾
app.use(express.static('public'));


app.set('view engine', 'ejs');
// app.set('views',__dirname + '/../views');

//routes 路由
app.get('/',(req,res)=>{
    res.render('home',{name:'winnie',a:123});
});
//app.get('/',(req,res)連結檔跟目錄

// app.get('/winnie',(req,res)=>{
//     res.send('hello winnie');
// });

app.get('/sales01',(req,res)=>{
    const data = require('./../data/sales01');
     //res.send(JSON.stringify(sales));
     res.render('sales01', {
        sales:  data
     });
});


app.get('/try-qs',(req,res)=>{
    const urlParts = url.parse(req.url,true);
    console.log(urlParts);

    res.render('try-qs',{
        query: urlParts.query
    });
})



app.get('/try-post-form',(req,res)=>{
    res.render('try-post-form');
})
app.post('/try-post-form',urlencodedParser,(req,res)=>{
    res.render('try-post-form',req.body);

    // res.send(JSON.stringify(req.body))
})

//自訂404頁面
app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 找不到頁面')
})


app.listen(3000, ()=>{
    console.log('server 3000')
})