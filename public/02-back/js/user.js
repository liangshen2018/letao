


$(function () {
  
  var currentPage = 1
  var pageSize = 5

  reader()
  function reader ( ) {
    $.ajax({
       url:'/user/queryUser',
       dataType: 'json',
       data:{page:currentPage,pageSize:pageSize},
       success: function (info ) {
         console.log(info);
         $('tbody').html(template('tmp',info));
         $("#pagintor").bootstrapPaginator({
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


  // 启用禁用
  $('tbody').on('click','.btn',function () {
    $('#usermodal').modal('show');
    var id = $(this).parent().data('id')
    var isDelete = $(this).hasClass('btn-danger') ? 0 : 1

    $('#confirm').click(function () {
      $.ajax({
        url:'/user/updateUser',
        type: 'post',
        data:{
          id:id,
          isDelete:isDelete
        },
        success: function ( info ) {

          $('#usermodal').modal('hide');
          
          reader()          
        }
      })
    })
  })



})