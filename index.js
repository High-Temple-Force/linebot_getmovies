const { Datastore } = require('@google-cloud/datastore')
const datastore = new Datastore({
  projectId : projectId,
})


exports.listTasks = (req, res) => {
    const query = datastore.createQuery('Movies').order('created')
    datastore
      .runQuery(query)
      .then(results => {
        const tasks = results[0]
  
        console.log('Tasks:')
        tasks.forEach(task => {
          const taskKey = task[datastore.KEY]
          console.log(taskKey.id, task)
        })
        res.send('Got it!')
      })
      .catch(err => {
        console.error('ERROR:', err)
        res.sent('Error!')
      })
  }