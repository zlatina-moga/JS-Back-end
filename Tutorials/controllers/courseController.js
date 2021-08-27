const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('create')
})

router.post('/create', isUser(), async (req, res) => {
    try {
        const courseData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            duration: req.body.duration,
            author: req.user._id
        }
        
        await req.storage.createCourse(courseData)
        res.redirect('/')

    } catch (err) {
        console.log(err.message)

        let errors;

        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            courseData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration,
            }
        }
        res.render('create', ctx)
    }
})

router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id)

        course.isAuthor = req.user._id == course.author;
        course.student = req.user && course.usersEnrolled.find(u => u._id == req.user._id) && !course.isAuthor;
        course.firstTimer = req.user && !course.student && !course.isAuthor;

        res.render('details', {course})
    } catch (err) {
        console.log(err.message)
        res.redirect('/')
    }
})

router.get('/enroll/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id)

        if (course.author == req.user._id){
            throw new Error('You cannot enroll in your own course')
        }

        await req.storage.enrollCourse(req.params.id, req.user._id);
        res.redirect(`/course/details/${req.params.id}`)
    } catch(err){
        console.log(err.message)
        res.redirect(`/course/details/${req.params.id}`)
    }
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const courseData = await req.storage.getCourseById(req.params.id)
    res.render('edit', {courseData})
})

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id)

        if (course.author != req.user._id){
            throw new Error('Cannot edit course')
        }

        await req.storage.editCourse(req.params.id, req.body)
        res.redirect('/course/details/' + req.params.id)

    }  catch (err) {
        console.log(err.message)

        let errors;

        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            courseData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration,
            }
        }
        res.render('edit', ctx)
    }

})

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id)

        if (course.author != req.user._id){
            throw new Error('Cannot delete this course')
        }

        await req.storage.deleteCourse(req.params.id)
        res.redirect('/')

    }  catch (err) {
        console.log(err.message)
        res.redirect('/course/details/' + req.params.id)
    }
})

module.exports = router;