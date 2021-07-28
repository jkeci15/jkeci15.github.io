const express = require('express')
const Admin = require('../models/Admin')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/admin/signup', async (req,res)=>{
    
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = await admin.generateAuthToken()

        res.status(201).send({ admin, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/admin/login', async (req,res)=>{
    try{
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({admin, token})
    } catch(e){
        res.status(400).send()
    }

})

router.post('/admin/logout', auth, async(req,res)=>{
    try {
        req.admin.tokens = req.admin.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.admin.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/admin/logoutAll', auth, async (req,res)=>{
    try {
        req.admin.tokens = []

        await req.admin.save()
        res.statu(200).send()
    } catch (error) {
        res.status(500).send()
    }
})
module.exports = router