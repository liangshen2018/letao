

$(function () {
  
 var currentPage = 1
 var pageSize = 5

 reader()
 function reader() {
   $.ajax({
     url:'/category/querySecondCategoryPaging',
     dataType:'json',
     data:{
       page:currentPage,
       pageSize: pageSize
     },
     success: function (info ) {
      $('tbody').html(template('tmp',info))

      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:currentPage,//当前页
        totalPages:Math.ceil(info.total / info.size),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage = page 
          reader()
        }
      });
      
     }
   })
 }


//  点击添加分类按钮，发送ajax请求，获取一级分类列表渲染在下拉菜单中

$('#add').click(function () {
  
  $.ajax({
    url:'/category/queryTopCategoryPaging',
    data:{
      page:1,
      pageSize:100
    },
    dataType:'json',
    success: function ( info ) {
       $('.dropdown-menu').html(template('addtmp',info))      
    }
  })
})

$('.dropdown-menu').on('click','a',function () {
  var txt  = $(this).text();
  $('#cateTxt').text(txt);
  var id = $(this).data('id');
  $('[name="categoryId"]').val(id)
  $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')  
})


// 文件上传

$("#file").fileupload({
  dataType:"json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  done:function (e, data) {
    var url = data.result.picAddr
    $('#img_box img').attr('src',url)

    $('[name="brandLogo"]').val(url);
    $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
  }
});


// 表单校验

  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验id名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择图片'
          }
        }
      },
    }
  
  });


  $('#form').on('success.form.bv',function () {
     
     $.ajax({
       url:'/category/addSecondCategory',
       type:'post',
       data:$('#form').serialize(),
       dataType:'json',
       success: function ( info ) {
         $('#myModal').modal('hide')
         currentPage = 1
         reader();
         $('#form').data('bootstrapValidator').resetForm(true)
         $('#cateTxt').text('请选择一级分类')   
         $('#img_box img').attr('src','./images/none.png')     
       }
     })


  })



})
