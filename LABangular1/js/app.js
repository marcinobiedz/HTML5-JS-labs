var myApp = angular.module('myApp', []);

var con = myApp.controller('myController', ['$scope', function($scope) {
    $scope.dirMsg = 'Click here to see the task!';

    $scope.showTask = function(task){
      $scope.dirMsg=task.dscr;
    };

  }])
  .directive('myTask', function() {
    return {
      templateUrl: 'my-task.html'
    };
  });

var myAppCtrl = myApp.controller('myAppCtrl', ['$scope',
  function($scope) {
    $scope.tasks = [{
      "dscr": "Go to store",
      "status": "Done"
    }, {
      "dscr": "Buy pasta, tomatoes, meat and spices",
      "status": "In progress"
    }, {
      "dscr": "Cook spaghetti",
      "status": "To do"
    }];

    $scope.getClass = function(task) {
      var taskClass = "";
      switch (task.status) {
        case "To do":
          taskClass = "btn-danger";
          break;
        case "In progress":
          taskClass = "btn-warning";
          break;
        default:
          taskClass = "btn-success";
      }
      return taskClass;
    };

    $scope.countOpenTasks = function() {
      var openTasks = 0;
      for (i = 0; i < $scope.tasks.length; i++) {
        if ($scope.tasks[i].status == "In progress" || $scope.tasks[i].status == "To do") {
          openTasks++;
        }
      }
      return openTasks;
    };

    $scope.changeStatus = function(task, status) {
      task.status = status;
    };

    $scope.newTask = function() {
      var task = {
        "dscr": $scope.newDscr,
        "status": "To do"
      };
      if (!(task.dscr == null || task.dscr == "")) {
        $scope.tasks.push(task);
        $scope.newDscr = "";
      }
    };
  }
]);
