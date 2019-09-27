const express = require('express');
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest:'tmp_uploads/'});
const fs = require('fs');
const session = require('express-session');
const moment = require('moment-timezone');
const mysql = require('mysql');
const bluebird = require('bluebird');
const cors =require('cors');
const db = mysql.createConnection({   //資料庫連線設定
    host:'35.201.219.20',
    user:'skier',
    password:'XmpP8u42',
    database:'SKI'
    // host:'localhost',
    // user:'winnie',
    // password:'admin',
    // database:'test',
});
db.connect();   //資料庫連線


bluebird.promisifyAll(db);



const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


///////////////////////////// [ 靜態內容資料夾 ] 開發步驟一
app.use(express.static('public'));


/////////////////////////////cors，允許所有server都可以拿到資料
app.use(cors());



///////////////////////////// session
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:'fsdgfdsfdsf',
    cookie:{
        maxAge:1200000,
    }
}))



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


/////////////////////////////顯示刷新頁面次數express-session
app.get('/try-session', (req, res)=>{
    req.session.my_views = req.session.my_views || 0;
    req.session.my_views++;

    res.json({
        aa: 'hello',
        'my views': req.session.my_views
    });
});

/////////////////////////////moment-timezone時間設定

app.get('/try-moment',(req, res)=>{
    const myFormat = 'YYYY-MM-DD HH:mm:ss';
    const exp = req.session.cookie.expires;
    const mo1 = moment(exp);
    const mo2 = moment(new Date());
    res.contentType('text/plain');
    res.write(mo1.toString() + "\n");
    res.write(new Date() + "\n");
    res.write(mo1.format(myFormat)+"\n");
    res.write(mo2.format(myFormat)+"\n");
    res.write(mo1.constructor.name + "\n");
    res.write('倫敦'+ mo1.tz('Europe/London').format(myFormat) + "\n");
    res.write('日本'+mo2.tz('Asia/Tokyo').format(myFormat) + "\n");
    res.end('');
});

/////////////////////////////資料庫連線
app.get('/test_ski_try_db',(req,res)=>{
    const sql = "SELECT * FROM `MGNT_VENDOR`  WHERE `name` LIKE ?";
    db.query(sql, ["%小明%"] ,(error, results, fields)=>{
        console.log(error);
        console.log(results);
        console.log(fields);
        // res.json(results);

        for(let r of results){
            r.create_time2 = moment(r.create_time).format('YYYY-MM-DD');
        }
        res.render('test_ski_try_db',{
            rows: results
        });
    });
})


/////////////////////////////資料庫連線，換頁
app.get('/test_ski_try_db2/:page?',(req,res)=>{
    let page = req.params.page || 1;
    let perPage = 5;
    const output = {};

    db.queryAsync("SELECT COUNT(1) total FROM `MGNT_SKI_TICKETS`")
    .then(results=>{
        // res.json(results);
        output.total = results[0].total;
        return db.queryAsync(`SELECT * FROM MGNT_SKI_TICKETS LIMIT ${(page-1)*perPage},${perPage}`);
    })
    .then(results=>{
        output.rows = results;
        res.json(output);
    })
    .catch(error=>{
        console.log(error);
        res.send(error);
    });
});

/////////////////////////////9/27資料庫連線，cookies和session使用whitelist(白名單)，準備後端服務。
app.get('/test_session2',(req,res)=>{
    req.session.views = req.session.views || 0;
    req.session.views ++;
    res.json({
        views:req.session.views
    })
});

/////////////////////////////自訂404頁面
app.use((req,res)=>{
    res.type('text/plain');
    res.status(404);
    res.send('404 找不到頁面')
})


app.listen(3000, ()=>{
    console.log('server 3000')
})