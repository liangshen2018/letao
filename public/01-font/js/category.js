
$(function () {
  
  $.ajax({
    url: "/category/queryTopCategory",
    dataType:'json',
    success: function ( info ) {
      console.log(info);
      $('.main_nav').html(template('navTmp',info))
      console.log($('.main_nav').find('a'));
      $('.main_nav').find('a').eq(0).trigger('click')
    }   
  })

  $('.main_nav').on('click','a',function () {
    $(this).addClass('current')
    $(this).parent().siblings().children('a').removeClass('current')
    var id = $(this).data('id');
    
    $.ajax({
      url:'/category/querySecondCategory',
      data:{id:id},
      dataType:'json',
      success: function ( info ) {
        console.log(info);
        $('#right_content').html(template('contentTmp',info))
      }
    })
  })

})