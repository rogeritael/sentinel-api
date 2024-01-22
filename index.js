const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API funcionando')
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3001
})