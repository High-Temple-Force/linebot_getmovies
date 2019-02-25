const { Datastore } = require('@google-cloud/datastore')
const projectId = 'linebot-get-movies'
const line = require('@line/bot-sdk')
const express = require('express')
const datastore = new Datastore({
  projectId : projectId,
})


// configure LINE BOT
const config = {
  channelAccessToken: 'TxZUc14K+sxqjS297KtOCm5lV4blOzyk/3t7ZE52HWwbZLbZvoYv1jbYmcZWj+t2poBQwq4YOGnlrwRXnT2H7QTaiEcSfNTKv8rHgOnzeJoq7/gJ4h7Q2R13psborwo1IppunKImPJ1nPYrBI4mKAgdB04t89/1O/w1cDnyilFU=',
  //channelSecret: process.env.CHANNEL_SECRET,
  channelSecret:'99f2bbb42adc9ff86dff6957d297d179',
}
// create LINE SDK client
const client = new line.Client(config)
const app = express()

const titles_arr = []
const Query_Datastore = () => {
  const query = datastore.createQuery('Movies')
  datastore
  .runQuery(query)
  .then((results) => {
    const tasks = results[0]
    tasks.forEach((task) => {
      console.log(task.name)
      titles_arr.push(task.name)
    })
    console.log('Succeeded to get names')
    return titles_arr.join('\n')
  })
  .catch(err => {
    console.error('ERROR:', err)
  })
}


exports.listTasks = (req, res) => {
    app.use('/', line.middleware(config))
    const token = req.body.events[0].replyToken
    res.json(handleEvent(token))
    
}

  
// event handler
const handleEvent = (token) => {
  // create a echoing text message
  const echo = { type: 'text', text: Query_Datastore()}
  // use reply API
  return client.replyMessage(token, echo)
}

// register a webhook handler with middleware
// about the middleware, please refer to doc
