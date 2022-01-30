const mongoose = require('mongoose') //require our mongose module (used for ease with mongoDB)


// connecting to the database

mongoose.connect("mongodb://localhost:27017/cmsDatabase", { // 27017 is the default port mongo db use (can be changed)
    useNewUrlParser: true, // using new useNewUrlParser because old ones are deprecated and it will give error
    useUnifiedTopology: true, // using new useNewUrlParser because old ones are deprecated and it will give error
}).then(() => {
    console.log(`Connection to Database is Succesfull`)
}).catch((err) => {
    console.log(err)
})