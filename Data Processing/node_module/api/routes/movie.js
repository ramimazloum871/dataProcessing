const express = require('express');
const router = express.Router();
var convert = require('xml-js');
const fs = require('fs');
var js2xmlparser = require("js2xmlparser");
const xml2js = require('xml2js').parseString;
var Ajv = require('ajv');
var ajv = new Ajv();
var schema = {
    "items": {
        "required": [
            "genres",
            "character_name",
            "actore_name",
            "amount",
            "original_Lang",
            "vote_avarage",
            "vote_counte"
        ],
        "properties": {
            "genres": {
                "$id": "#/items/properties/genres",
                "type": "string"
            },
            "character_name": {
                "$id": "#/items/properties/character_name",
                "type": "string"
            },
            "actore_name": {
                "$id": "#/items/properties/actore_name",
                "type": "string"
            },
            "amount": {
                "$id": "#/items/properties/amount",
                "type": "integer"
            },
            "original_Lang": {
                "$id": "#/items/properties/original_Lang",
                "type": "string"
            },
            "vote_avarage": {
                "$id": "#/items/properties/vote_avarage",
                "type": "integer"
            },
            "vote_counte": {
                "$id": "#/items/properties/vote_counte",
                "type": "integer"
            }
        },
        "$id": "#/items",
        "type": "object"
    },
    "$id": "http://example.org/root.json#",
    "type": "array",
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#"
};
var validate = ajv.compile(schema);



// Handle incoming GET requests to / movie

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

router.get('/xml', (req, res) => {
    var parseString = require('xml2js').parseString;
    var xml = '<?xml version="1.0" encoding="UTF-8" ?><movie><movie_title>Avatar</movie_title><genres>Action</genres><character_name>Jake Sully</character_name><actore_name>Sam Worthington</actore_name><amount>300000000</amount><original_Lang>en</original_Lang><vote_avarage>7</vote_avarage><vote_counte>11800</vote_counte></movie>';
    parseString(xml, function (err, result) {
        console.dir(JSON.stringify(result));
        var options = { compact: true, ignoreComment: true, spaces: 4 };
        var result1 = convert.json2xml(result, options);
        res.status(200).json(result1);
     
    });
});

router.get('/budget', (req, res) => {
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
            //console.log(results); 
            var valid = validate(results);
            if (valid) console.log('Valid!'), res.status(200).json(results);
            else console.log('Invalid: ' + ajv.errorsText(validate.errors)), res.status(404).json({
                message: "Invalid"
            });

            var options = { compact: true, ignoreComment: true, spaces: 4 };
            var result = convert.json2xml(results, options);
           
            // res.status(200).json(result);

        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});
router.get('/vote', (req, res) => {
    var db = req.con;
    let sql = "SELECT movie_genres.movie_title,movie_genres.genres,cast.character_name,cast.actore_name,budget_lang.amount,budget_lang.original_Lang,MAX(vote.vote_avarage) AS 'vote_avarage',vote.vote_counte FROM movie_genres INNER JOIN vote ON movie_genres.vote_ID=vote.vote_ID INNER JOIN movie_cast ON movie_genres.movie_genres_ID=movie_cast.movie_genres_ID INNER JOIN cast ON movie_cast.cast_ID=cast.cast_ID INNER JOIN budget_lang ON movie_genres.budget_lang_ID=budget_lang.budget_lang_ID"
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: "wrong query "
            });
        }
        else if (results.length > 0) {

          
            var valid = validate(results);
            if (valid) console.log('Valid!'), res.status(200).json(results);
            else console.log('Invalid: ' + ajv.errorsText(validate.errors)), res.status(404).json({
                message: "Invalid"
            });


        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});
router.get('/movie/:id', (req, res) => {
    var db = req.con;
    let sql = "SELECT movie_genres.movie_title,movie_genres.genres,cast.character_name,cast.actore_name,budget_lang.amount,budget_lang.original_Lang,vote.vote_avarage,vote.vote_counte FROM movie_genres INNER JOIN vote ON movie_genres.vote_ID=vote.vote_ID INNER JOIN movie_cast ON movie_genres.movie_genres_ID=movie_cast.movie_genres_ID INNER JOIN cast ON movie_cast.cast_ID=cast.cast_ID INNER JOIN budget_lang ON movie_genres.budget_lang_ID=budget_lang.budget_lang_ID WHERE  movie_genres.movie_genres_ID=" + req.params.id;
    let query = db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: "wrong query "
            });
        }
        else if (results.length > 0) {
           
            var valid = validate(results);
            if (valid) console.log('Valid!'), res.status(200).json(results);
            else console.log('Invalid: ' + ajv.errorsText(validate.errors)), res.status(404).json({
                message: "Invalid"
            });;
        } else {
            res.status(404).json({
                message: "No valid entry found "
            })
        }
    });
});

// Handle incoming POST requests to / movie
router.post('/', (req) => {
    const movie = {
        amount: req.body.amount,
        original_Lang: req.body.original_Lang,

    }
    var db = req.con;
    var sql = "INSERT INTO `budget_lang`(`amount`, `original_Lang`) VALUES('" + movie.amount + "','" + movie.original_Lang + "')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        db.destroy();
    });

});

// Handle incoming Patch requests to / movie

router.patch('/:budgetId', (req) => {
    const id = req.params.budgetId;
    const movie = {
        amount: req.body.amount,
        original_Lang: req.body.original_Lang,
    }
    var db = req.con;
    var sql = "UPDATE budget_lang SET amount='" + movie.amount + "',original_Lang='" + movie.original_Lang + "' WHERE budget_lang_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        db.destroy();
    });

});

// Handle incoming Delete requests to / movie

router.delete('/:budgetId', (req) => {
    const id = req.params.budgetId;
    var db = req.con;
    db.query("DELETE FROM `budget_lang` WHERE `budget_lang_ID`=" + id, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            message: result
        });
        db.destroy();
    });

});

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

router.patch('/xmlPatch', (req) => {
    const origin  =fs.readFileSync("movie.xml", "utf8");
    xml2js(origin, (error, editableJSON) => {
        if(error){
            console.log(error);
        }else{
            editableJSON.stackOverflow = true;
            // Making it back to XML
            const resultXML = js2xmlparser.parse('root', editableJSON);
            console.log(resultXML)
        }
    });
});

module.exports = router;