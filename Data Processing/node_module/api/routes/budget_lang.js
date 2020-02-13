const express = require('express');
const router = express.Router();


//Get record from budget_lang table depending on the budgetID
router.get('/:id', (req, res) => {
    var db = req.con;
    let sql = "SELECT movie_genres.movie_title,movie_genres.genres,cast.character_name,cast.actore_name,budget_lang.amount,budget_lang.original_Lang,vote.vote_avarage,vote.vote_counte FROM movie_genres INNER JOIN vote ON movie_genres.vote_ID=vote.vote_ID INNER JOIN movie_cast ON movie_genres.movie_genres_ID=movie_cast.movie_genres_ID INNER JOIN cast ON movie_cast.cast_ID=cast.cast_ID INNER JOIN budget_lang ON movie_genres.budget_lang_ID=budget_lang.budget_lang_ID WHERE  budget_lang.budget_lang_ID=" + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: "wrong query "
            });
        }
        else if (results.length > 0) {
          res.status(200).json({
              Movie:results});
              db.destroy();
    }})
});

// insert record into the budget_lang table 
router.post('/', (req,res) => {
    const movie = {
        amount: req.body.amount,
        original_Lang: req.body.original_Lang,
    }
    var db = req.con;
    var sql = "INSERT INTO `budget_lang`(`amount`, `original_Lang`) VALUES('" + movie.amount + "','" + movie.original_Lang + "')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        return res.send(result);
    });
});

//update record into the budget_lang table depending on the budgetID
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
    db.query("UPDATE budget_lang SET  amount='" + movie.amount + "',original_Lang='" + movie.original_Lang + "' WHERE budget_lang_ID=" + id + "", movie, function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});


//delete record from the budget_lang table depending on the budgetID
router.delete('/:budgetId', (req,res) => {
    const id = req.params.budgetId;
    var db = req.con;
    db.query("DELETE FROM budget_lang WHERE budget_lang_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            message: result
        });
        db.destroy();
    });
});


//xml


// insert record into the budget_lang table 
router.post('/asXml', (req,res) => {
    var db = req.con;
    var sql = "INSERT INTO `budget_lang`(`amount`, `original_Lang`) VALUES('" +req.body.movies.amount + "','" + req.body.movies.original_Lang + "')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        return res.send(result);
    });
});

//update record into the budget_lang table depending on the budgetID
router.patch('/asXml/:budgetId', (req, res) => {
    const id = req.params.budgetId;
    var db = req.con;
    var sql="UPDATE budget_lang SET amount='" + req.body.movies.amount + "',original_Lang='" + req.body.movies.original_lang + "' WHERE budget_lang_ID="+ id ;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        return res.send(result).end();
    });
});


//delete record from the budget_lang table depending on the budgetID
router.delete('/asXml/:budgetId', (req,res) => {
    const id = req.params.budgetId;
    var db = req.con;
    db.query("DELETE FROM budget_lang WHERE budget_lang_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            message: result
        });
        db.destroy();
    });
});


function HTML_ACCEPTED (req, res, next) { 
    return req.accepts("html") ? next() : next("route")
 }
function JSON_ACCEPTED (req, res, next) { 
    return req.accepts("json") ? next() : next("route") 
}
module.exports = router;