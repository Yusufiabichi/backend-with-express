const express = require('express')
const router = express.Router();

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];

//Routes Parameters
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course not found');
    res.send(course);
});

router.get('/', (req, res) => {
    res.send(courses);
})

// Post Request
router.post('/', (req, res) =>{

    //Joi Validation
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if(!course){
    //     res.status(404).send('The course with the given ID was not found');
    //     return;
    // } 
    if(!course) return res.status(404).send('The course with the given ID was not found');
    
    // const result = Joi.validate(req.body, schema);
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message); 
        // Ayomide or Ifhiam
        // Ayomide or Ifhiam

    //Update course
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

router.delete('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


module.exports = router;