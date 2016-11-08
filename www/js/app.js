// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('MainController', function ($scope, $timeout, ImagesFactory, $cordovaPrinter) {
    var imageUrls=[];
    $scope.imageUrl='http://placehold.it/350x350';
    $scope.takePhoto=function (imageId) {
      ImagesFactory.takePhoto().then(function (response) {
        imageUrls.push(response);
        $scope.imageLength=imageUrls.length;
        $scope.imageUrl="data:image/jpeg;base64,"+response;
      });
    };

    $scope.saveImage=function () {
      saveAsPdf.addImage(imageUrls);
      $scope.imageLength=0;
      var imageUrls=[];
    };

    $scope.print = function() {
      if($cordovaPrinter.isAvailable()) {
        $cordovaPrinter.print("http://www.nraboy.com");
      } else {
        alert("Printing is not available on device");
      }
    }

  })

  .factory('ImagesFactory', function($q ,$cordovaCamera) {

    if (window.cordova) {
      var optionsCamera = {
        quality: 70,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 800,
        targetHeight: 800,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }
    }

    return {
      takePhoto:takePhoto
    };

    function takePhoto() {
      var defer = $q.defer();
      if (window.cordova) {
        $cordovaCamera.getPicture(optionsCamera).then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.reject(err);
        });
      }
      else {
        console.log("Error");
        defer.reject();
      }
      return defer.promise;
    }
  });
