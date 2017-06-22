/**
 * Created by User on 22.06.2017.
 */
const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController');

router.get('/:count',(req, res, next) => {
    newsController.parse(req.params.count)
        .then(resultArray => {
            res.render('../views/index',
                {resultArray : resultArray}
            );
        })
        .catch(err => next(err))
});

module.exports = router;