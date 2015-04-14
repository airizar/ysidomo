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

        db.clear(['devices','rooms','warnings']);


        var addDevices = function(devices) {

            db.onReady(function(e) {

                db.put('devices', devices).done(function() {
                    console.log(devices.length + ' sensores insertados');
                    var event = new Event('changeDevices');
                    this.dispatchEvent(event);
                });
            });
        };


        var addRooms = function(rooms) {
            db.onReady(function(e) {
                    db.put('rooms', rooms).done(function() {
                        console.log(rooms.length + ' habitaciones insertadas');
                    });
            });
        };

        var addWarnings = function(warnings) {
            db.onReady(function(e) {
                db.put('warnings', warnings).done(function() {
                    console.log(warnings.length + ' warnings insertados');
                    var event = new Event('changeWarnings');
                    this.dispatchEvent(event);
                });
            });
        };

        var getRooms = function(success) {
            db.onReady(db.from('rooms').list().done(function(records) {
                //Se nos habia perdido la llamada a success por ahi
                console.log('Listing rooms...');
                success(records);
            }).fail(function() {
                console.log('No rooms');
            }));
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

        var getDevicesWithoutRoom = function(success) {
            room="";
                db.from('devices').where('room', '=', room).list().done(function(records) {
                    success(records);
                });
            };

        var notifyWarnings = function() {
            for (var i = 0; i < observers.length; i++) {
                observers[i].notify();
            }
        };
 
         var setRoom=function(device,roomName){
            
        
            db.from('devices', '=', device.id).patch({'room': roomName});
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
            getDevicesWithoutRoom:getDevicesWithoutRoom,
            setRoom:setRoom,
            observeWarnings: observeWarnings,
            notifyWarnings: notifyWarnings
        };
    });
