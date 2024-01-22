const express = require('express')
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')
const UserAgent = require('user-agents')

app.use(express.json())

app.get('/', async(req, res) => {
    const urlalvo = 'https://www.xbox.com/pt-BR/games/store/palworld-game-preview/9NKV34XDW014/0010/B1WB0HW5PVHN' 

    const userAgent = await new UserAgent();
    const { data } = await axios.get(urlalvo, {
        'User-Agent': userAgent.toString()
    })

    const $ = cheerio.load(data)
    let results = []
    let price = await $('.Price-module__boldText___vmNHu.Price-module__moreText___q5KoT').map((index, element) => {
        results = [...results, $(element).text()]
    })

    res.json({'preco': results[0]})
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3001
})