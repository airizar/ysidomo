angular.module('starter.controllers', [])

////////////////////////////////
.controller('DevicesCtrl', ["$scope", /*"Rooms",*/ "Devices", "$stateParams", function($scope, /*Rooms,*/ Devices, $stateParams) {
    var rooms;
    var success = function(rooms) {
        var roomDevices = [];
        for (var i = rooms.length - 1; i >= 0; i--) {
          console.log(rooms[i]);
          console.log(rooms[i].name);
            var devices = Devices.getRoomDevices(rooms[i].name);
            roomDevices.push({
                //estabamos añadiendo un objeto entero y no el name
                name: rooms[i].name,
                devices: devices
            });
        }
        $scope.devices = roomDevices;
    };
    Devices.getRooms(success);



}])

.controller('WarningsCtrl', ["$scope", function($scope) {
    //$scope.friends = Friends.all();
}])

.controller('ActionsCtrl', ["$scope", "$stateParams", function($scope, $stateParams) {
        // $scope.friend = Friends.get($stateParams.friendId);
    }])
    ///////////////////////////////

.controller('DashCtrl', ["$scope", function($scope) {}])

.controller('ChatsCtrl', ["$scope", "Chats", function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
}])

.controller('ChatDetailCtrl', ["$scope", "$stateParams", "Chats", function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
}])

.controller('FriendsCtrl', ["$scope", "Friends", function($scope, Friends) {
    $scope.friends = Friends.all();
}])

.controller('FriendDetailCtrl', ["$scope", "$stateParams", "Friends", function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
}])

.controller('AccountCtrl', ["$scope", function($scope) {
    $scope.settings = {
        enableFriends: true
    };
}]);
