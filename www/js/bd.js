angular.module('starter.DB', [])
    .factory('BD', function() {

        var observers = [];

        schema = {
            stores: [{
                name: 'devices', // required. object store name or TABLE name
                keyPath: 'id', // keyPath.
                autoIncrement: true, // if true, key will be automatically created
                indexes: [{
                    name: 'name'
                }, {
                    name: 'room'
                }, {
                    name: 'type'
                }]
            }, {
                name: 'rooms',
                keyPath: 'id',
                autoIncrement: true,
                indexes: [{
                    name: 'name', // usually omitted. generally same as keyPath.
                }]
            }, {
                name: 'warnings',
                keyPath: 'id',
                autoIncrement: true
            }]
        };

        var db = new ydn.db.Storage('ysidomo', schema);



        var addDevices = function(devices) {
            db.onReady(function(e) {
                for (var i = devices.length - 1; i >= 0; i--) {z
                    db.put('devices', devices[i]).done(function() {
                        console.log(devices.length + ' sensores insertados');
                    });
                };
            });
        };


        var addRooms = function(rooms) {
            db.onReady(function(e) {
                for (var i = rooms.length - 1; i >= 0; i--) {
                    db.put('rooms', rooms[i]).done(function() {
                        console.log(rooms.length+' habitaciones insertadas');
                    });
                };
            });
        };

        var addWarnings = function(warnings) {
            db.onReady(function(e) {
                for (var i = warnings.length - 1; i >= 0; i--) {
                    db.put('warnings', warnings[i]).done(function() {
                        console.log(warnings.length + ' warnings insertados');
                    });
                };
            });
        };

        var getRooms = function(success) {
            db.from('rooms').list().done(function(records) {
                //Se nos habia perdido la llamada a success por ahi
                console.log('Listing rooms...');
                success(records);
            }).fail(function() {
                console.log('No rooms');
            });
        };

        var getWarnings = function(success) {
            db.from('warnings').list().done(function(records) {
                //Se nos habia perdido la llamada a success por ahi
                success(records);
            });
        };

        var getRoomDevices = function(room, success) {
            if (room) {

                db.from('devices').where('room', '=', room).list().done(function(records) {
                    success(records);
                });
            } else {
                db.from('devices').list().done(function(records) {
                    success(records);
                });
            }
        };

        var notifyWarnings = function() {
            for (var i = 0; i < observers.length; i++) {
                observers[i].notify();
            }
        };

        var observeWarnings = function(observer) {
            observers.push(observer);
        };
/*
        setInterval(function(){
            var event = new Event('newWarning');
            event.data={
                sensor: "Luz",
                room: "Sala",
                alert: "encendida",
                status: true
            }
            this.dispatchEvent(event);
            console.log("newWarning lanzado");
        },10000);
*/
        return {
            addWarnings: addWarnings,
            addDevices: addDevices,
            addRooms: addRooms,
            getRooms: getRooms,
            getWarnings: getWarnings,
            getRoomDevices: getRoomDevices,
            observeWarnings: observeWarnings,
            notifyWarnings: notifyWarnings
        };
    });