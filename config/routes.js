exports.default = {
  routes: function(api){
    return {
      all: [
        {path: '/', action: 'returnIndex'},
        {path: '/controller/', action: 'returnIndex'}
      ]
    }
  }
};