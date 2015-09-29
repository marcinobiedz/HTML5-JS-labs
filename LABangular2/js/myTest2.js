describe('todoController', function() {
  beforeEach(module('todoApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.addTodo', function() {
    it('Test check if the status of new task is "To Do"', function() {
      var $scope = {};
      var controller = $controller('todoController', {
        $scope: $scope
      });
      $scope.newTodoText = 'TestTask';
      $scope.addTodo();

      var countTasks = $scope.todos.length;

      var newTaskStatus = $scope.todos[countTasks - 1].status;
      var newTaskText = $scope.todos[countTasks - 1].text;
      
      expect(newTaskStatus).toEqual("todo");
      expect(newTaskText).toEqual("TestTask");
    });
  });
});
