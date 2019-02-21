const { Datastore } = require('@google-cloud/datastore')
const request = require('request')
const cheerio = require('cheerio')
const line = require('@line/bot-sdk');
const express = require('express');


const projectId = 'linebot-get-movies'
const datastore = new Datastore({
    projectId : projectId,
})
const kind = 'Movies'
const url = 'https://eiga.com/now/all/rank/' // 映画.comランキングページ
const titles_arr = []

// configure LINE BOT
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
  }
// create LINE SDK client
const client = new line.Client(config)
const app = express()

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
            app.use(line.middleware(config))
            const $ = cheerio.load(body)
            $('h3', '.m_unit' ).each((a, elem) => {
                titles_arr[a] = $(elem).text()
        })
            for (i in titles_arr) {
                console.log(titles_arr[i])
                const taskKey = datastore.key([kind, Number(i)+1])
                const task = {
                    key: taskKey,
                  	data: {
                      name: titles_arr[i],
            			} 
                }
                upsertData(task)
               
            } 
            res.send('Success!')
        } catch (e) {
            console.error(e)
            res.send('Error! Function ended.')
     } 

    })
}

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

// event handler
const handleEvent = (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null)
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text }

  // use reply API
  return client.replyMessage(event.replyToken, echo)
}
