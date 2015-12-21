exports.ftpProxy = {
    name: 'ftpProxy',
    description: 'I will proxy to the mycloud ftp',

    inputs: {
        path: {
            required: true
        },
        size: {
            required: true
        }
    },

    outputExample:{

    },

    run: function(api, data, next){
        var server = api.servers.servers[data.connection.type];
        var JSFtp = require("jsftp");
        var config = require('../tasks/config.json');

        var ftp = new JSFtp({
            host: config.domain.replace('http://', ''),
            user: config.ftpUser, // defaults to "anonymous"
            pass: config.ftpPass // defaults to "@anonymous"
        });

        ftp.get(data.params.path, function(err, socket) {
            if (err) return;

            socket.on("close", function(hadErr) {
                if (hadErr)
                    console.error('There was an error retrieving the file.');

                data.connection.rawConnection.res.end();
                data.connection.destroy();
            });

            var type = data.params.path.split('.');
            type = type[type.length-1];

            server.sendFile(data.connection, null, socket,  'image/' + type, data.params.size);

            socket.resume();
        });
    }
};