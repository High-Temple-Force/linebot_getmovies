const { Datastore } = require('@google-cloud/datastore')
const projectId = 'linebot-get-movies'
const datastore = new Datastore({
    projectId : projectId,
})

const kind = 'Movies'
const name = 'samplemovie1'
const taskKey = datastore.key([kind, name])

const task = {
    key: taskKey,
    data: {
        name: 'アリー',
    },
}

exports.testDATA = (req, res) => {    
    datastore.save(task).then(() => {
        res.send(`Saved ${task.key.name} : ${task.data.name}`)
    })
    .catch(err => {
        res.send('Error,' , err)
    })
}

const request = require('request')
const cheerio = require('cheerio')
const url = 'https://eiga.com/now/all/rank/' // 映画.comランキングページ
const titles_arr = []

request(url, (e, response, body) => {
    if (e) {
        console.error(e)
    }
    try {
        const $ = cheerio.load(body)
        $('h3', '.m_unit' ).each((i, elem) => {
            titles_arr[i] = $(elem).text()
        })
        for (i in titles_arr) {
            console.log(titles_arr[i])
        }
     } catch (e) {
         console.error(e)
     }
})

