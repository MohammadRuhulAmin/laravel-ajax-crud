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
           <tr>                               
           <td>`+data.id +`</td>
           <td>`+data.name+` </td>
           <td>
               <a href="#" class="btn btn-primary">Edit</a>
               <a href="#" class="btn btn-danger" >Delete</a>
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
           
           //append result 
           let taskRow = $('#taskTableBody').find('tr[data-id="'+id+'"]');
           $(taskRow).find('td.task-name').text(data.name);
           
           $(msg).append('<div class="alert alert-success">Task Updated Successfully</div>');
           $(input).val('');
    //        $('#taskTableBody').prepend(`
    //        <tr>                               
    //        <td>`+data.id +`</td>
    //        <td>`+data.name+` </td>
    //        <td>
    //            <a href="#" class="btn btn-primary">Edit</a>
    //            <a href="#" class="btn btn-danger" >Delete</a>
    //        </td>
    //    </tr>
    //        `);
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
