const express = require('express');
const router = express.Router();

router.get('/genres/:genres', (req, res) => {
    var db = req.con;
    let sql = "SELECT movie_genres.movie_title,movie_genres.genres,cast.character_name,cast.actore_name,budget_lang.amount,budget_lang.original_Lang,vote.vote_avarage,vote.vote_counte FROM movie_genres INNER JOIN vote ON movie_genres.vote_ID=vote.vote_ID INNER JOIN movie_cast ON movie_genres.movie_genres_ID=movie_cast.movie_genres_ID INNER JOIN cast ON movie_cast.cast_ID=cast.cast_ID INNER JOIN budget_lang ON movie_genres.budget_lang_ID=budget_lang.budget_lang_ID WHERE  movie_genres.genres=" + req.params.genres;
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: "wrong query "
            });
        }
        else if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});


//Get record from genres table depending on the genresID

router.get('/:id', (req, res) => {
    var db = req.con;
    let sql = "SELECT `movie_genres_ID`, `movie_title`, `genres`, `vote_ID`, `budget_lang_ID` FROM `movie_genres` WHERE `movie_genres_ID`=" + req.params.id;
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

//insert record into genres table 
router.post('/', (req,res) => {
    const movie = {
        movie_title: req.body.movie_title,
        genres: req.body.genres,
        vote_ID: req.body.vote_ID,
        budget_lang_ID: req.body.budget_lang_ID
    }
    if (!movie) {
        return res.status(400).send({ error: true, message: 'please provide all required fields' });
    }
    var db = req.con;
    var sql ="INSERT INTO `movie_genres`(`movie_genres_ID`, `movie_title`, `genres`, `vote_ID`, `budget_lang_ID`) VALUES(null,'" + movie.movie_title + "','" + movie.genres + "','" + movie.vote_ID + "','" + movie.budget_lang_ID + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record Updated");
            return res.send(result);  
                
        });
    });

//Update record from genres table depending on the genresID
router.patch('/:genresId', (req,res) => {
    const id = req.params.genresId;  
    let movie = {
        movie_title: req.body.movie_title,
        genres: req.body.genres,
    }
    var db = req.con;
    var sql = "UPDATE movie_genres SET movie_title='" + movie.movie_title + "',genres='" + movie.genres + "' WHERE movie_genres_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        return res.send(result);  
            
    });
});

//delete record from genres table depending on the genresID
router.delete('/:genresId', (req) => {
    const id = req.params.genresId;
    var db = req.con;
    db.query("DELETE FROM movie_genres WHERE movie_genres_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);  
    });
});

//xml


//insert record into genres table 
router.post('/asXml', (req,res) => {
    var db = req.con;
    console.log(req.body.movies);
    console.log(req.body.movies.budget_lang_ID);
    console.log(req.body.movies.movie_title);
    var sql ="INSERT INTO `movie_genres`(`movie_genres_ID`, `movie_title`, `genres`, `vote_ID`, `budget_lang_ID`) VALUES(null,'" + req.body.movies.movie_title + "','" + req.body.movies.genres + "','" + req.body.movies.vote_id + "','" + req.body.movies.budget_lang_id + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record Updated");
            return res.send(result);  
                
        });
    });

//Update record from genres table depending on the genresID
router.patch('/asXml/:genresId', (req,res) => {
    const id = req.params.genresId;  
    console.log(req.body.movies);
    var db = req.con;
    var sql = "UPDATE movie_genres SET movie_title='" + req.body.movies.movie_title + "',genres='" + req.body.movies.genres + "' WHERE movie_genres_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        return res.send(result);  
            
    });
});

//delete record from genres table depending on the genresID
router.delete('/asXml/:genresId', (req,res) => {
    const id = req.params.genresId;
    var db = req.con;
    db.query("DELETE FROM movie_genres WHERE movie_genres_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);  
    });
});



module.exports = router;