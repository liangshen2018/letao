

$(function () {
  

  //  进入页面判断是否登入

       




   $.ajax({
     url:'/user/queryUserMessage',
     dataType:'json',
     success: function (info) {
       console.log(info);
       if(info.error == 400){
          location.href = 'login.html'
       }else {
        $('.mui-media-body').html(template('tmp',info)) 
       }
     }
   })


  // 退出功能

  $('#logout').click(function () {
     
    $.ajax({
      url:'/user/logout',
      dataType:'json',
      success: function ( info ) {
        if(info.success) {
          location.href = 'login.html'
        }
      }
    })

  })



})