const express = require('express');
const router = express.Router();



//Get record from cast table depending on the castID
router.get('/:id', (req, res) => {
    var db = req.con;
    let sql = "SELECT cast_ID, character_name, actore_name FROM cast WHERE cast_ID=" + req.params.id;
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

// insert record into the cast table 
router.post('/', (req,res) => {
    const movie = {
        character_name: req.body.character_name,
        actore_name: req.body.actore_name,
    }
    var db = req.con;
    var sql = "INSERT INTO `cast`(`character_name`, `actore_name`) VALUES('" + movie.character_name + "','" + movie.actore_name + "')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        return res.send(result);
 
    });
});

//update record in the cast table depending on castID

router.patch('/:castId', (req,res) => {
    const id = req.params.castId;
    const movie = {
        character_name: req.body.character_name,
        actore_name: req.body.actore_name,
    }
    var db = req.con;
    var sql = "UPDATE cast SET character_name='" + movie.character_name + "',actore_name='" + movie.actore_name + "' WHERE cast_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        return res.send(result);

    });
});


//delete record from the cast table depending on the castID
router.delete('/:castId', (req,res) => {
    const id = req.params.castId;
    var db = req.con;
    db.query("DELETE FROM cast WHERE cast_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            message: result
        });
        db.destroy();
    });
});

//xml


// insert record into the cast table 
router.post('/asXml', (req,res) => {
console.log(req.body.movies.character_name);
    var db = req.con;
    var sql = "INSERT INTO `cast`(`character_name`, `actore_name`) VALUES('" + req.body.movies.character_name + "','" +  req.body.movies.actore_name + "')";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        return res.send(result);
 
    });
});

//update record in the cast table depending on castID

router.patch('/asXml/:castId', (req,res) => {
    const id = req.params.castId;
    var db = req.con;
    var sql = "UPDATE cast SET character_name='" + req.body.movies.character_name + "',actore_name='" + req.body.movies.actore_name + "' WHERE cast_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        return res.send(result);

    });
});


//delete record from the cast table depending on the castID
router.delete('/asXml/:castId', (req,res) => {
    const id = req.params.castId;
    var db = req.con;
    db.query("DELETE FROM cast WHERE cast_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            message: result
        });
        db.destroy();
    });
});


module.exports = router;