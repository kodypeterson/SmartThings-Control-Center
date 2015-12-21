(function() {
    'use strict';

    angular
        .module('smartControl.photoViewer')
        .config(SmartControlPhotoViewerConfig);

    /* @ngInject */
    function SmartControlPhotoViewerConfig($stateProvider) {
        $stateProvider
            .state('photo-viewer', {
                url: '/',
                controller: 'ReblSmartControlPhotoViewerCtrl',
                controllerAs: 'ReblSmartControlPhotoViewerVm',
                templateUrl: '/public/app/photo-viewer/smartControl.photo-viewer.htm'
            })
    }
})();