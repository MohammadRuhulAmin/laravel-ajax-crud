<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel & Ajax Crud Application</title>
        <meta name="csrf-token" content="{{csrf_token()}}">
        <!-- Fonts -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

        <!-- Styles -->
       
    </head>
    <body class="antialiased">
        <h1>Laravel & Ajax Crud Application </h1>
        <header class="mt-5 mb-5">
            <div class="container">
                <div class="row">
                    <h1>Task Management System </h1>
                </div>
            </div>
        </header>
        <section class="body">
            <div class="container">
                <div class="row">
                    <col-12>
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center   ">
                                <h2>All Task</h2>
                                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#createTask">Create Task</a>
                            </div>
                            <card-body>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Task Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="taskTableBody">
                                        @foreach($tasks as $task)
                                        <tr data-id="{{$task->id}}">
                                            
                                            <td>{{$task->id}}</td>
                                            <td>{{$task->name}} </td>
                                            <td>
                                                <a href="#" data-toggle="modal" data-target="#editTask" class="btn btn-primary edit">Edit</a>
                                                <a href="" class="btn btn-danger" >Delete</a>
                                            </td>
                                           
                                            
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </card-body>
                        </div>
                    </col-12>
                </div>
            </div>
        </section>

    <!-- Create Modal -->
  <div class="modal fade" id="createTask" tabindex="-1" role="dialog" aria-labelledby="createTaskTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
          <form id="createTaskForm">
            <div class="modal-header">
            <h5 class="modal-title" id="createTaskTitle">Create Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <div id="createTaskMessage"></div>
                <div class="form-group">
                    <label for="">Enter task name</label>
                    <input type="text" class="form-control" name="name" placeholder="Enter task name">
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success">Create Task</button>
            </div>
        </form>
      </div>
    
    </div>
  </div>

{{-- Edit Modal --}}
  <div class="modal fade" id="editTask" tabindex="-1" role="dialog" aria-labelledby="createTaskTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
          <form id="EditTaskFrom">
            <div class="modal-header">
            <h5 class="modal-title" id="EditTaskTitle">Edit Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <div id="editTaskMessage"></div>
                <div class="form-group">
                    <label for="">Edit task name</label>
                    <input type="text" class="form-control" id="editInput" name="name" placeholder="Edit  task name">
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success">Update Task</button>
            </div>
        </form>
      </div>
    
    </div>
  </div>


  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  {{-- <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script> --}}
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="{{ asset('js') }}/main.js"></script>

    </body>
</html>
