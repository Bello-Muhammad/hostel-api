const mongoose = require('mongoose')
const session = require("express-session");
const express = require('express');
const MongoDBSession = require("connect-mongodb-session")(session);



// mongoose setup
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log("mongodb connected");
});

const Store = new MongoDBSession({
    uri: process.env.MONGODB_URL,
    collection: "mySession"
});


module.exports = Store