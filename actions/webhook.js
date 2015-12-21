exports.webhook = {
    name: 'webhook',
    description: 'Provides webhook for smartthings hub.',

    inputs: {
        "id": {
            required: false
        },
        "date": {
            required: false
        },
        "value": {
            required: false
        },
        "name": {
            required: false
        },
        "display_name": {
            required: false
        },
        "description": {
            required: false
        },
        "source": {
            required: false
        },
        "state_changed": {
            required: false
        },
        "physical": {
            required: false
        },
        "location_id": {
            required: false
        },
        "hub_id": {
            required: false
        }
    },
    outputExample:{
        "success": true
    },

    run: function(api, data, next){
        api.chatRoom.broadcast({room: "SERVER"}, 'smartthings', data.params);

        data.response.success = true;
        next();
    }
};