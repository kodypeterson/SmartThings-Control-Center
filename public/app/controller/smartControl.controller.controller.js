(function() {
    'use strict';

    angular
        .module('smartControl.controller')
        .controller('ReblSmartControlControllerCtrl', ReblSmartControlControllerCtrl);

    /* @ngInject */
    function ReblSmartControlControllerCtrl($timeout, $state, $location) {
        var vm = this;
        vm.timeoutPromise = null;

        function resetTimeout() {
            if (vm.timeoutPromise !== null) {
                $timeout.cancel(vm.timeoutPromise);
            }
            if ($location.host() !== 'localhost') {
                vm.timeoutPromise = $timeout(redirectPhotoViewer, 20000);
            }
        }

        function redirectPhotoViewer() {
            $state.go('photo-viewer');
        }

        resetTimeout();
    }
})();