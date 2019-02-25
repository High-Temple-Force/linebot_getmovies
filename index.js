const { Datastore } = require('@google-cloud/datastore')
const projectId = 'linebot-get-movies'
const line = require('@line/bot-sdk')
const express = require('express')
const datastore = new Datastore({
  projectId : projectId,
})


// configure LINE BOT
const config = {
  channelAccessToken: ,
  channelSecret: process.env.CHANNEL_SECRET,
}
// create LINE SDK client
const client = new line.Client(config)
const app = express()

const titles_arr = []


exports.listTasks = (req, res) => {
    app.use(line.middleware(config))
    const query = datastore.createQuery('Movies')
    datastore
      .runQuery(query)
      .then(results => {
        const tasks = results[0]
        tasks.forEach(task => {
          console.log(task.name)
          titles_arr.push(task.name)
        })
        const titlenames = titles_arr.join('\n')
        const echo = { type: 'text', text: titlenames }
        const return_titles = client.replyMessage(event.replyToken, echo)
        res.send(return_titles)
      })
      .catch(err => {
        console.error('ERROR:', err)
        res.send('Error!')
      })
  }

  

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent(), titlenames))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

// event handler
const handleEvent = (event) => {
  // create a echoing text message
  const echo = { type: 'text', text: titlenames }
  // use reply API
  return client.replyMessage(event.replyToken, echo)
}
