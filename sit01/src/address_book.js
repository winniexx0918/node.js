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

//////////////////////////////////資料庫連線設定
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mytest'
});
db.connect();

const router = express.Router();


const perPage = 5 ; //每頁幾筆
router.get('/:page?/:keyword?', (req, res)=>{
    const output ={};
    output.params = req.params;
    output.perPage = perPage;
    let page = req.params.page || 1;
    let sql = "SELECT * FROM `address_book` LIMIT " + (page-1)*perPage + ", "+ perPage;
    db.query(sql, (error, results)=>{
        output.rows = results;
        res.json(output);
    });


});

module.exports = router;