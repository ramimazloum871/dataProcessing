const express = require('express');
const router = express.Router();
var js2xmlparser = require("js2xmlparser");

router.get('/json', (req, res) => {
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
           res.status(200).json({
                Movies: results  
            });
        }
    });
});

// Handle incoming xml get requests to / movie
router.get('/xml', (req, res) => {
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
            var result1 = js2xmlparser.parse("movies", results);
            return res.send(result1);
            // res.status(200).json(result1);
        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});

module.exports = router;