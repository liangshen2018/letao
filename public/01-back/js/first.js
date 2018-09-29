

$(function () {
  
  var currentPage = 1

  var pageSize = 5
  
  reader()

  function reader () {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      dataType:'json',
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      success: function(info) {
        console.log(info);
        $('tbody').html(template('tmp',info))

        //  渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages: Math.ceil(info.total / pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page 
            reader()
          }
        })
      }
    })
  }



  // 一级分类表单校验
  
  $('#form').bootstrapValidator({

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName: {
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      }
    }
  })

  // 添加分类请求

  $('#form').on('success.form.bv',function () {
    $.ajax({
      url:'/category/addTopCategory',
      type: 'post',
      data:$('#form').serialize(),
      success: function ( info ) {
         if(info.success) {
           $('#myModal').modal('hide')
           currentPage = 1
           reader();
           $('#form').data('bootstrapValidator').resetForm(true)
         }        
      }
    })
  })
  
  

  
})