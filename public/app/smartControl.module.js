(function() {
    'use strict';

    angular
        .module('smartControl', [
            // Global Dependencies
            'ui.router',

            // Directives


            // States
            'smartControl.photoViewer'

        ])
        .run(SmartControlRun)
        .config(SmartControlConfig);

    /* @ngInject */
    function SmartControlRun($state, $rootScope) {
        $rootScope.$state = $state;
    }

    /* @ngInject */
    function SmartControlConfig($urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.interceptors.push(function ($location) {
            return {
                request: function (config) {
                    return config;
                }
            };
        });

        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.url();

            // check to see if the path already has a slash where it should be
            if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
                return;
            }

            if (path.indexOf('?') > -1) {
                return path.replace('?', '/?');
            }

            return path + '/';
        });

        $locationProvider.html5Mode(true);
    }
})();