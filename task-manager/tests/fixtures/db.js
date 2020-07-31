const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const User=require('../../src/models/user')
const Task=require('../../src/models/task')

const userOneID=new mongoose.Types.ObjectId()

const userOne={
    _id:userOneID,
    name:'sume',
    email:'sum@gmail.com',
    password:'aaaaaaaa',
    tokens:[
        {
            token: jwt.sign({_id:userOneID},process.env.JWT_SECRET)
        }
    ]
}

const userTwoID=new mongoose.Types.ObjectId()

const userTwo={
    _id:userTwoID,
    name:'sumse',
    email:'susm@gmail.com',
    password:'aaaaaaaa',
    tokens:[
        {
            token: jwt.sign({_id:userTwoID},process.env.JWT_SECRET)
        }
    ]
}

const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:'First Task',
    completed:false,
    owner:userOne._id
}
const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:'Sec Task',
    completed:false,
    owner:userOne._id
}
const taskThree={
    _id:new mongoose.Types.ObjectId(),
    description:'Third Task',
    completed:true,
    owner:userTwo._id
}
const setupdatabase= async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports={
    userOne,
    userOneID,
    setupdatabase,
    userTwoID,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}