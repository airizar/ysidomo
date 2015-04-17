angular.module('starter.ajax', [])
    .factory('ajax', function() {
        var loadDevicesData = function(success) {
            $.getJSON("json/deviceData.json", {}, function(deviceData) {
                success(deviceData);
            });
        };

        var loadRoomsData = function(success) {
            $.getJSON("json/roomData.json", {}, function(roomData) {
                success(roomData);
            });
        };

        var loadWarningsData = function(success) {
            $.getJSON("json/warningData.json", {}, function(warningData) {
                success(warningData);
            });
        };

        var loadActionsData = function(success) {
            $.getJSON("json/actionData.json", {}, function(actionsData) {
                console.log("GVcuijgkjbkgivkljbkljhkigb");
                success(actionsData);
            });
        };

        return {
            loadDevicesData: loadDevicesData,
            loadRoomsData: loadRoomsData,
            loadWarningsData: loadWarningsData,
            loadActionsData: loadActionsData
        };
    });
    