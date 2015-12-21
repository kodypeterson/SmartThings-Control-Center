exports.status = {
  name: 'status',
  description: 'I will return some basic information about the API',
   
  outputExample:{  
    "id":"192.168.2.11",
    "actionheroVersion":"9.4.1",
    "uptime":10469,
    "serverInformation":{  
      "serverName":"actionhero API",
      "apiVersion":"0.0.1",
      "requestDuration":12,
      "currentTime":1420953679624
    }
  },

  run: function(api, data, next){
    data.response.id                = api.id;
    data.response.actionheroVersion = api.actionheroVersion;
    data.response.uptime            = new Date().getTime() - api.bootTime;

    api.tasks.details(function(err, details){
      api.tasks.allDelayed(function(err, delayedDetails) {
        api.tasks.failed(0,1000, function(err, failedJobs) {
          api.tasks.allWorkingOn(function(err, workers) {
            data.response.queues = details.queues;
            data.response.delayedJobs = delayedDetails;
            data.response.failedJobs = failedJobs;
            data.response.workers = details.workers;
            data.response.workersWorkingOn = workers;

            next(err);
          });
        });
      });
    });
  }
};