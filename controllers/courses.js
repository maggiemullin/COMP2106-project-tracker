// require express and enable express routing
const express = require('express')
const router = express.Router()

// add course model for CRUD operations
const Course = require('../models/course')

//passport for auth
const passport = require('passport')

//auth check for access control to creat/edit/delete method
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) { //user is already authenticated
        return next() //do the next thing in the request ie continue with calling function
    }
    res.redirect('/login')//anonymous user try to access private method => go to log in
}

/* GET /courses/add */
router.get('/add', (req, res, next) => {
    res.render('courses/add', {
        title: 'Add a Course',
        user: req.user
    })
})

/* POST /courses/add */
router.post('/add', isLoggedIn, (req, res, next) => {
    Course.create({
        courseCode: req.body.courseCode
    }, (err, newProject) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

// make public
module.exports = router;