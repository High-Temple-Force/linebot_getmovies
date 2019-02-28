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

// event handler to get replytoken
var handlerEvent = (event) => {
  console.log(event.replyToken)
  return event.replyToken
}

exports.listTasks = (req, res) => {
  // query for datastore func
  var Query_Datastore = new Promise ((resolve, reject) => {
    console.log('Start query func')
    datastore
    .runQuery(datastore.createQuery('Movies'))
    .then((titles) => {
      var titles_arr = []
      var tasks = titles[0]
      tasks.forEach((task) => {
        titles_arr.push(task.name)
        })
      console.log('Succeeded to get names, end query func')
      resolve(titles_arr.join('\n'))
    })
    .catch(err => {
      reject(console.error('End query func, ERROR:', err))
    })
  })

  // promise event and titles
  Promise
    .all([req.body.events.map(handlerEvent), Query_Datastore])
    .then((result) => {
      var echo = { type: 'text', text: `${result[1]}` }
      console.log(echo)
      return client.replyMessage(`${result[0]}`, echo)
    })
    .then((result) => {
      res.json(result)
      console.log('Sent movie titles')
    })
    .catch((err) => {
      res.status(400).send(err)
      console.log('Failed to send movie titles')
    })
}
