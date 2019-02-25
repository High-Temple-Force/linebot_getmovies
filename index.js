const { Datastore } = require('@google-cloud/datastore')
const projectId = 'linebot-get-movies'
const line = require('@line/bot-sdk')
const datastore = new Datastore({
  projectId : projectId,
})


// configure LINE BOT
const config = {
  channelAccessToken: 'TxZUc14K+sxqjS297KtOCm5lV4blOzyk/3t7ZE52HWwbZLbZvoYv1jbYmcZWj+t2poBQwq4YOGnlrwRXnT2H7QTaiEcSfNTKv8rHgOnzeJoq7/gJ4h7Q2R13psborwo1IppunKImPJ1nPYrBI4mKAgdB04t89/1O/w1cDnyilFU=',
  //channelSecret: process.env.CHANNEL_SECRET,
  channelSecret: process.env.CHANNEL_SECRET,
}
// create LINE SDK client
const client = new line.Client(config)

var Query_Datastore = new Promise ((resolve, reject) => {
  console.log('Start query func')
  datastore
  .runQuery(datastore.createQuery('Movies'))
  .then((results) => {
    var titles_arr = []
    var tasks = results[0]
    tasks.forEach((task) => {
      titles_arr.push(task.name)
    })
    console.log('Succeeded to get names')
    resolve(titles_arr.join('\n'))
  })
  .catch(err => {
    reject(console.error('ERROR:', err))
  })
})

var handlerEvent = (event) => {
  console.log(event.replyToken)
  return event.replyToken
}

/*
app.use('/', line.middleware(config))
const token = req.body.events[0].replyToken
res.json(handleEvent(token))
*/
exports.listTasks = (req, res) => {
  Promise
    .all([req.body.events.map(handlerEvent), Query_Datastore])
    .then((result) => {
      console.log(result)
      var echo = { type: 'text', text: `${result[1]}` }
      console.log(echo)
      return client.replyMessage(`${result[0]}`, echo)})
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err.toString()))
}
