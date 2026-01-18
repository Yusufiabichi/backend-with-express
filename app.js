const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("Hello Express");
// });

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];
app.get('/', (req, res) => {
    res.send([1, 3, 3, 4, 5]);
});

//Routes Parameters
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course not found');
    res.send(course);
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/blogs/:id', (req, res) => {
    res.send(req.params.id)
})

//Route with two Parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

//Using Query Parameters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.get('/api/students/:id', (req, res) => {
    res.send(req.params.id);
})

// Post Request
app.post('/api/courses', (req, res) =>{

    //Joi Validation
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});



app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID was not found');
    
    // const result = Joi.validate(req.body, schema);
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

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



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})