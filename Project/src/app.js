const express = require('express') // require our express module
const app = express()
const path = require('path') // require built-in path module
const cookieParser = require("cookie-parser")
const sessions = require('express-session')
const jade = require("jade") // require our handle bars module


require("./db/connect") // imporitng connect.js file
const student = require("./models/student") // imporitng student as our collection in our database to read/write data to
const admin = require("./models/admin") // imporitng admin as our collection in our database to read/write data to
const faculty = require("./models/faculty") // imporitng faculty as our collection in our database to read/write data to

const PORT = process.env.PORT || 3000 // use port 3000 or whatever is in the environment variable PORT

const static_path = path.join(__dirname, "../public") // path to all static files
const templates_path = path.join(__dirname, "../templates/views") // path to views folder
const partials_path = path.join(__dirname, "../templates/partials") // path to partials folder

app.use(express.json()) // built-in middleware function in Express. It parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })) // express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const oneDay = 1000 * 60 * 60 * 24;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static(static_path))
app.set("view engine", "jade") // tells our app that our default view engine is handle bars
app.set("views", templates_path) // specifies our path to the views folder if it's other than default e.g. (__dirname, "views")
// jade.registerPartials(partials_path) // telling handle bars path to the partials folder

/*
Partials:
partials is folder where all th reusable code is placed.
In other words if some part of the code is same everywhere,
we can store that code in partials folder and call ir using syntax: {{> fileName }}
*/

var session

app.get("/student_login", (req, res) => { // our login route
    session = req.session
    if (session.userid) {
        res.render('student_dashboard')
    } else {
        res.render('student_login')
    }
})

app.get("/faculty_login", (req, res) => { // our login route
    session = req.session
    if (session.userid) {
        res.render('faculty_dashboard')
    } else {
        res.render('faculty_login')
    }
})

app.get("/admin_login", (req, res) => { // our admin route
    session = req.session
    if (session.userid) {
        res.render('addUser')
    } else {
        res.render('admin_login')
    }
})

// test
app.get('/admin_dashboard', (req, res) => {
    res.render('admin_dashboard');
});

app.get('/student_attendence', (req, res) => {
    res.render('student_attendence');
});

app.get('/logout', (req, res) => {
    session = req.session
    session.destroy();
    res.send('Logged out');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// creates admin 1 time

const findAdmin = admin.findOne({ adminName: 'admin' })
console.log(findAdmin.adminName)

// console.log(asd.studentName)
// console.log(asd.studentName)
// if(asdf.adminName != "admin") {
//     const addAdmin = new admin({
//         adminName : "admin",
//         adminPassword : "admin"
//     })

//     const adminAdded = addAdmin.save(function(err,result){ // waits for username and password and then save it to the database
//         if (err){
//             console.log(err)
//         }
//         else{
//             console.log(result)
//         }
//     })
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//add user in our database(only admin)

app.post("/admin/modify_db", async (req, res) => {
    try {
        const currentName = req.body.userName
        const findStudent = await student.findOne({ studentName: currentName })
        // console.log(findStudent.studentName)
        if (findStudent.studentName === currentName) {
            res.send("student already present")
        }
    } catch (err) {
        const addUser = new student({
            studentName: req.body.userName,
            studentPassword: req.body.password
        })
        const userAdded = await addUser.save(function (err, result) { // waits for username and password and then save it to the database
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })
        res.status(201).render('addUser')
    }
})


// admin login
app.post("/admin_login", async (req, res) => {
    try {

        const adminName = req.body.userName
        const adminPassword = req.body.password

        const name = await admin.findOne({ adminName })// same as ({admintName: admintName}) (if both key: value are same we write only key)

        if (name.adminPassword === adminPassword && name.adminName === adminName) {
            session = req.session;
            session.userid = adminName;
            console.log(req.session)
            res.status(201).render('addUser')
        } else {
            res.send('Invalid username or password')
        }
    } catch (err) {
        res.status(400).send('Invalid username or password')
    }
})

// student login
// retrieve data from database (allowing students to login)

app.post("/student_login", async (req, res) => {
    try {
        const studentName = req.body.studentName
        const password = req.body.studentPassword

        const name = await student.findOne({ studentName }) // same as ({studentName: studentName}) (if both key: value are same we write only key)

        if (name.studentPassword === password) {
            session = req.session;
            session.userid = studentName;
            console.log(req.session)
            res.status(201).render('student_dashboard')
        } else {
            res.send('Invalid username or password');
        }

    } catch (err) {
        res.status(400).send('Invalid username or password')
    }
})

// faculty login
// retrieve data from database (allowing facultys to login)

app.post("/faculty_login", async (req, res) => {
    try {
        const facultyName = req.body.facultyName
        const password = req.body.password

        const name = await faculty.findOne({ facultyName }) // same as ({facultyName: facultyName}) (if both key: value are same we write only key)

        if (name.password === password) {
            session = req.session;
            session.facultyid = facultyName;
            console.log(req.session)
            res.status(201).render('faculty_dashboard')
        } else {
            res.send('Invalid facultyname or password');
        }

    } catch (err) {
        res.status(400).send('Invalid facultyname or password')
    }
})


// listening port
app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`)
})
