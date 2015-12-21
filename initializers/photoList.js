module.exports = {
    loadPriority:  1001,
    startPriority: 1001,
    stopPriority:  1001,
    initialize: function(api, next){
        next();
    },
    start: function(api, next){
        api.lastPhoto = null;
        api.photos = [];
        next();
    },
    stop: function(api, next){
        next();
    }
};