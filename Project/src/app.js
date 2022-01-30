const express = require('express') // require our express module
const app = express()
const path = require('path') // require built-in path module
const hbs = require("hbs") // require our handle bars module

/*
Handlebars:
Handlebars is a simple templating language.
It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular text with embedded Handlebars expressions.
A handlebars expression is a {{, some contents, followed by a }}. When the template is executed, these expressions are replaced with values from an input object.

Nhi smjh ai? koi bat ni... Ma smjhata hn
Asan alfaz ma handle bars code ko reuse krne or payara sa file structure banane k liye use hua ha.
*/


require("./db/connect") // imporitng connect.js file
const User = require("./models/user") // imporitng User as our collection in our database to read/write data to

const PORT = process.env.PORT || 3000 // use port 3000 or whatever is in the environment variable PORT

const static_path = path.join(__dirname, "../public") // path to all static files
const templates_path = path.join(__dirname, "../templates/views") // path to views folder
const partials_path = path.join(__dirname, "../templates/partials") // path to partials folder

app.use(express.json()) // built-in middleware function in Express. It parses incoming requests with JSON payloads
app.use(express.urlencoded({extended:false})) // express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays

app.use(express.static(static_path))
app.set("view engine", "hbs") // tells our app that our default view engine is handle bars
app.set("views", templates_path) // specifies our path to the views folder if it's other than default e.g. (__dirname, "views")
hbs.registerPartials(partials_path) // telling handle bars path to the partials folder

/*
Partials:
Partials are normal Handlebars templates that may be called directly by other templates.
partials is folder where all th reusable code is placed.
In other words if some part of the code is same everywhere,
we can store that code in partials folder and call ir using syntax: {{> fileName }}
*/

app.get("/login", (req, res) => { // our login route
    res.render('login')
})

app.get("/admin", (req, res) => { // our admin route
    res.render('addUser')
})

app.get("/admin/modify_DB", (req, res) => { // our admin route
    res.render('addUser')
})

//add user in our database(only admin)

app.post("/admin/modify_DB", async (req, res) => {
    try {
        
        const addUser = new User({
            userName : req.body.userName,
            password : req.body.password
        })

        const userAdded = await addUser.save(function(err,result){ // waits for username and password and then save it to the database
            if (err){
                console.log(err);
            }
            else{
                console.log(result)
            }
        })
        
        res.status(201).render('addUser')
    } catch (err) {
        res.status(400).send(err)
    }

})

app.post("/admin", async (req, res) => {
    try {
        const userName = req.body.userName
        const password = req.body.password

        const name = await User.findOne({userName: userName})

        if(name.password === password) {
            res.status(201).render('dashboard')
        } else {
            res.send('Incorrect User Name or Password!')
        }

    } catch (err) {
        res.status(400).send(err)
    }
})

// retrieve data from database (allowing users to login)

app.post("/login", async (req, res) => {
    try {
        const userName = req.body.userName
        const password = req.body.password

        const name = await User.findOne({userName}) // same as ({userName: userName}) (if both key: value are same we write only key)

        if(name.password === password) {
            res.status(201).render('dashboard')
        } else {
            res.send('Incorrect User Name or Password!')
        }

    } catch (err) {
        res.status(400).send(err)
    }
})


// listening port
app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`)
})
