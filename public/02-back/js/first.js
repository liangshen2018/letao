
$(function () {
   
  //  数据渲染

  var currentPage = 1
  var pageSize = 5

  reader()

  function reader () {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
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
 
  

  // 添加分类表单校验
   
   $('#form').bootstrapValidator({
     fields:{
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
     }
   }) 
   
   $('#form').on('success.form.bv',function () {

     $.ajax({
       url:'/category/addTopCategory',
       type:'post',
       data:$('#form').serialize(),
       dataType:'json',
       success: function (info) {
         $('#myModal').modal('hide')
         
         reader()
       }
     })
     
   })
  


})