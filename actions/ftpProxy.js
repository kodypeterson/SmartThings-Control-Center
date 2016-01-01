exports.ftpProxy = {
    name: 'ftpProxy',
    description: 'I will proxy to the mycloud ftp',

    inputs: {
        path: {
            required: true
        },
        size: {
            required: true
        },
        modified: {
            required: true
        },
        http: {
            require: false
        }
    },

    outputExample:{

    },

    run: function(api, data, next){
        var d = new Date(0);
        d.setUTCSeconds(data.params.modified);
        var lastModified = new Date(data.connection.rawConnection.req.headers['if-modified-since']);

        if (d < lastModified) {
            data.connection.rawConnection.responseHttpCode = 304;
            data.connection.sendMessage('');
            return next();
        }

        var config = require('../tasks/config.json');
        var server = api.servers.servers[data.connection.type];
        var expires = new Date(new Date().getTime() + 86400 * 1000).toUTCString();
        var cacheControl = 'max-age=' + 86400 + ', public';

        data.connection.rawConnection.responseHeaders.push(['Expires', expires]);
        data.connection.rawConnection.responseHeaders.push(['Cache-Control', cacheControl]);


        var url = config.domain + '/api/2.7/rest/file_contents' + data.params.path + '?device_user_id=19408415&device_user_auth_code=' + config.authCode;
        var type = data.params.path.split('.');
        type = type[type.length - 1];
        var request = require('request');
        var fs = require('fs');
        var imgLocation = __dirname + '/../public/tempImage.' + type;
        var ws = fs.createWriteStream(imgLocation);

        request({
            url: url,
            encoding:null
        }).pipe(ws);

        ws.on('finish', function(err) {
            data.toRender = false;

            var jpeg = require("jpegorientation");
            jpeg.autoRotate(imgLocation, imgLocation, function(err) {
                data.connection.rawConnection.responseHttpCode = 200;
                data.connection.sendFile('tempImage.' + type);
                next(data, false);
            });
        });
    }
};