const router = require('express').Router();

router.get('/', async (req, res) => {
    const courses = await req.storage.getAllCourses(req.query.search);
    const topCourses = await req.storage.getTopCourses();

    res.render('home', {courses, topCourses})
})


module.exports = router;