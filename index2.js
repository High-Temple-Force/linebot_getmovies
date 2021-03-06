const { Datastore } = require('@google-cloud/datastore')
const request = require('request')
const cheerio = require('cheerio')

const projectId = 'linebot-get-movies'
const datastore = new Datastore({
    projectId : projectId,
})
const kind = 'Movies'
const url = 'https://eiga.com/now/all/rank/' // 映画.comランキングページ
const titles_arr = []


// difine funciton upserting datas
const upsertData = (task) => {
    datastore.upsert(task)
    .then(console.log('Succsess!'))
    .catch((e) => {
        console.error(`Failed coz ${e}`)
    })
}

exports.testDATA = (req, res) => {    
    request(url, (e, response, body) => {
        if (e) {
            console.error(e)
        }
        try {
            const $ = cheerio.load(body)
            $('h3', '.m_unit' ).each((a, elem) => {
                titles_arr[a] = $(elem).text()
            })
            for (i in titles_arr) {
                console.log(titles_arr[i])
                const taskKey = datastore.key([kind, Number(i)+1])
                // define record structure
                const task = {
                    key: taskKey,
                  	data: {
                      name: titles_arr[i],
            		} 
                }
                upsertData(task)
            }
            console.log('Success!')
            res.send('Success!')
        } catch (e) {
            console.error(e)
            res.send('Error! Function ended.')
     }})
}