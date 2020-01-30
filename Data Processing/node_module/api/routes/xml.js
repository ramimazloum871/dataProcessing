const express = require('express');
const router = express.Router();
var js2xmlparser = require("js2xmlparser");

// Handle incoming xml get requests to / movie
router.get('/xml2', (req, res) => {
    var db = req.con;
    let sql = "SELECT movie_genres.movie_title,movie_genres.genres,cast.character_name,cast.actore_name,budget_lang.amount,budget_lang.original_Lang,vote.vote_avarage,vote.vote_counte FROM movie_genres INNER JOIN vote ON movie_genres.vote_ID=vote.vote_ID INNER JOIN movie_cast ON movie_genres.movie_genres_ID=movie_cast.movie_genres_ID INNER JOIN cast ON movie_cast.cast_ID=cast.cast_ID INNER JOIN budget_lang ON movie_genres.budget_lang_ID=budget_lang.budget_lang_ID ";
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: "wrong query "
            });
        }
        else if (results.length > 0) {
            var result1 = js2xmlparser.parse("movie", results);
            return res.send(result1);
            // res.status(200).json(result1);
        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});

//update record into the budget_lang table
router.patch('/:budgetId', (req, res) => {
    const id = req.params.budgetId;
    const movie = {
        amount: req.body.amount,
        original_Lang: req.body.original_Lang,
    }
    if (!movie) {
        return res.status(400).send({ error: true, message: 'please provide all required fields' });
    }
    var db = req.con;
    db.query("UPDATE budget_lang SET ? WHERE budget_lang_ID=" + id + "", movie, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("budget_lang", results);
        return res.send(results);
    });
});

// Add a new entry into the budget_lang table
router.post('/insert', function (req, res) {
    let data = {
        amount: req.body.amount,
        original_Lang: req.body.original_Lang,
    };
    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields' });
    }
    var db = req.con;
    db.query("INSERT INTO budget_lang SET ?", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("budget_lang", results);
        return res.send(results);
    });
});


//  Delete record from budget_lang table
router.delete('/:budgetId', function (req, res) {
    const id = req.params.budgetId;
    var db = req.con;
    db.query("DELETE FROM budget_lang WHERE budget_lang_ID= " + id, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("budget_lang", results);
        return res.send(results);
    });
});

module.exports = router;