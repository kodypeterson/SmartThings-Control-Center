(function() {
    'use strict';

    angular
        .module('smartControl.controller')
        .controller('ReblSmartControlControllerCtrl', ReblSmartControlControllerCtrl);

    /* @ngInject */
    function ReblSmartControlControllerCtrl($timeout, $state) {
        var vm = this;
        vm.timeoutPromise = null;


        function resetTimeout() {
            if (vm.timeoutPromise !== null) {
                $timeout.cancel(vm.timeoutPromise);
            }
            vm.timeoutPromise = $timeout(redirectPhotoViewer, 20000);
        }

        function redirectPhotoViewer() {
            $state.go('photo-viewer');
        }

        resetTimeout();
    }
})();