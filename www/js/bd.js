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
        db.onReady(function(e){
        	db.put('devices', {
	            name: 'Luz',
	            room: 'Sala',
	            type: 'binario',
	            status: true
	        });
	        db.put('devices', {
	            name: 'Persiana',
	            room: 'Sala',
	            type: 'decimal',
	            status: 10
	        });
	        db.put('devices', {
	            name: 'Televisión',
	            room: 'Sala',
	            type: 'binario',
	            status: false
	        });
	        db.put('devices', {
	            name: 'Luz',
	            room: 'Baño',
	            type: 'binario',
	            status: true
	        });
	        db.put('devices', {
	            name: 'Persiana',
	            room: 'Baño',
	            type: 'decimal',
	            status: 10
	        });
	        db.put('devices', {
	            name: 'Grifo',
	            room: 'Baño',
	            type: 'decimal',
	            status: 50
	        });

	        db.put('rooms', {
	            name: 'Sala'
	        });
	        db.put('rooms', {
	            name: 'Baño'
	        });

	        db.put('warnings', {
	            sensor: "Grifo",
	            room: "baño",
	            caudal: "50"
	        }).done(function(){
	        	notifyWarnings();
	        });

	        setTimeout(function(){
	        	db.put('warnings', {
		            sensor: "Grifo",
		            room: "baño",
		            caudal: "50"
		        }).done(function(){
		        	notifyWarnings();
		        });
	        }, 5000);
        });
        

/*

        var devices = [{
            id: 0,
            name: 'Luz',
            room: 'Sala',
            type: 'binario',
            status: true
        }, {
            id: 1,
            name: 'Persiana',
            room: 'Sala',
            type: 'decimal',
            status: 10
        }, {
            id: 2,
            name: 'Televisión',
            room: 'Sala',
            type: 'binario',
            status: false
        }, {
            id: 5,
            name: 'Luz',
            room: 'Baño',
            type: 'decimal',
            status: true
        }, {
            id: 6,
            name: 'Persiana',
            room: 'Baño',
            type: 'decimal',
            status: 10
        }];
*/
        var getRooms = function(success) {
            db.from('rooms').list().done(function(records) {
                //Se nos habia perdido la llamada a success por ahi
                //console.log(records);
                success(records);
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

        return {
            getRooms: getRooms,
            getWarnings: getWarnings,
            getRoomDevices: getRoomDevices,
            observeWarnings : observeWarnings,
            notifyWarnings : notifyWarnings
        };


    });
/*
.factory('Rooms', function () {


		var getAll = function(success){
			db.from('rooms').list().done(function(records){
					console.log(records);
				});
		};
	
		return {
			getAll : getAll
				//return rooms;
			};
	});
*/
