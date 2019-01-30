function listTasks() {
    const query = datastore.createQuery('Task').order('created');
  
    datastore
      .runQuery(query)
      .then(results => {
        const tasks = results[0];
  
        console.log('Tasks:');
        tasks.forEach(task => {
          const taskKey = task[datastore.KEY];
          console.log(taskKey.id, task);
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }