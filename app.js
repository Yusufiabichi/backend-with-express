const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const Joi = require('joi')
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const courses = require('./routes/courses')
const logger = require('./middleware/logger')
const home = require('./routes/home')
const genre = require('./routes/genre')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use('/api/genres', genre)

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan is enabled');
}

// DB work
dbDebugger('Connected to the database..')

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail password: ' + config.get('mail.password'));

app.get('/', (req, res) => {
    res.send("Hello Express");
});


//Middleware
app.use(logger);
app.use(function(req, res, next) {
    console.log("Authenticating...")
    next();
});
 

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})