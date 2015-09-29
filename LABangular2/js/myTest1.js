describe('todoController', function() {
  beforeEach(module('todoApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.addTodo', function() {
    it('Test checks whether new task is added to list', function() {
      var $scope = {};
      var controller = $controller('todoController', {
        $scope: $scope
      });
      var currentTasks = $scope.todos.length;

      $scope.newTodoText = 'TestTask';
      $scope.addTodo();
      
      var newTaskCount = $scope.todos.length;
      expect(newTaskCount).toEqual(currentTasks + 1);
    });
  });
});
