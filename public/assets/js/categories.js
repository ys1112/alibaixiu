$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);

        var html = template('categoriesTpl', { data: response })
        $('#categoriesBox').html(html);
    }
})

//添加表单分类
$('#addCategory').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data:formData,
        success: function () {
            location.reload();
        }
    })
    return false;
})

//编辑功能
$('#categoriesBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
        type:'get',
        url:'/categories/' +id,
        success:function(response){
            // console.log(response);
            var html = template('modifyCategoriesTpl',response);
            $('#formBox').html(html);
        }
    })
})

// 编辑保存
$('#formBox').on('submit','#modifyCategory',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/categories/' + id,
        data:formData,
        success:function(){
            location.reload();
        }
    })
})

//删除功能
$('#categoriesBox').on('click','.delete',function(){
    if(confirm('确认删除用户?')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
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
$('#categoriesBox').on('change','input[type="checkbox"]',function(){
    //判断按钮是否全部选中
    if($('#categoriesBox input[type="checkbox"]').length == $('#categoriesBox input[type="checkbox"]:checked').length){
        $('#checkAll').prop('checked',true);
    }else{
        $('#checkAll').prop('checked',false);
    }
    if($('#categoriesBox input[type="checkbox"]:checked').length>0){
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();
    }
})

//批量删除功能实现
$('#deleteAll').on('click',function(){
    var checkList = $('#categoriesBox input[type="checkbox"]:checked');
    var str = '';
    checkList.each(function(index,item){
    str += $(item).attr('data-id') + '-';
    })
    str = str.substr(0,str.length-1);
    $.ajax({
        type:'delete',
        url:'/categories/'+str,
        success:function(){
            location.reload();
        }
    })
})