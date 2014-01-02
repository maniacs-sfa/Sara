var Sara = require('../..')
  , Todo = require('../models/todo')

Sara.Controller = require('sara-angular') // Load angular

with (Sara) var TodoController = module.exports = new Controller('Todo', function TodoController($scope) {
  var app = require('../app')

  $scope.todos = app.cache.todos
 
  $scope.addTodo = function() {
    var last = $scope.todos[$scope.todos.length - 1]
    $scope.todos.push({ title: $scope.todo.title, completed: false, id: last ? last.id + 1 : 1 })
    $scope.todo.title = ''
  }
  
  $scope.$evalAsync(function() {
    var prerendered = document.querySelectorAll("[data-prerendered]")
    for (var content = prerendered.length; content--;) {
      prerendered[content].parentNode.removeChild(prerendered[content])
    }
  })
  
  $scope.active = function() {
    var count = 0
    angular.forEach($scope.todos, function(todo) {
      count += todo.completed ? 0 : 1
    })
    return count
  }
 
  $scope.archive = function() {
    var oldTodos = $scope.todos
    $scope.todos = []
    angular.forEach(oldTodos, function(todo) {
      if (!todo.completed) $scope.todos.push(todo)
    })
  }
})