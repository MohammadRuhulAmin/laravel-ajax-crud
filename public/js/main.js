$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
    }
});


//create task js file

$('#createTaskForm').submit(function(e){
    e.preventDefault();
    let msg = $('#createTaskMessage');
    let input = $('#createTaskForm input[name="name"]');
    let formData = {
        name: $(input).val()
    }
    

   
    $.ajax({
       type:'POST',
       url: '/task/store',
       data:formData,
       success:function(data){
        $(msg).html('');
           $(msg).append('<div class="alert alert-success">Task Created Successfully</div>');
           $(input).val('');
           $('#taskTableBody').prepend(`
           <tr data-id="`+data.id+`">                               
           <td>`+data.id +`</td>
           <td>`+data.name+` </td>
           <td>
           <a href="#" data-toggle="modal" data-target="#editTask" class="btn btn-primary edit">Edit</a>
           <a href="#" data-toggle="modal" data-target="#deleteTask" class="btn btn-danger delete" >Delete</a>
           </td>
       </tr>
           `);
       },
       error:function(error){
          $(msg).html('');
          $(msg).append('<ul id="errorMessage" class="alert-danger"></ul>')
         $.each(error.responseJSON.errors,function(index,value){
            $(msg).find('#errorMessage').append(`<li>The Field Is Required</li>`)
         });
       }
    });
    
});

//Edit Task 
$(document).on('click','.edit',function(){
    let task = $(this).closest('tr').data('id');
    let modal = $('#editTaskFrom');
   $.ajax({
    type:'GET',
    url:'task/edit/'+task,
    success:function(data){
       $(modal).find('#editInput').val(data.name);
       $(modal).attr('data-id',data.id);
    },
    error:function(data){
        console.log(error);
    }
   });
});


// update task 
$('#editTaskFrom').submit(function(e){
    e.preventDefault();
   
    let msg = $('#editTaskMessage');
    let id = $('#editTaskFrom').data('id');
    let input = $('#editTaskFrom #editInput');
    let formData = {
        name: $(input).val()
    }
    

   
    $.ajax({
       type:'POST',
       url: '/task/update/'+id,
       data:formData,
       success:function(data){
        $(msg).html('');
        $(msg).append('<div class="alert alert-success">Task Updated Successfully</div>');
        $(input).val('');
           //append result 
           let taskRow = $('#taskTableBody').find('tr[data-id="'+id+'"]');
           $(taskRow).find('td.task-name').text(data.name);
       },
       error:function(error){
          $(msg).html('');
          $(msg).append('<ul id="errorMessage" class="alert-danger"></ul>')
         $.each(error.responseJSON.errors,function(index,value){
            $(msg).find('#errorMessage').append(`<li>The Field Is Required</li>`)
         });
       }
    });
});


// Delete Task

$(document).on('click','.delete',function(){
    let task = $(this).closest('tr').data('id');
    let modal = $('#deleteTaskFrom');
    $(modal).attr('data-id',task);
});

$('#deleteTaskFrom').submit(function(e){
    e.preventDefault();
   
    let msg = $('#deleteTaskMessage');
    let id = $('#deleteTaskFrom').data('id');
  
   
    $.ajax({
       type:'POST',
       url: '/task/delete/'+id,
       success:function(data){
        $(msg).html('');
            $('#deleteTaskFrom').find('h4').remove();
            $('#deleteTaskFrom').find('button[type="submit"]').remove();
            $(msg).append('<div class="alert alert-success">Task Has been Deleted Successfully</div>');
            let taskRow = $('#taskTableBody').find('tr[data-id="'+id+'"');
            $(taskRow).remove();
        },
       error:function(error){
        
       }
    });
});

//Modals set to Default

//Create Modals set to Default
$('#createTask').on('hidden.bs.modal',function(e){
    $('#createTaskFrom').find('#createTaskMessage').html('');
});

//Edit Modals set to Default
$('#editTask').on('hidden.bs.modal',function(e){
   
    $('#editTaskFrom').find('#editTaskMessage').html('');
});

//Delete Modals set to Default
$('#deleteTask').on('hidden.bs.modal',function(e){
    modal = $('#deleteTaskFrom');
    $('deleteTaskFrom').find('#deleteTaskMessage').html('');
    $(modal).find('.modal-body').html('').append(` <div id="deleteTaskMessage"></div>
    <h4>Are You Sure to Delete This??</h4>`);
    $(modal).find('modal-footer').html('').append(` <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-danger">Delete Task</button>`);
});