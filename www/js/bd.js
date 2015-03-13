angular.module('DB', [])
.factory('Devices', function () {

var db = new ydn.db.Storage('ysidomo');
	db.put('devices', {
		name: 'Luz',
		room: 'Sala',
		type: 'binario',
		status: true}, 0);
	db.put('devices', {
		name: 'Persiana',
		room: 'Sala',
		type: 'decimal',
		status: 10}, 1);
	db.put('devices', {
		name: 'Televisión',
		room: 'Sala',
		type: 'binario',
		status: false}, 2);
	db.put('devices', {
		name: 'Luz',
		room: 'Baño',
		type: 'binario',
		status: true}, 3);
	db.put('devices', {
		name: 'Persiana',
		room: 'Baño',
		type: 'decimal',
		status: 10}, 4);
	db.put('devices', {
		name: 'Grifo',
		room: 'Baño',
		type: 'decimal',
		status: 50}, 5);

	db.put('rooms', {
		name: 'Sala'}, 0);
	db.put('rooms', {
		name: 'Baño'}, 1);

	db.put('warnings',{sensor: "Grifo", room: "baño", caudal: "50"},0)
	
	


/*
	var devices=[{
		id: 0,
		name: 'Luz',
		room: 'Sala',
		type: 'binario',
		status: true
	},{
		id: 1,
		name: 'Persiana',
		room: 'Sala',
		type: 'decimal',
		status: 10
	},{
		id: 2,
		name: 'Televisión',
		room: 'Sala',
		type: 'binario',
		status: false
	},{
		id: 5,
		name: 'Luz',
		room: 'Baño',
		type: 'decimal',
		status: true
	},{
		id: 6,
		name: 'Persiana',
		room: 'Baño',
		type: 'decimal',
		status: 10
	}];
*/
	var getRooms = function(success){
			db.from('rooms').list().done(function(records){
					//Se nos habia perdido la llamada a success por ahi
					success(records);
				});
		};
	var getWarnings = function(success){
		db.from('warnings').list().done(function(records){
					//Se nos habia perdido la llamada a success por ahi
					success(records);
				});
	};

	return {
		getRooms: getRooms,
		getWarnings: getWarnings,
		getRoomDevices: function(room){
			var device_list=[];
			for (var i = devices.length - 1; i >= 0; i--) {
				if (devices[i].room==room){
					device_list.push(devices[i]);
				}
			}
			return device_list;
		}

	};
	

});/*
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