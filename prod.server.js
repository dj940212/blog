var express = require('express')
var port = 8083
var app = express()
var router = express.Router()

router.get('/',function(req, res, next) {
    req.url = '/index.html'
    next()
})

app.use(router)
app.use(express.static('./'))
app.listen(port,function(){
    console.log('Listening at http://localhost:' + port + '\n')
})