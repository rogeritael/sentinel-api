const cheerio = require('cheerio')
const axios = require('axios')
const UserAgent = require('user-agents')
const configs = require('../configs')

class ScrapController {
    async searchGame(req, res){
        const { query } = req.params.query

        console.log(configs['xbox-search-query-string'](query))
    }

    async findGameByURL(req, res){
        const urlalvo = 'https://www.xbox.com/pt-BR/games/store/palworld-game-preview/9NKV34XDW014/0010/B1WB0HW5PVHN' 

        const userAgent = await new UserAgent();
        const { data } = await axios.get(urlalvo, {
            'User-Agent': userAgent.toString()
        })
    
        const $ = cheerio.load(data)
        let results = []
        let price = await $(configs['xbox-price-tag02']).map((index, element) => {
            results = [...results, $(element).text()]
        })

        res.json({'preco': results[0]})
    }
}

module.exports = new ScrapController()