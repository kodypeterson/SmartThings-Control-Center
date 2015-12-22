var fs = require('fs');

exports.returnIndex = {
    name: 'returnIndex',
    matchExtensionMimeType: true,
    toDocument:             true,
    description: 'Returns index.html from public directory',
    inputs: {
        path: {
            required: false
        }
    },

    render404: function(api, data, next){
        data.connection.rawConnection.responseHttpCode = 404;
        data.connection.sendFile('404.html');
        next(data, false);
    },

    renderFile: function(api, data, next){
        // do any pre-rendering etc here
        data.connection.rawConnection.responseHttpCode = 200;
        data.connection.sendFile('index.html');
        next(data, false);
    },

    run: function(api, data, next){
        var self = this;
        data.toRender = false;

        var file = api.config.general.paths.public + '/index.html';
        fs.exists(file, function(found){
            if(found){
                self.renderFile(api, data, next);
            }else{
                self.render404(api, data, next);
            }
        });
    }
};