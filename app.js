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

// Post Request
app.post('/api/courses', (req, res) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    console.log(result)

    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send("Name is required and should be minimum of 3 characters");
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('The course not found');
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})