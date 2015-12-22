(function() {
    'use strict';

    angular
        .module('smartControl.photoViewer')
        .controller('ReblSmartControlPhotoViewerCtrl', ReblSmartControlPhotoViewerCtrl)
        .directive('imageonload', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind('load', function() {
                        //call the function that was passed
                        scope.$apply(attrs.imageonload);
                    });
                }
            };
        });

    /* @ngInject */
    function ReblSmartControlPhotoViewerCtrl($http, $timeout, $state) {
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
            $state.go('controller');
        };

        var forceImageTimeout = null;

        vm.imageLoaded = function() {
            $timeout.cancel(forceImageTimeout);
            vm.currentAnimation = inAnimations[Math.floor(Math.random() * inAnimations.length)];
            $timeout(getImage, 10000);
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

                        // Force New Image
                        forceImageTimeout = $timeout(getImage, 10000);
                    }, timeout);
                } else {
                    $timeout(getImage, 500);
                }
            });
        }

        getImage();
    }
})();