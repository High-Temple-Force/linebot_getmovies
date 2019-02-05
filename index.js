const { Datastore } = require('@google-cloud/datastore')
const projectId = 'linebot-get-movies'
const datastore = new Datastore({
  projectId : projectId,
})

const titles_arr = []
exports.listTasks = (req, res) => {
    const query = datastore.createQuery('Movies').order('id')
    datastore
      .runQuery(query)
      .then(results => {
        const tasks = results[0]
        tasks.forEach(task => {
          console.log(task.name /*, task*/)
          titles_arr.push(task.name)
        })
      	const titlenames = titles_arr.join('\n')
        res.send(titlenames)
      })
      .catch(err => {
        console.error('ERROR:', err)
        res.send('Error!')
      })
  }