const mongoose = require('mongoose')


// mongoose setup
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log("mongodb connected");
});
