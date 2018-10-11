

$(function () {
  
 console.log();
 
 $('#loginBtn').click(function () {
    var username = $('#username').val().trim()
    var password = $('#password').val().trim()

    if(username == '') {
      mui.toast('请输入用户名')
      return
    } 
    if(password == '') {
      mui.toast('请输入密码')
      return
    }

    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      dataType:'json',
      success: function ( info ) {
        console.log(info);
        if(info.error === 403) {
          mui.toast('用户名或密码错误')
        }
        if(info.success){
          // history.back()
          if(location.search.indexOf('retURrl') != -1) {
            // 存在retURrl
            var url = location.search.replace('?retURrl=','')
            console.log(url);
            location.href = url
          }else {
            location.href = 'user.html'
          }
        }
      }
    })



 })


})