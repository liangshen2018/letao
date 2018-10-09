

$(function () {

  // 获取本地数据
  function getHistory() {
    var str = localStorage.getItem('search_list')||'[]';
    var arr = JSON.parse(str)
    return arr
  }
  // 搜索添加历史

$('.btn_add').click(function () {
  var str = $('.search_input').val().trim()
  if(str == ''){
    mui.toast('请输入商品信息哦')
    return;
  }
 
  var arr = getHistory()
  var index = arr.indexOf(str)
// 删除重复项
  if(index != -1) {
    arr.splice(index,1)
  }

  // 不能超过10个
  if(arr.length >= 10) {
    arr.pop()
  }
  arr.unshift(str)
  
  localStorage.setItem('search_list',JSON.stringify(arr))
  
  
  $('.search_input').val('');

  location.href = 'searchList.html?key='+str
})

})

$(function () {
  
  // 一进入页面从地址栏中获取搜索名称，进行渲染数据
  
  var proName = decodeURI(location.search ).slice(1).split('=')[1]
  console.log(proName);
  
  $.ajax({
    url:'/product/queryProduct',
    data:{
      proName:proName,
      page:1,
      pageSize:100,
      
    },
    dataType:'json',
    success: function ( info ) {
      console.log(info);
      $('#product_content').html(template('proTmp',info))
    }
  })


})