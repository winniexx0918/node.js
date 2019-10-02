/*
讀取 (get)
    /address-book/:page?/:keyword?
    
    新增 (get, post)
    /address-book/add
    修改 (get, post)
    /address-book/edit/:id
    刪除 (get, post)
    /address-book/remove/:id
    
    */
   
   
   
const express = require('express');
// console.log('express.shin:', express.shin);
const router = express.Router();
const bluebird = require('bluebird');
const mysql = require('mysql');    //資料庫連線設定
const db = mysql.createConnection({   //資料庫連線設定
    host:'35.201.219.20',
    user:'skier',
    password:'XmpP8u42',
    database:'SKI'
});
db.connect();
bluebird.promisifyAll(db);



const perPage = 10 ; //每頁幾筆
router.get('/:page?/:keyword?', (req, res)=>{
    const output ={};
    output.params = req.params;
    output.perPage = perPage;
    let page = parseInt(req.params.page) || 1;



//////////////////////////////////// keyword start ////////////////////////////////////
    let keyword = req.params.keyword || '';
    let where = " WHERE 1 ";
    if(keyword){
        keyword = keyword.split("'").join("\\'"); // 避免 SQL injection
        where += " AND (`ticket` LIKE '%" + keyword +  "%' or `sid` LIKE '%" + keyword +  "%' ) ";
        output.keyword = keyword;
    }
//////////////////////////////////// keyword end ////////////////////////////////////



    let t_sql = "SELECT COUNT(1) `total` FROM `MGNT_SKI_TICKETS` " + where;
    db.queryAsync(t_sql)
        .then(results=>{
            output.totalRows = results[0]['total'];
            output.totalPage = Math.ceil(output.totalRows/perPage);
            if(output.totalPage==0){
                return;
            } //避免第0頁繼續執行
            if(page<1) page = 3;
            if(page>output.totalPage) page = output.totalPage;
            output.page = page;
            // return db.queryAsync("SELECT * FROM `MGNT_SKI_TICKETS` LIMIT "  + (page-1)*perPage + ", "+ perPage);
            return db.queryAsync("SELECT * FROM `MGNT_SKI_TICKETS` " + where + " LIMIT ?, ? ", [(page-1)*perPage, perPage]);
        })
        .then(results=>{
            output.rows = results;
            res.json(output);
        })
        .catch(error=>{
            console.log(error);
        });
});


//////////////////////////////////算頁數與筆數

//     let sql = "SELECT * FROM `MGNT_SKI_TICKETS` LIMIT "+(page-1)*perPage+","+perPage;
//     db.query(sql, (error, results)=>{
//         output.rows = results;
//         res.json(output);
//     });
// });

module.exports = router;