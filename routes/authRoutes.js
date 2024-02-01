const express = require('express')
const router = express.Router()

const { authControllers } = require("../controllers/authControllers")

router.get('/login', authControllers.loginGet)
router.post('/login', authControllers.loginPost)

router.get('/register', authControllers.registerGet)
router.post('/register', authControllers.registerPost)

router.get('/dashboard', authControllers.dashboardGet)

module.exports = router