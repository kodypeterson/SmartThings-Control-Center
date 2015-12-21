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
        http: {
            require: false
        }
    },

    outputExample:{

    },

    run: function(api, data, next){
        var config = require('../tasks/config.json');
        var server = api.servers.servers[data.connection.type];

        if (!data.params.http) {
            var JSFtp = require("jsftp");

            var ftp = new JSFtp({
                host: config.domain.replace('http://', ''),
                user: config.ftpUser, // defaults to "anonymous"
                pass: config.ftpPass // defaults to "@anonymous"
            });

            ftp.get(data.params.path, function (err, socket) {
                if (err) return;

                socket.on("close", function (hadErr) {
                    if (hadErr)
                        console.error('There was an error retrieving the file.');

                    data.connection.rawConnection.res.end();
                    data.connection.destroy();
                });

                var type = data.params.path.split('.');
                type = type[type.length - 1];

                server.sendFile(data.connection, null, socket, 'image/' + type, data.params.size);

                socket.resume();
            });
        } else {
            var url = config.domain + '/api/2.7/rest/file_contents' + data.params.path + '?device_user_id=19408415&device_user_auth_code=' + config.authCode;
            var type = data.params.path.split('.');
            type = type[type.length - 1];
            var request = require('request');
            var requestStream = request(url);

            server.sendFile(data.connection, null, requestStream, 'image/' + type, data.params.size);
        }
    }
};