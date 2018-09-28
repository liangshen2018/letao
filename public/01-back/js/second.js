
$(function () {
  
  // 图片本地预览

  $('#file').change(function () {
    console.log($(this)[0]);
    
    var file  = $(this)[0].files[0]
    var fr = new FileReader();
    fr.readAsDataURL(file)    
    fr.onload = function () {
      var res = fr.result
      
      $('.img_box img').attr('src',res)
    }
  })

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
 


})