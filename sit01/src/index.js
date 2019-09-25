const express = require('express');
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest:'tmp_uploads/'});
const fs = require('fs');


const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


///////////////////////////// [ 靜態內容資料夾 ] 開發步驟一
app.use(express.static('public'));


app.set('view engine', 'ejs');
// app.set('views',__dirname + '/../views');

/////////////////////////////routes 路由
app.get('/',(req,res)=>{
    res.render('home',{name:'winnie',a:123});
});
//app.get('/',(req,res)連結檔跟目錄

// app.get('/winnie',(req,res)=>{
//     res.send('hello winnie');
// });

app.get('/b.html', (req, res)=>{
    res.send(`<h2>
        Hello world!
        </h2>`);
});

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

/////////////////////////////[ 使用postman測試 ]
// app.get('/try-post-form2', (req, res)=>{
//     res.send('get: try-post-form2');
// });
// app.post('/try-post-form2', (req, res)=>{
//     res.send("post: try-post-form2");

//     //res.send(JSON.stringify(req.body));
// });
// app.put('/try-post-form2', (req, res)=>{
//     res.send("PUT: try-post-form2");
// });
/////////////////////////////postman
app.get('/try-post-form2', (req, res)=>{
    res.send('get: try-post-form2');
});
app.post('/try-post-form2', (req, res)=>{
    res.json(req.body);
});
app.put('/try-post-form2', (req, res)=>{
    res.send("PUT: try-post-form2");
});


//////////////////////////////multer上傳檔案，從post送出
app.post('/try-upload', upload.single('avatar'),(req, res)=>{
    if(req.file && req.file.originalname){
        console.log(req.file);

        switch(req.file.mimetype){
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
                fs.createReadStream(req.file.path)
                .pipe(
                fs.createWriteStream('public/img/' + req.file.originalname)
                );
                res.send('ok');
                break;
                default:
                    return res.send('bad file type')
        }
    } else{
        res.send('no uploads');
    }
});

/////////////////////////////router處理

app.get('/my-params1/:action?/:id?', (req, res)=>{    //action?/:>>>>>可以自取名稱，用post送出表單
    res.json(req.params);
});
app.get('/my-params2/*?/*?', (req, res)=>{
    res.json(req.params);
});


/////////////////////////////regular expression設定路由

app.get(/^\/09\d{2}\-?\d{3}\-?\d{3}$/,(req ,res) =>{
    let str = req.url.slice(1);
    str = str.split('?')[0];   //split
    str = str.split('-').join('');
    res.send('手機:'+ str)
});

/////////////////////////////模組化(方法一)


const admin1 = require(__dirname + '/admins/admin1');
admin1(app); 

/////////////////////////////模組化(方法二)

app.use(require(__dirname +'/admins/admin2'));


/////////////////////////////模組化(方法三)

app.use('/123',require(__dirname +'/admins/admin3'));


/////////////////////////////模組化(方法三(1))

app.use('/admin3-1', require(__dirname + '/admins/admin3-1') );


/////////////////////////////自訂404頁面
app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 找不到頁面')
})


app.listen(3000, ()=>{
    console.log('server 3000')
})