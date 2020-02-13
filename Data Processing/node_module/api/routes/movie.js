const express = require('express');
const router = express.Router();
var js2xmlparser = require("js2xmlparser");
var builder = require('xmlbuilder');
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
    var xml = builder.create('movies');
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
            for(var i=0; i< results.length; i++){
                xml.ele('movie')
                .ele('movie_title', results[i]['movie_title']).up()
                .ele('genres', results[i]['genres']).up()
                .ele('character_name', results[i]['character_name']).up()
                .ele('actore_name', results[i]['autactore_namehor']).up()
                .ele('amount', results[i]['amount']).up()
                .ele('original_Lang', results[i]['original_Lang']).up()
                .ele('vote_avarage', results[i]['vote_avarage']).up()
                .ele('vote_counte', results[i]['vote_counte']).end();
            }       
            var xmldoc = xml.toString({ pretty: true });            
            var xmldoc2=xmldoc.replace(/^/,"<?xml version='1.0' encoding='UTF-8' ?>\n <movies xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:noNamespaceSchemaLocation='movie.xsd' >\n");
            xmldoc2+="</movies>";
             res.send(xmldoc2);
        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});


module.exports = router;