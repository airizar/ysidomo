angular.module('DB', [])
.factory('Devices', function () {
	var devices=[{
		id: 0,
		name: 'Luz',
		room: 'Sala',
		type: 'binario',
		status: 0
	},{
		id: 1,
		name: 'Luz1',
		room: 'Sala',
		type: 'decimal',
		status: 10
	},{
		id: 2,
		name: 'Luz2',
		room: 'Sala',
		type: 'binario',
		status: 1
	}];

	return {
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
	

})
.factory('Rooms', function () {
		var rooms=['Sala','Baño'];
	
		return {
			getAll : function(){
				return rooms;
			}
		};
	});
