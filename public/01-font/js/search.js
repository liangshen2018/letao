

$(function () {


  // 获取本地数据
  function getHistory() {
    var str = localStorage.getItem('search_list')||'[]';
    var arr = JSON.parse(str)
    return arr
  }
 

 function render () {
   var arr = getHistory();
   
   $('.lt_history').html(template('historyTmp',{arr:arr}))
 }
// 渲染
render()

// 清空所有
$('.lt_history').on('click','.del_all',function () {
  
  mui.confirm('你确定要清空历史嘛','温馨提示',['取消','确定'],function (e ) {
    console.log(e);
    if(e.index == 1) {
      localStorage.removeItem('search_list')
      render()
    }
  })

})

// 清除单个

$('.lt_history').on('click','.icon_del',function () {
  var index = $(this).data('index')
  console.log(index);
  var arr = getHistory()
  arr.splice(index,1)
  localStorage.setItem('search_list',JSON.stringify(arr))
  render();
})

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
  
  render()
  
  $('.search_input').val('');

  location.href = 'searchList.html?key='+str
})




})