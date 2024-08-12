$(document).ready(function() {
    var getAndDisplayAllTasks = function () {
        $.ajax({
            type: 'GET', 
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1276',
            dataType: 'json',
            success: function(response, textStatus) {
                $('#todo-list').empty();
                response.tasks.forEach(function (task){
                    $('#todo-list').append('<div class="row align-items-center "><input type="checkbox" class="mark-complete col-1" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><p class="col-9 text-left mb-0 task-content">' + task.content + '</p><button class="delete btn btn-sm btn-danger col-2" data-id="' + task.id + '">Delete</button>');
                })
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    var createTask = function () {
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1276',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function (response, textStatus) {
                $('#new-task-content').val('');
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $('#create-task').on('submit', function (e){
        e.preventDefault();
        createTask();
    });

    getAndDisplayAllTasks();

    var deleteTask = function (id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1276',
            success: function (response, textStatus) {
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $(document).on('click','.delete', function() {
        deleteTask($(this).data('id'))
    });

    var markTaskComplete = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1276',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

    $(document).on('change','.mark-complete', function () {
        if (this.checked) {
            markTaskComplete($(this).data('id'));
        } else {
            markTaskActive($(this).data('id'));
        }
    });

    
    var markTaskActive = function (id) {
        $.ajax({
    type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1276',
        dataType: 'json',
        success: function (response, textStatus) {
            getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
        });
    }
});