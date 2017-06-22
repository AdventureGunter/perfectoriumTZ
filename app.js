/**
 * Created by User on 22.06.2017.
 */
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const httpError = require('http-errors');

const app = express();

const newsRouter = require('./routes/newsRouter');

app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json'}));


app.use('/news', newsRouter);

//404 handler
app.use((req, res, next) => {
    let err = httpError(404, 'Not Found');
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
//res.status(err.status);
    console.log(err.toString());
    res.send(err.toString());
});

module.exports = app;