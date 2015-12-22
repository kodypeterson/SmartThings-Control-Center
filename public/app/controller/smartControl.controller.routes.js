(function() {
    'use strict';

    angular
        .module('smartControl.controller')
        .config(SmartControlControllerConfig);

    /* @ngInject */
    function SmartControlControllerConfig($stateProvider) {
        $stateProvider
            .state('controller', {
                url: '/controller/',
                controller: 'ReblSmartControlControllerCtrl',
                controllerAs: 'ReblSmartControlControllerVm',
                templateUrl: '/public/app/controller/smartControl.controller.htm'
            })
    }
})();