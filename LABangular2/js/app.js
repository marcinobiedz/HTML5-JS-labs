

var todoApp = angular.module("todoApp", []);

todoApp.controller("todoController", function ($scope) {

    $scope.todos = [];
    $scope.newTodoText = "";
    $scope.filter = null;

    $scope.addTodo = function addTodo() {
        $scope.todos.push({
            text: $scope.newTodoText,
            status: "todo"
        });

        $scope.newTodoText = "";
    };

    $scope.filterSelected = function filterSelected(todo) {
        return !$scope.filter || todo.status === $scope.filter;
    };
});

todoApp.directive("statusDropdown", function () {
    return {
        templateUrl: "templates/statusDropdown.html",
        // Note that this directive would still work even without passing arguments.
        scope: {
            todo: "=item"
        }
    };
});

todoApp.directive("spoiler", function () {
    return {
        scope: {
            show: "=spoiler"
        },
        link: function (scope, element, attrs) {
            element.addClass("ng-hide");

            var showButton = $("<button class='btn btn-danger'>Show Me</button>");
            element.after(showButton);

            showButton.on("click", function () {
                element.removeClass("ng-hide");
                showButton.remove();
            });
        }
    };
});
