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

//adding a planet
api.post('/planets', (req, res, next) =>{
	db.Planet.create(req.body)
	.then(newCampus => res.status(201).json(newCampus))
  .catch(next);
})

//Creating a new Student
api.post('/students', (req, res, next) =>{
	console.log('req.body ', req.body)
	const newStudent = db.User.create({
		name: req.body.name,
		imageURL: req.body.imageURL
	})
	const chosenCampus = db.Planet.findOne({
		where:{
			id: req.body.planetId
		}
	})

	Promise.all([newStudent, chosenCampus])
	.then(values =>{
		//console.log(values)
		const student = values[0];
		const campus = values[1];
		//console.log('student', student, '\n campus ', campus)
		campus.setStudent(student)
	})
	.then(newUser => {
		//console.log(newUser)
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

//Editing a student profile
api.put('/students/:studentId', (req, res, next) =>{
	console.log('you are requesting a change', req.params.studentId)
	db.Planet.findOne({
		where: {
			id: req.body.newCampus
		}
	})
	.then(campus => {
		console.log(campus)
		console.log(req.body.student)
		campus.setStudent(req.body.student);
	})
	.then(updatedPage => {
		console.log(updatedPage)
		res.json(updatedPage)})
	.catch(next)
})

module.exports = api
