const Datastore = require('@google-cloud/datastore')
const projectId = 'linebot-get-movies'
const datastore = new Datastore({
    projectId : projectId,
})

const kind = 'Task'
const name = 'sampletask1'
const taskKey = datastore.key([kind, name])

const task = {
    key: taskKey,
    data: {
        description: 'Buy milk',
    },
}

datastore.save(task).then(() => {
    console.log(`Saved ${task.key.name} : ${task.data.description}`)
})
.catch(err => {
    console.error('Error,' , err)
})