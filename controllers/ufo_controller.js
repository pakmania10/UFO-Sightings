// Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models');
var path = require("path");



router.get("/api/all", function (req, res) {
    models.sightings.findAll({}).then(function(sightings) {
        var hbsObject = {sightings : sightings};
        console.log(hbsObject);
        res.render('allSightings', hbsObject);
    });
});

router.get("/shape/:shape", function(req,res) {
    models.sightings.findAll({
    where: {
        shape: req.params.shape
    }
	}).then(function(results){
	    res.json(results)
	});
});

router.get("/date/:date", function(req,res){
    models.sightings.findAll({ 
    where: {
        Date: req.params.date
    }
    }).then(function(results){
    res.json(results);
    console.log(results);
	});
});

router.get("/state/:state", function(req,res){
    models.sightings.findAll({
        where: {
            state: req.params.state 
        }
    }).then(function(results){
    res.json(results);
	});
});

router.get("/api/city/:city", function(req,res){
    models.sightings.findAll({
        where: {
            city: req.params.city
        }
	}).then(function(results){
	    res.json(results);
	});
});

//post route for adding new sighting
router.post("/", function (req, res) {
    console.log(req.body);
    models.sightings.create({
      Date: req.body.date,
      City: req.body.city,
      State: req.body.state,
      Shape: req.body.shape,
      Duration: req.body.duration,
      Summary: req.body.summary
    }).then(function(dbSighting) {
        //res.json(dbSighting);
        res.redirect("/");
    });//dbsighting
})//post

//get route to display addSighting handlebars page where POST route info shows
router.get("/api/add", function (req, res) {

        res.render('addSighting');
    
});

// //HTML add route loads the add.html page, where users can enter new books to the db
//   router.get("/add", function(req, res) {
//     res.sendFile(path.join(__dirname, "../views/addSighting.handlebars"));
//   });

module.exports = router;