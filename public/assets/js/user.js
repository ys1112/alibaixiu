
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        var html = template('usersTpl',{data:response}) 
        $('#usersBox').html(html)
    }
})



// 实现用户上传头像
$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();    
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        //固定写法
        //默认会传一个对象，帮我们转化为键值对形式的参数
        //现在数据上传multipart/form-data分开穿
        // 告诉浏览器不要解析
        processData:false,
        //jq默认会添加一行代码 xhr.setRequestHeader('content-type)
        contentType:false,
        data:formData,
        success:function(response){
            console.log(response);
            console.log(response[0].avatar);
                $('#preview').attr('src',response[0].avatar)
                $('#tou').val(response[0].avatar)
        }
    })
})
// 添加用户
$('#userForm').on('submit',function(){
    // 获取用户输入内容并转化为字符串serialize是jQ提供的方法，自动收集数据
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(response){
            //自动刷新页面
            location.reload();
        }
    })
    // console.log(formData);
    
    return false;
})

//编辑按钮添加事件
$('#usersBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(response){
            // console.log(response);
            var html = template('modifyTpl',response)
            $('#modifyBox').html(html)
        }
    })
})

//表单提交事件,把模板表单提交到表单盒子里
$('#modifyBox').on('submit','#modifyForm',function(){
    // 获取表单修改数据
    var formData = $(this).serialize();
    // 获取用户的id,用来上传修改数据
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(response){
            console.log(response);
            location.reload();
        }
    })
    return false;
})

//删除事件
$('#usersBox').on('click','.delete',function(){
    if(confirm('确认删除用户?')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})



//批量删除
//全选按钮
//全选按钮的改变,按钮全部改变
$('#checkAll').on('change',function(){
    var bool = $(this).prop('checked');
    var checkList = $('#usersBox input[type="checkbox"]');
    checkList.prop('checked',bool);
    if(bool == true){
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();
    }
})


//按钮全部选中时,全选按钮选中
$('#usersBox').on('change','input[type="checkbox"]',function(){
    //判断按钮是否全部选中
    if($('#usersBox input[type="checkbox"]').length == $('#usersBox input[type="checkbox"]:checked').length){
        $('#checkAll').prop('checked',true);
    }else{
        $('#checkAll').prop('checked',false);
    }
    if($('#usersBox input[type="checkbox"]:checked').length>0){
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();
    }
})

//批量删除功能实现
$('#deleteAll').on('click',function(){
    var checkList = $('#usersBox input[type="checkbox"]:checked');
    var str = '';
    checkList.each(function(index,item){
    str += $(item).attr('data-id') + '-';
    })
    str = str.substr(0,str.length-1);
    $.ajax({
        type:'delete',
        url:'/users/'+str,
        success:function(){
            location.reload();
        }
    })
})
