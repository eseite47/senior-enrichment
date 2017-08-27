'use strict'
const api = require('express').Router()
const db = require ('../db/models')


// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

//Get all the students
api.get('/students', (req, res, next) =>{
	db.User.findAll({include: [{ all: true, nested: true }]})
	.then(data => res.json(data))
	.catch(next)
})

//Get a specific student
api.get('/students/:studentId', (req, res, next) =>{
	db.User.findOne({
		where:{
			id: req.params.studentId
		},
		include: [{ all: true, nested: true }]
	})
	.then(data => res.json(data))
	.catch(next)
})

//Get planets
api.get('/planets', (req, res, next) =>{
	db.Planet.findAll()
	.then(data => res.json(data))
	.catch(next)
})

//Get students for a specific planet
api.get('/planets/:campusName', (req, res, next) => {
	console.log('I am looking for students from this plannet: ', req.params.campusName)
	db.Planet.findAll({
			where:{
				name: req.params.campusName
			},
			include: [{ all: true, nested: true }]
		})
	.then(data => res.json(data))
	.catch(next)
})
//adding a student to a planet
api.post('/planets', (req, res, next) =>{
	db.Planet.create(req.body)
	.then(newCampus => res.status(201).json(newCampus))
  .catch(next);
})

api.post('/students', (req, res, next) =>{
	console.log('req.body ', req.body)
	// db.User.create({
	// 	name: req.body.name,
	// 	imageURL: req.body.imageURL
	// })
	db.Planet.findOne({
		where:{
			id: req.body.planetId
		}
	})
	.then(campus => {
		console.log('campus :', campus)
		campus.setStudent(req.body)
	})
	.then(newUser => {
		console.log(newUser)
		res.status(201).json(newUser)})
  .catch(next);
})

//removing a student
api.delete('/student', (req, res, next) => {
	console.log('deleting student')
	db.User.destroy({
		where: {
			id: req.params.id
		}
	})
	.then((returned) => {
		console.log('student deleted', returned)
		res.redirect('/')})
})

module.exports = api
