const cheerio = require('cheerio')
const axios = require('axios')
const UserAgent = require('user-agents')

async function xboxPromotions(){
    console.log('oi')
    //recuperando a url alvo
    const urlalvo = 'https://www.microsoft.com/pt-br/store/deals/games/xbox' 

    const userAgent = await new UserAgent();
    const { data } = await axios.get(urlalvo, {
        'User-Agent': userAgent.toString()
    })

    //tratando os dados recuperados
    const $ = cheerio.load(data)
    let results = []
    // let price = await $(configs['xbox-price-tag02']).map((index, element) => {
    //     results = [...results, $(element).text()]
    // })

    const games = await $('.card')
    games.map((game) => {
        console.log('jogo encontrado')
    })

    res.json({'preco': '132'})
    // res.json({'preco': results[0]})

}

module.exports = xboxPromotions