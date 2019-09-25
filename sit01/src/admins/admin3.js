
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
const express = require('express');
const router = express.Router();
router.get('/admin3/:w1?/:w2?', (req,res) =>{
    const result = {
        params: req.params,
        baseUrl :req.baseUrl,
        url : req.url,
    };
    res.json(result);
});

module.exports = router;
