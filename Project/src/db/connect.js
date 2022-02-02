const mongoose = require('mongoose') //require our mongose module (used for ease with mongoDB)


// connecting to the database

mongoose.connect("mongodb+srv://kaleem:kaleem123@cluster0.iemi5.mongodb.net/cmsDatabase?retryWrites=true&w=majority", { // 27017 is the default port mongo db use (can be changed)
    useNewUrlParser: true, // using new useNewUrlParser because old ones are deprecated and it will give error
    useUnifiedTopology: true, // using new useNewUrlParser because old ones are deprecated and it will give error
}).then(() => {
    console.log(`Connection to Database is Succesfull`)
}).catch((err) => {
    console.log(err)
})