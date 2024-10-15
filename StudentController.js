angular.module('StudentController', []).controller('StudentController', function($scope, $http) {
    $scope.message = 'Welcome to the Student section!';
    const apiUrl = "http://localhost:3000/api";

    const refresh = function() {
        $http.get(apiUrl + '/students').then(function(response) {
            console.log("Students loaded:", response.data); // Лог для перевірки завантаження студентів
            $scope.students = response.data;
            $scope.student = {}; // Очищення форми після додавання студента
        }, function(error) {
            console.log("Error loading students:", error); // Лог для відстеження помилок
        });
    };
    
    
    refresh();

    $scope.addStudent = function() {
        $http.post(apiUrl + '/students/add', $scope.student).then(function(response) {
            console.log("Student added:", response.data); // Лог для перевірки
            refresh();
        }, function(error) {
            console.log("Error adding student:", error); // Лог для помилок
        });
    };
    

    $scope.delete = function(id) {
        $http.delete(apiUrl + '/students/' + id).then(function(response) {
            refresh();
        });
    };

    $scope.editStudent = function(student) {
        $scope.student = angular.copy(student); // Копіюємо дані студента у форму
    };

    $scope.updateStudent = function() {
        $http.put(apiUrl + "/students/" + $scope.student._id, $scope.student)
        .then(function(response) {
            refresh();
        });
    };
});
