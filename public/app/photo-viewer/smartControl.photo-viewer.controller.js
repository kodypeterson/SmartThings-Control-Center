(function() {
    'use strict';

    angular
        .module('smartControl.photoViewer')
        .controller('ReblSmartControlPhotoViewerCtrl', ReblSmartControlPhotoViewerCtrl);

    /* @ngInject */
    function ReblSmartControlPhotoViewerCtrl($http, $timeout) {
        var vm = this;

        var inAnimations = [
            'bounceIn',
            'bounceInDown',
            'bounceInLeft',
            'bounceInRight',
            'bounceInUp',
            'fadeIn',
            'fadeInDown',
            'fadeInDownBig',
            'fadeInLeft',
            'fadeInLeftBig',
            'fadeInRight',
            'fadeInRightBig',
            'fadeInUp',
            'fadeInUpBig',
            'flipInX',
            'flipInY',
            'rotateIn',
            'rotateInDownLeft',
            'rotateInDownRight',
            'rotateInUpLeft',
            'rotateInUpRight',
            'rollIn',
            'zoomIn',
            'slideInDown',
            'slideInRight',
            'slideInLeft',
            'slideInUp',
            'lightSpeedIn'

        ];
        var outAnimations = [
            'bounceOut',
            'bounceOutDown',
            'bounceOutLeft',
            'bounceOutRight',
            'bounceOutUp',
            'fadeOut',
            'fadeOutDown',
            'fadeOutDownBig',
            'fadeOutLeft',
            'fadeOutLeftBig',
            'fadeOutRight',
            'fadeOutRightBig',
            'fadeOutUp',
            'fadeOutUpBig',
            'flipOutX',
            'flipOutY',
            'rotateOut',
            'rotateOutDownLeft',
            'rotateOutDownRight',
            'rotateOutUpLeft',
            'rotateOutUpRight',
            'rollOut',
            'zoomOut',
            'slideOutDown',
            'slideOutRight',
            'slideOutLeft',
            'slideOutUp',
            'lightSpeedOut',
            'hinge'
        ];

        vm.currentAnimation = outAnimations[Math.floor(Math.random() * outAnimations.length)];

        vm.showControls = function() {

        };

        function getImage() {
            $http.get("/api/getPhoto").success(function(response){
                if (response.photo) {
                    var timeout = 0;
                    if (vm.currentAnimation) {
                        timeout = 1100;
                        vm.currentAnimation = outAnimations[Math.floor(Math.random() * outAnimations.length)];
                    }

                    $timeout(function() {
                        vm.img = response.photo.fullURL;
                        $timeout(function() {
                            vm.currentAnimation = inAnimations[Math.floor(Math.random() * inAnimations.length)];
                            $timeout(getImage, 10000);
                        }, 0);
                    }, timeout);
                } else {
                    $timeout(getImage, 500);
                }
            });
        }

        getImage();
    }
})();