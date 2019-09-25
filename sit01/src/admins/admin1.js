module.exports = app =>{
    app.get('/admin1/:p1?/:p2?', (req,res)=>{
        res.json(req.params);
    });
}