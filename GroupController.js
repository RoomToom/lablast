angular.module('GroupController', []).controller('GroupController', function($scope, $http) {
    const apiUrl = "http://localhost:3000/api";

    const refreshGroups = function() {
        console.log("Refreshing groups..."); // Перевірка виклику
        $http.get(apiUrl + "/groups").then(function(response) {
            console.log("Groups received:", response.data); // Перевірка відповіді сервера
            $scope.groups = response.data;
            $scope.group = {};
        });
    };
    

    refreshGroups();

    $scope.addGroup = function() {
        if ($scope.group.name) { // Перевірка наявності значення
            $http.post(apiUrl + "/groups/add", $scope.group).then(function(response) {
                refreshGroups();
                $scope.group = {}; // Очищаємо форму після додавання
            });
        } else {
            alert("Group name cannot be empty!"); // Повідомлення, якщо поле порожнє
        }
    };

    $scope.deleteGroup = function(id) {
        $http.delete(apiUrl + "/groups/" + id).then(function(response) {
            refreshGroups();
        });
    };

    $scope.editGroup = function(group) {
        $scope.group = angular.copy(group);
        console.log($scope.group);
    };

    $scope.updateGroup = function() {
        if ($scope.group._id) {
            $http.put(apiUrl + "/groups/" + $scope.group._id, $scope.group).then(function(response) {
                refreshGroups();
                $scope.group = {}; // Очищаємо форму після оновлення
            });
        } else {
            alert("Select a group to update!");
        }
    };
});
