exports.getPhoto = {
    name: 'getPhoto',
    description: 'I will return a random photo from cache',

    inputs: {
        random: {
            required: false
        }
    },

    outputExample:{

    },

    run: function(api, data, next){
        function getPhoto() {
            if (data.params.random) {
                var index = Math.floor(Math.random() * api.photos.length);
                data.response.photo = api.photos[index];

                if (api.photos.length > 1) {
                    if (index === api.lastPhoto) {
                        getPhoto();
                    } else {
                        api.lastPhoto = index;
                        next();
                    }
                } else {
                    next();
                }
            } else {
                if (api.lastPhoto === null) {
                    api.lastPhoto = 0;
                } else {
                    api.lastPhoto++;
                }

                if (api.lastPhoto === api.photos.length) {
                    api.lastPhoto = 0;
                }

                data.response.photo = api.photos[api.lastPhoto];
                next();
            }
        }

        getPhoto();
    }
};