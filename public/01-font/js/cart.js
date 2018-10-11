


$(function () {
  

    function render() {
      $.ajax({
        url:'/cart/queryCart',
        dataType:'json',
        success: function ( info ) {
          console.log(info);
          if(info.error == 400) {
            location.href = 'login.html'
          }
          else {
            $('.mui-scroll').html(template('tmp',{list:info}))
            mui('.lt_main .mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
            
          }
        }
      });
    }
      
  //  下拉刷新初始化
    mui.init({
      pullRefresh : {
        container:".lt_main .mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
          height:50,//可选,默认50.触发下拉刷新拖动距离,
          auto: true,//可选,默认false.首次加载自动下拉刷新一次
          contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
          contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
          contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
          callback :function () {
            render()
          } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
      }
    });



  // 删除操作
  
  // mui框架 a标签 不支持click事件 使用tap


  $('.mui-scroll').on('tap','.btn_delete',function () {
    
    var id= [];
    id.push($(this).parent().data('id'))
    
    $.ajax({
      url:'/cart/deleteCart',
      data:{id:id},
      dataType:'json',
      success:function ( info ) {
        console.log(info);
        if(info.success) {
          render();
        }
      }
    })
     
  })


  // 编辑操作

  $('.mui-scroll').on('tap','.btn_edit',function () {
    
   var obj = this.dataset
  
   console.log(obj);
   
  

    htmlStr = template('tipTmp',obj)

    // 将换行去掉
    htmlStr = htmlStr.replace( /\n/g, "" );
    
    mui.confirm(htmlStr,'编辑商品',['确认','取消'],function (e) {
      if(e.index === 0) {
        console.log('确认');  
        var id = obj.id;
        var size = $('.lt_size span.current').text()
        var num =  $('.mui-numbox-input').val()
        $.ajax({
          url:'/cart/updateCart',
          type:'post',
          data:{
            id:id,
            size:size,
            num:num
          },
          dataType:'json',
          success: function ( info ) {
            render()
            
          }
          
        })
        
      }
    })

    // 数字框初始化
    mui('.mui-numbox').numbox()

    
     // 选择尺码

      $('body').on('click','.lt_size span',function () {
        console.log(1);
        
        
        $(this).addClass('current').siblings().removeClass('current')

      })

  })

  




})