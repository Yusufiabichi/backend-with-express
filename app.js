const Joi = require('joi')
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const logger = require('./logger')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send("Hello Express");
// });


//Middleware
app.use(logger);
app.use(function(req, res, next) {
    console.log("Authenticating...")
    next();
});
 
const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'}
];

const genres = [
    {id:1, name: 'genre 1'},
    {id:2, name: 'genre 2'},
    {id:3, name: 'genre 3'},
    {id:4, name: 'genre 4'}
]
app.get('/', (req, res) => {
    res.send([1, 3, 3, 4, 5]);
});

//Routes Parameters
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course not found');
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
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});



//GENRES API ENDPOINTS
app.get('/api/genres/', (req, res)=> {
    res.send(genres)
});

app.get('/api/genres/:id', (req, res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
})

app.post('/api/genres/', (req, res)=>{
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    //Update Genre
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})


function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})