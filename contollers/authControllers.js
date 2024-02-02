const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const registerGet = async (req,res) => {
    res.render('register')
}

const registerPost = async (req,res) => {
    const { name, username, email, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password,10)
        const user = new User({ name, username, email, password:hashPassword})
        await user.save()

        res.redirect('/login')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const loginGet = async(req,res)=>{
    res.render('login')
}

const loginPost = async (req,res) =>{
    const { name, username, email, password } = req.body

    try {
        const user = await User.findOne({username})

        if(!user) res.redirect('/register')

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) res.status(400).json({message: 'no password match'})

        const token = jwt.sign({username,password},'secret key',{expiresIn:'1h'})

        res.redirect('/dashboard')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(400).json({message:'No token found'})

    jwt.verify(token, 'secret key', (error, user)=>{
        if (error) return res.status(403).json({ message: error.message });

        req.user = user
        next()
    })
}

const dashboardGet = async (req,res) => {
    try{
        await authenticateToken(req,res,()=>{
            res.render('dashboard')
        })
    }catch(error){
        res.redirect('/login')
    }
}

module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    dashboardGet
}