$(function () {
  // 添加校验功能

  $('#form').bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名2-6位'
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不为空"
          },
          stringLength: {
            min: 6,
            max: 16,
            message: "密码必须为6-16位"
          },
          callback: {
            message:"密码错误"
          }
        }
      }
    }
  })

  $('[type=reset]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
  })
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault()
    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      data:$('#form').serialize(),
      dataType: "json",
      success : function (info) {
        if(info.success) {
           location.href = "index.html"
        }

        if(info.error == 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          
        }

        if(info.error == 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          
        }


        
      }
    })    
  })
})