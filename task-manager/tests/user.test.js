const request= require('supertest')
const app=require('../src/app')
const User=require('../src/models/user')
const { response } = require('express')
const {userOne, userOneID, setupdatabase}=require('./fixtures/db')


beforeEach(setupdatabase)

test('Should signup new user',async()=>{
    const response=await request(app).post('/users').send({
        name:'sumedh',
        email:'sumedharyya569@gmail.com',
        password:'sssrsssss'
    }).expect(201)
    //Assertion that db was changed correctly
    const user= await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    //Assertion about response
    expect(response.body).toMatchObject({
        user:{
            name:'sumedh',
            email:'sumedharyya569@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('sssrsssss')
})

test('Should login existing user',async()=>{
    const response=await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    const user= await User.findById(userOneID)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login non existent user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'xyzyzyzyz'
    }).expect(500)
})

test('Should send user profile',async()=>{
    await request(app).get('/users/me')
        .send()
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})

test('Should not get user profile for unauthenticated user',async()=>{
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user profile',async()=>{
    await request(app).delete('/users/me')
        .send()
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const user= await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Should not delete user profile for unauthenticated users',async()=>{
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload user avatar',async()=>{
    await request(app).post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.png')
        .expect(200)
    const user= await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update user',async()=>{
    await request(app).patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'Sume'
        })
        .expect(200)
    const user= await User.findById(userOneID)
    expect(user.name).toEqual('Sume')
})

test('Should not update user',async()=>{
    await request(app).patch('/users/me')
        .send({
            name:'Sume'
        })
        .expect(401)
})