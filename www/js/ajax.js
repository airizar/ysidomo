angular.module('starter.ajax', [])
    .factory('ajax', function() {
        var loadDeviceData = function(success) {
            $.getJSON("json/deviceData.json", {}, function(deviceData) {
                success(deviceData);
            });
        };

        var loadRoomsData = function(success) {
            $.getJSON("json/roomData.json", {}, function(roomData) {
                success(roomData);
            });
        };

        return {
            loadDeviceData: loadDeviceData,
            loadRoomsData: loadRoomsData

        };
    });
    /***********************************************************/
    /**ESTO HAY QUE PONERLO EN LUGAR DE LOS PUTS DE DB.JS*******/
    /**HABRA QUE AÑADIR EN APP LAS LLAMADAS A ESTAS FUNCIONES
    /**DB.ADDDEVICES**///////////////////////////////////////////
/*r addDevices = function(devices) {
    db.onReady(function(e) {
        for (var i = devices.length - 1; i >= 0; i--) {
            db.put('devices', devices[i]);
        }
    });
};
var addRooms = function(rooms) {
    db.onReady(function(e) {
        for (var i = rooms.length - 1; i >= 0; i--) {
            db.put('rooms', rooms[i]);
        }
    });
};*/
