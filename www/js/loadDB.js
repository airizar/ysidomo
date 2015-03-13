angular.module('starter.loadDB', [])
    .factory('data', [function() {
        var loadDeviceData = function(success) {
            $.getJSON("json/deviceData.json", function(deviceData) {
                success(deviceData);
            });
        };
        var loadRoomsData = function(success) {
            $.getJSON("json/roomData.json", function(roomData) {
                success(roomData);
            });
        };

        return {
            loadDeviceData: loadDeviceData,
            loadRoomsData: loadRoomsData

        };
    }]);
