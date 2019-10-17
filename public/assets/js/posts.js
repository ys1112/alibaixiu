$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);

        var html = template('postsTpl', response)
        $('#postsBox').html(html);
    }
})
//处理时间
function dateFormat(date) {
    date = new Date(date)
    return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
}

// 分页实现

