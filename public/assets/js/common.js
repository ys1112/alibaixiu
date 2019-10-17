$('#logout').on('click', function () {
    var isConfirm = confirm('确认退出？');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function (response) {
                location.href = 'login.html'
            }
        })
    };

})