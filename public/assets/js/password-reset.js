//修改密码提交事件
$('#modifyForm').on('submit',function(){
    var formData = $(this).serialize();
    // if($('#old') != ){

    // }
     if($('#password') !=$('#confirm')){
        alert('两次密码不一致');
    }
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function(){
            location.href = 'login.html';
        }
    })
    //阻止表单默认行为
    return false;
})