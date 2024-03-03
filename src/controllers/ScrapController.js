const cheerio = require('cheerio')
const axios = require('axios')
const UserAgent = require('user-agents')
const configs = require('../configs')
const { xboxPromotions } = require('../services/xboxPromotions')

class ScrapController {
    async searchGame(req, res){
        const { query } = req.params.query

        console.log(configs['xbox-search-query-string'](query))
    }

    async findXboxPromotions(req, res){
        try {
            const urlalvo = 'https://www.microsoft.com/pt-br/store/deals/games/xbox' 

            const userAgent = await new UserAgent();
            const { data } = await axios.get(urlalvo, {
                'User-Agent': userAgent.toString()
            })
        
            const $ = cheerio.load(data)
            let results = []

            await $('.material-card').map((index, element) => {
                let image_url = $(element).find('.img-flex-auto picture source').attr('srcset')
                let name = $(element).find('h3.base').text()
                let base_price = $(element).find('.card-body p span.text-line-through').text()
                let current_price = $(element).find('.card-body p span.font-weight-semibold').text().replace('+','')
                let page_url = $(element).find('.card-body h3 a').attr('href')
                let developer = '---'
                let platform = 'xbox'

                const game = {
                    name,
                    image: image_url,
                    page_url,
                    base_price,
                    current_price,
                    developer,
                    platform
                }

                results = [...results, game]
            })

            res.status(200).json(results)

        } catch(err){
            res.status(400).json([])
        }
    }

    // async findGameByURL(req, res){
    //     const urlalvo = 'https://www.xbox.com/pt-BR/games/store/palworld-game-preview/9NKV34XDW014/0010/B1WB0HW5PVHN' 

    //     const userAgent = await new UserAgent();
    //     const { data } = await axios.get(urlalvo, {
    //         'User-Agent': userAgent.toString()
    //     })
    
    //     const $ = cheerio.load(data)
    //     let results = []
    //     let price = await $(configs['xbox-price-tag02']).map((index, element) => {
    //         results = [...results, $(element).text()]
    //     })

    //     res.json({'preco': results[0]})
    // }

    // async findXboxPromotions(req, res){
    //     try {
    //         const promotions = await xboxPromotions()

    //         if(promotions.length > 0){
    //             res.status(200).json({ promotions: promotions })
    //         } else {
    //             res.status(404).json({ promotions: [] })
    //         }
    //     }catch(e){
    //         res.status(400).json({ message: 'Não foi possível encontrar promoções' })
    //     }
        
    // }
}

module.exports = new ScrapController()