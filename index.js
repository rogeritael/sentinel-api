const express = require('express')
const app = express()
const ScrapController = require('./src/controllers/ScrapController')

app.use(express.json())

app.get('/', ScrapController.findXboxPromotions)

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3001
})