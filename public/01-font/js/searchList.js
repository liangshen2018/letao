

$(function () {

  // 获取本地数据
  function getHistory() {
    var str = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(str)
    return arr
  }
  // 搜索添加历史

  $('.btn_add').click(function () {
    var str = $('.search_input').val().trim()
    if (str == '') {
      mui.toast('请输入商品信息哦')
      return;
    }

    var arr = getHistory()
    var index = arr.indexOf(str)
    // 删除重复项
    if (index != -1) {
      arr.splice(index, 1)
    }

    // 不能超过10个
    if (arr.length >= 10) {
      arr.pop()
    }
    arr.unshift(str)

    localStorage.setItem('search_list', JSON.stringify(arr))


    $('.search_input').val('');

    location.href = 'searchList.html?key=' + str
  })

})

$(function () {

  // 一进入页面从地址栏中获取搜索名称，进行渲染数据
  render();

  function render() {

    // var proName = decodeURI(location.search ).slice(1).split('=')[1]
    var proName = getSearch('key')
    console.log(proName);

    // price 价格排序   num 库存排序 1升序 2降序
    var data = {
      proName: proName,
      page: 1,
      pageSize: 100

    }
   

  $current = $('.lt_sort a.current')
   if($current.length > 0) {
      var key = $current.data('type');
      var value = $current.find('i').hasClass('fa-angle-down') ? 2 : 1
      data[key] = value
   }
  

    $.ajax({
      url: '/product/queryProduct',
      data: data,
      dataType: 'json',
      
      success: function (info) {
        console.log(info);
        $('#product_content').html(template('proTmp', info))
      },
      beforeSend: function () {
        $('.lt_product .loading').show()
      },
      complete: function () {
        $('.lt_product .loading').hide()       
      }
    })
  }
 
  $('.lt_sort a[data-type]').click(function () {
     
    
     if($(this).hasClass('current')){
       $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
     }else {
       $(this).addClass('current').parent().siblings().find('a').removeClass('current')
     }
   
    render()
  })
   

})