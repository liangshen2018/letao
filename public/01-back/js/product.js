

$(function () {
  
  var currentPage = 1
  var pageSize = 5
  
  reader()
  function reader () {
    $.ajax({
      url:'/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize:pageSize
      },
      dataType: 'json',
      success: function (info ) {
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