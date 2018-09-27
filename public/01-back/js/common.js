
// 进度条功能

$(function () {
    $(document).ajaxStart(function () {
      NProgress.start()
    })

    $(document).ajaxStop(function () {
      NProgress.done();      
    })
})


$(function () {
  
  // 二级菜单显示
  $('.nav .category').click(function () {
    $('.nav .child').stop().slideToggle()    
  })

  // 隐藏侧边栏

  $('.lt_header .menu').click(function () {
    $('.lt_side').toggleClass('current')
    $('.lt_header').toggleClass('current')
    $('.lt_main').toggleClass('current')
  })


  // 点击退出显示模态框功能

  $('.lt_header .login-out').click(function () {
    $('#modal').modal('show')
  })

  $('#lgout').click(function () {

    $.ajax({
      url:'/employee/employeeLogout',
      dataType:'json',
      success: function ( info ) {
        console.log(info);
        if(info.success) {
          location.href = 'login.html'
        }
      }
    })
  })


  
})