
$(function () {
  


  // 数据渲染
  var currentPage = 1;
  var pageSize = 5
  
  reader()
  function reader() {
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success: function (info) {
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
 
  $('#add').click(function () {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      dataType:'json',
      data:{
        page:1,
        pageSize:100
      },
      success: function ( info ) {
        console.log(info);
        $('.dropdown-menu').html(template('addtmp',info))
      }
    })
  })

  $('.dropdown-menu').on('click','a',function () {
    var txt = $(this).text()
    $('#btnTxt').text(txt)
    var id = $(this).data('id')
    $('[name="categoryId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })
 


  // 文件上传

  $('#file').fileupload({
    dataType:'json',
    done:function (e,data ) {
      var url = data.result.picAddr
      $('.img_box img').attr('src',url)

      $('[name="brandLogo"]').val(url)

      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
      
    }
  })

  $('#form').bootstrapValidator({
    excluded: [],
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请选择图片'
          }
        }
      }
    }
  })


  // 注册校验成功事件
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      dataType:'json',
      success: function (info ) {
        if(info.success){
           $('#myModal').modal('hide')
           currentPage = 1
           reader();
           $('#form').data('bootstrapValidator').resetForm(true)
           $('#btnTxt').text('请输入一级分类');
           $('.img_box img').attr('src','./images/none.png')
        }
      }
    })
  })

})