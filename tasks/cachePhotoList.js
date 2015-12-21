exports.cachePhotoList = {
    name:          "cachePhotoList",
    description:   "Caches Photo List",
    queue:         "default",
    plugins:       [],
    pluginOptions: [],
    frequency:     900000, // Every 15 mins
    run: function(api, params, next){
        var config = require('./config.json');

        function cloudURL(path, params) {
            var domain = config.domain;
            var device_user_id = '19408415';
            var device_user_auth_code = config.authCode;
            var param_arr = [];
            if (params) {
                for (var i in params) {
                    param_arr.push(i + '=' + params[i]);
                }
            }

            return domain +
                '/api/2.7/rest/' + path + '?device_user_id=' + device_user_id +
                '&device_user_auth_code=' + device_user_auth_code +
                '&' + param_arr.join('&') +
                '&format=json&_=' + new Date().getTime();
        }
        var request = require('request');
        var images = [];
        var dirQueue = [];

        getDir('/DigitalPhotoFrame/');

        function getDir(dir) {
            api.log('[PHOTO_CACHE] Getting \'' + dir + '\'');
            request(cloudURL('dir' + encodeURIComponent(dir), {
                path: encodeURIComponent(dir),
                show_is_linked: true,
                include_dir_count: true
            }), function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    processEntries(body);
                    if (dirQueue.indexOf(dir) > -1) {
                        dirQueue.splice(dirQueue.indexOf(dir), 1);
                    }
                    processQueue();
                } else {
                    api.log('[PHOTO_CACHE] ERR!!!', 'error');
                    api.log(error, 'error');
                    api.log(body, 'error');
                    processQueue();
                }
            });
        }

        function processQueue() {
            if (dirQueue.length > 0) {
                getDir(dirQueue[0]);
            } else {
                api.photos = images;
                api.log('[PHOTO_CACHE] Complete - ' + api.photos.length + ' Photos Found!');
                next();
            }
        }

        function processEntries(data) {
            data.dir.entry.forEach(function(entry) {
                if (entry.is_dir === 'false') {
                    if (
                        entry.name.indexOf('.PNG') > -1 ||
                        entry.name.indexOf('.JPG') > -1 ||
                        entry.name.indexOf('.JPEG') > -1 ||
                        entry.name.indexOf('.png') > -1 ||
                        entry.name.indexOf('.jpg') > -1 ||
                        entry.name.indexOf('.jpeg') > -1
                    ) {
                        entry.fullURL = cloudURL('file_contents' + entry.path + '/' + entry.name);
                        images.push(entry);
                    }
                } else {
                    dirQueue.push(entry.path + '/' + entry.name + '/');
                }
            });
        }
    }
};