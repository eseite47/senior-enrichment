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
	db.Planet.findAll({
			where:{
				name: req.params.campusName
			},
			include: [{ all: true, nested: true }]
		})
	.then(data => res.json(data))
	.catch(next)
})

//adding a planet
api.post('/planets', (req, res, next) =>{
	db.Planet.create(req.body)
	.then(newCampus => res.status(201).json(newCampus))
  .catch(next);
})

//adding a new Student
api.post('/students', (req, res, next) =>{
	db.User.create(req.body)
	.then(newUser => {
		res.status(201).json(newUser)})
  .catch(next);
})

//removing a student
api.delete('/students/:studentId', (req, res, next) => {
	console.log('deleting student ', req.params.studentId)
	db.User.destroy({
		where: {
			id: req.params.studentId
		}
	})
	.then((returned) => {
		console.log('student deleted', returned)
		res.sendStatus(204)
	})
	.catch(next)
})

//removing a planet
api.delete('/planets/:campusName', (req, res, next) => {
	console.log('deleting campus ', req.params.campusName)
	db.Planet.destroy({
		where: {
			name: req.params.campusName
		}
	})
	.then((returned) => {
		console.log('student deleted', returned)
		res.sendStatus(204)
	})
	.catch(next)
})

//Editing a student's planet
api.put('/students/:studentId', (req, res, next) =>{
	console.log('you are requesting a change', req.params.studentId)
	const newCampus = db.Planet.findOne({
		where: {
			name: req.body.newCampus
		}
	})
	const transferStudent = db.User.findOne({
		where: {
			id: req.params.studentId
		}
	})
	Promise.all([newCampus, transferStudent])
	.then(values => {
		const campus = values[0];
		const student = values[1];
		if(campus){
			student.update({planetId: campus.id})
		}
		else {
			student.update({planetId: null})
		}
	})
	.then(changes => {
		//console.log(newUser)
		res.status(201).json(changes)})
  .catch(next);
})

//updating a student's details
api.put('/students/edit/:studentId', (req, res, next) =>{
	//console.log('starting update')
	db.User.update(req.body, {
		where:
		{id: req.params.studentId}
	})
})

api.put('/planets/:campusName', (req, res, next) =>{
	db.Planet.update(req.body, {
		where:
		{name: req.params.campusName}
	})
})

module.exports = api
