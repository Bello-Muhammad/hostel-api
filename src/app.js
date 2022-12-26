const path = require('path')
const express = require("express")
require('./db/mongoose')
const hbs = require('hbs')
const bodyparser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const async = require('hbs/lib/async')
const res = require('express/lib/response')
const hostelRouter = require('./routers/hostel')
const adminRouter = require('./routers/admin')

const app = express()


//defining paths
const assetsPath = path.join(__dirname,'./temp/assets')
const viewsPath = path.join(__dirname, './temp/views')
const partialPath = path.join(__dirname, './temp/partials')


//setting handler engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// app.use(express.json())
//setup static directory to serve
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static(assetsPath))
app.use(compression())

// setting up express session
app.use(
    session({
    secret: process.env.SESS_SECRET,
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: false,
})
);


app.use(adminRouter)
app.use(hostelRouter)


app.post('/logout', async (req, res) => {
    // console.log(req.body)
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/')
    })
})

app.get ('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'page not found'
    })
})



module.exports = app
