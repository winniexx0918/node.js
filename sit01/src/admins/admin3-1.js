
///////////////////////// 方法一
// module.exports = app =>{
//     app.get('/admin1/:p1?/:p2?', (req,res)=>{
//         res.json(req.params);
//     });
// }
//參數 (Parameter)方法的宣告。




///////////////////////// 方法二
// const express = require('express');
// const router = express.Router();
// router.get('/admin2/:a1?/:a2?', (req,res) =>{
//     res.json(req.params);
// });

// module.exports = router;


///////////////////////// 方法三
// const express = require('express');
// const router = express.Router();
// router.get('/admin3/:w1?/:w2?', (req,res) =>{
//     const result = {
//         params: req.params,
//         baseUrl :req.baseUrl,
//         url : req.url,
//     };
//     res.json(result);
// });

// module.exports = router;


///////////////////////// 方法三(1)
const express = require('express');
const router = express.Router();

router.route('/member/edit/:id')
    .all((req, res, next)=>{
        res.locals.memberData = {
            name: 'bill',
            id: req.params.id
        };
        next();
    })
    .get((req, res)=>{
        res.send('GET: ' + JSON.stringify(res.locals));
    })
    .post((req, res)=>{
        res.send('POST: ' + JSON.stringify(res.locals));
    })
;

module.exports = router;


