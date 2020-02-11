const express = require('express');
const router = express.Router();

//Get record from vote table depending on the voteID
router.get('/:id', (req, res) => {
    var db = req.con;
    let sql = "SELECT `vote_ID`, `vote_avarage`, `vote_counte` FROM `vote` WHERE WHERE `vote_ID`=" + req.params.id;
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

//insert record into vote table depending on the voteID
router.post('/', (req,res) => {
    const movie = {
        vote_avarage: req.body.vote_avarage,
        vote_counte: req.body.vote_counte,
    }
    if (!movie) {
        return res.status(400).send({ error: true, message: 'please provide all required fields' });
    }
    var db = req.con;
    var sql ="INSERT INTO `vote`(`vote_ID`, `vote_avarage`, `vote_counte`) VALUES(null,'" + movie.vote_avarage + "','" + movie.vote_counte + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record Updated");
            return res.send(result);  
                
        });
    });
//Update record from vote table depending on the voteID
router.patch('/:voteId', (req,res) => {
    const id = req.params.voteId;  
    let movie = {
        vote_avarage: req.body.vote_avarage,
        vote_counte: req.body.vote_counte,
    }
    var db = req.con;
    var sql = "UPDATE vote SET vote_avarage='" + movie.vote_avarage + "',vote_counte='" + movie.vote_counte + "' WHERE vote_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        return res.send(result);  
            
    });
});

//Delete record from vote table depending on the voteID
router.delete('/:voteId', (req,res) => {
    const id = req.params.voteId;
    var db = req.con;
    db.query("DELETE FROM vote WHERE vote_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);  
    });
});

//xml
//insert record into vote table depending on the voteID
router.post('/asXml', (req,res) => {
    var db = req.con;
    var sql ="INSERT INTO `vote`(`vote_ID`, `vote_avarage`, `vote_counte`) VALUES(null,'" + req.body.movies.vote_avarage + "','" + req.body.movies.vote_counte + "')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record Updated");
            return res.send(result);  
                
        });
    });
//Update record from vote table depending on the voteID
router.patch('/asXml/:voteId', (req,res) => {
    const id = req.params.voteId;  
    var db = req.con;
    var sql = "UPDATE vote SET vote_avarage='" + req.body.movies.vote_avarage  + "',vote_counte='" + req.body.movies.vote_counte + "' WHERE vote_ID=" + id;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record Updated");
        return res.send(result);  
            
    });
});

//Delete record from vote table depending on the voteID
router.delete('/asXml/:voteId', (req,res) => {
    const id = req.params.voteId;
    var db = req.con;
    db.query("DELETE FROM vote WHERE vote_ID=" + id, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);  
    });
});


module.exports = router;