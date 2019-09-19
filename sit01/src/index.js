const express = require('express');
const app = express();


//靜態內容資料夾
app.use(express.static('public'));


app.set('view engine', 'ejs');
// app.set('views',__dirname + '/../views');

//routes 路由
app.get('/',(req,res)=>{
    res.render('home',{name:'winnie'});
});
app.get('/winnie',(req,res)=>{
    res.send('hello winnie');
});

//自訂404頁面
app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 找不到頁面')
})


app.listen(3000, ()=>{
    console.log('server 3000')
})