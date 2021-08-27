const Course = require('../models/Course');
const User = require('../models/User')

async function getAllCourses(search){
    if (search){
        return await Course.find({title: {$regex: search, $options: 'i'}}).lean()
    }
    return await Course.find({}).lean()
}

async function getCourseById(id){
    return await Course.findById(id).populate('usersEnrolled').lean();
}

async function getTopCourses() {
    return await Course.find({}).sort({enrolled: -1}).limit(3).lean();
}

async function createCourse(courseData){
    const course = new Course(courseData);

    await course.save()
    return course;
}

async function editCourse(courseId, courseData){
    const course = await Course.findById(courseId);

    course.title = courseData.title;
    course.description = courseData.description;
    course.imageUrl = courseData.imageUrl;
    course.duration = courseData.duration;

    await course.save();
    return course;
}

async function deleteCourse(courseId){
    return await Course.findByIdAndDelete(courseId)
}

async function enrollCourse(courseId, userId){
    const course = await Course.findById(courseId)
    const user = await User.findById(userId)

    course.enrolled += 1;
    course.usersEnrolled.push(userId)
    user.courses.push(courseId)

    await user.save()
    return course.save()
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    enrollCourse,
    getTopCourses,
    editCourse,
    deleteCourse
}