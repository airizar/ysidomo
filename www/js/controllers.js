angular.module('starter.controllers', [])

////////////////////////////////
.controller('DevicesCtrl', ["$scope", "BD", "$stateParams", function($scope, BD, $stateParams) {
    var rooms;
    var success = function(rooms) {

        var success1 = function(roomDevices) {
            $scope.devices.push({
                //estabamos añadiendo un objeto entero y no el name
                name: roomDevices[0].room,
                devices: roomDevices
            });
        };

        $scope.devices = [];
        for (var i = rooms.length - 1; i >= 0; i--) {

            BD.getRoomDevices(rooms[i].name, success1);

        }
    };
    BD.getRooms(success);
}])

.controller('WarningsCtrl', ["$scope", "BD", function($scope, BD) {
    //$scope.friends = Friends.all();

    var notify = function(warnings) {
        BD.getWarnings(function(warnings){
          for(var i=0; i<warnings.length; i++){
          var warning = warnings[i];           
            $scope.warnings.push({
                //estabamos añadiendo un objeto entero y no el name
                sensor:  warning.sensor +" - " + warning.room,
                wrnMsg: warning.alert + " - " + warning.status
            });
          }
            
            console.log(warnings.length);
            $scope.numWarnings = warnings.length;
        });
        
    };
    $scope.warnings = [];
    BD.observeWarnings({
        notify : notify
    });
}])

.controller('ActionsCtrl', ["$scope", "$stateParams", function($scope, $stateParams) {
        // $scope.friend = Friends.get($stateParams.friendId);
    }])
    ///////////////////////////////

;
