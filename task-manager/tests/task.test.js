const request= require('supertest')
const app=require('../src/app')
const Task=require('../src/models/task')
/* const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const { response } = require('express') */

const {userOne, userOneID, setupdatabase,userTwoID,
    userTwo,
    taskOne,
    taskTwo,
    taskThree}=require('./fixtures/db')


beforeEach(setupdatabase)

test('Should create new task',async()=>{
    const response=await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
       description:'From tests'
    }).expect(201)
    //Assertion that db was changed correctly
    const task= await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    //Assertion about response
    expect(task.completed).toEqual(false)
})

test('Should get task',async()=>{
    const response=await request(app)
    .get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(201)
    expect(response.body.length).toEqual(2)
})

test('Should delete user profile',async()=>{
    await request(app).delete(`/tasks/${userOneID}`)
        .send()
        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
        .expect(400)
    const task= await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})
