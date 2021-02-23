$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
    }
});




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