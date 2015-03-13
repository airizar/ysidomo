angular.module('starter.controllers', [])

////////////////////////////////
.controller('DevicesCtrl', ["$scope", "BD", "$stateParams", function($scope, BD, $stateParams) {
    var rooms;
    var success = function(rooms) {

        var success1 = function(roomDevices) {
                 $scope.devices.push({
                    //estabamos añadiendo un objeto entero y no el name
                    name: roomDevices[0].room,
                    devices: roomDevices
                });
            };

        $scope.devices = [];
        for (var i = rooms.length - 1; i >= 0; i--) {
            
            BD.getRoomDevices(rooms[i].name, success1);

        }
    };
    BD.getRooms(success);



}])

.controller('WarningsCtrl', ["$scope", "BD", function($scope, BD) {
    //$scope.friends = Friends.all();
    
    var success = function(warnings){
      console.log(warnings);
      $scope.numWarnings = warnings.length;
    };
    BD.getWarnings(success);
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
