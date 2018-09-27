


$(function () {
  
  // 添加进度条功能

  $(document).ajaxStart(function () {
    NProgress.start()
  }) 
  
  $(document).ajaxStop(function () {
    NProgress.done()
  })

  $('#category').click(function () {
    $('.child').stop().slideToggle()
  })


  $('.lt_main .menu').click(function () {
    $('.lt_side').toggleClass('current')
    $('.lt_main .header').toggleClass('current')
    $('.lt_main').toggleClass('current')
  })


  $('.header .login').click(function () {
    $('#logoutmodal').modal('show');
  })

  $('#login-out').click(function () {
    $.ajax({
      url:'/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if(info.success) {
          location.href = "login.html"
        }        
      }
    })
  })
})