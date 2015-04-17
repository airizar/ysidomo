angular.module('starter.controllers', [])

.controller('TabsCtrl', ["$scope", "BD", "Warnings", function($scope, DB, Warnings) {
    console.log("Loading TabsCtrl");

    var success = function(warnings) {
        for (var i = 0; i < warnings.length; i++) {
            Warnings.push(warnings[i]);
        }
        $scope.$apply(function() {
            $scope.numWarnings = Warnings.getNumWarnings();

        });
    };

    DB.getWarnings(success);

    window.addEventListener('newWarning', function(e) {
        console.log('Escuchado newWarning por TabCtrl');
        Warnings.push(e.data);
        $scope.$apply(function() {
            $scope.numWarnings = Warnings.getNumWarnings();

        });
    }, false);
    window.addEventListener('changeWarnings', function(e) {
        console.log('Escuchado changeWarning por TabCtrl');
        DB.getWarnings(success);
    }, false);


    //setTimeout(function(){console.log("cambio");
    //  $scope.$apply(function(){$scope.numWarnings++;});},10000);
}])

.controller('DevicesCtrl', ["$scope", "BD", function($scope, DB) {

    console.log("Loading DevicesCtrl");
    $scope.showHiddenClass = "ysi-hidden";
    var rooms;
    var devices;
    var success = function(rooms) {
        console.log("Success: getRooms");

        var success1 = function(roomDevices) {
            $scope.$apply(function() {
                console.log("Insertamos devices en room");
                $scope.devices.push({
                    name: roomDevices[0].room,
                    devices: roomDevices
                });
            });
        };

        $scope.devices = [];
        for (var i = rooms.length - 1; i >= 0; i--) {

            DB.getRoomDevices(rooms[i].name, success1);

        }

    };
    //DB.getRooms(success);


    /*Quitar un sensor de una habitación: en pantalla y BD*/
    $scope.showHiddenDelete = function() {
        if ($scope.showHiddenClass == 'ysi-hidden') {
            $scope.showHiddenClass = 'ysi-show';
        } else {
            $scope.showHiddenClass = 'ysi-hidden';
        }
    };
    $scope.showToggle = function(roomDevice) {
        console.log(roomDevice);
        return roomDevice.type === 'binario';
    };
    $scope.showRange = function(roomDevice) {
        console.log(roomDevice);
        return roomDevice.type === 'decimal';
    };
    $scope.showInfo = function(roomDevice) {
        console.log(roomDevice);
        return roomDevice.type === 'info';
    };


    $scope.onItemDelete = function(roomDevicesList, roomDevice) {
        alert("onItemDelete ");
        $scope.devices[$scope.devices.indexOf(roomDevicesList)].devices.splice($scope.devices[$scope.devices.indexOf(roomDevicesList)].devices.indexOf(roomDevice), 1);
        DB.deleteDeviceFromRoom(roomDevice);


    };
    window.addEventListener('changeDevices', function(e) {
        console.log('Escuchado evento changeRooms por DevicesCtrl');
        DB.getRooms(success);
    }, false);



}])

.controller('WarningsCtrl', ["$scope", "BD", "Warnings", function($scope, DB, Warnings) {
    console.log("Loading WarningsCtrl");
    /*    var notify = function(warnings) {
            DB.getWarnings(function(warnings){
              for(var i=0; i<warnings.length; i++){
              var warning = warnings[i];           
                $scope.$apply(function(){$scope.warnings.push({
                    sensor:  warning.sensor +" - " + warning.room,
                    wrnMsg: warning.alert + " - " + warning.status
                    });
                });
              }
                
                console.log(warnings.length);
               // $scope.numWarnings = warnings.length;
            });
            
        };*/
    $scope.warnings = [];
    var warnings = Warnings.getWarnings(); //[];
    // DB.getWarnings(function(warnings){
    for (var i = 0; i < warnings.length; i++) {
        var warning = warnings[i];
        //$scope.$apply(function(){
        $scope.warnings.push({
            sensor: warning.sensor + " - " + warning.room,
            wrnMsg: warning.alert + " - " + warning.status
        });
        //});
    }

    window.addEventListener('newWarning', function(e) {
        console.log('Escuchado newWarning por WarningCtrl');
        $scope.$apply(function() {
            $scope.warnings.push({
                sensor: e.data.sensor + " - " + e.data.room,
                wrnMsg: e.data.alert + " - " + e.data.status
            });
        });
    }, false);

    console.log(warnings.length);
    // $scope.numWarnings = warnings.length;
    //      });




    /* DB.observeWarnings({
         notify : notify
     });*/
}])

.controller('ActionsCtrl', ["$scope", "$stateParams", function($scope, $stateParams) {
    console.log('ActionsCtrl loaded');
    // $scope.friend = Friends.get($stateParams.friendId);
}])

.controller('DevicesSelectCtrl', ["$scope", "$stateParams", "BD", function($scope, $stateParams, DB) {
    console.log("Loading DevicesSelectCtrl ");
    $scope.roomName = $stateParams.roomName;
    $scope.devicesWithoutRoom = [];
    var devicesWithoutRoom;
    var success = function(devices) {
        console.log("Success: getRooms devicesWithoutRoom");
        $scope.devicesWithoutRoom = devices;

    };
    DB.getDevicesWithoutRoom(success);

    $scope.setRoom = function(device) {
        var success = function(result) {
            console.log("set room success: " + result);
        };
        DB.setRoom(device, $stateParams.roomName, success);
    };

}]);
