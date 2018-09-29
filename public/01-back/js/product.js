

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
 
  // 获取所有的二级分类列表

  $('#add').click(function () {
    $.ajax({
      url:'/category/querySecondCategoryPaging',
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
    var txt = $(this).text()
    $('#categoryTxt').text(txt);
    var id = $(this).data('id')
    $('[name="brandId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  })


  // 文件上传
var arr = []
  $("#file").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      arr.unshift(data.result)
      var picAddr = data.result.picAddr
      $('#img_box').prepend('<img src='+picAddr+' width=100px>');
      if(arr.length >3) {
         arr.pop();
         $('#img_box img:last-child').remove()
      }
      if(arr.length == 3) {
        $('#form').data('bootstrapValidator').updateStatus('img','VALID')        
      }
    },
    
    
});


// 校验
$('#form').bootstrapValidator({
  excluded: [],
  // 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    brandId:{
      validators:{
        notEmpty:{
          message:'请选择二级分类'
        }
      }
    },
    proName:{
      validators:{
        notEmpty:{
          message:'请输入商品名称'
        }
      }
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:'请输入商品描述'
        }
      }
    },
    num:{
      validators:{
        notEmpty:{
          message:'请输入商品库存'
        }
      }
    },
    size:{
      validators:{
        notEmpty:{
          message:'请输入商品尺寸'
        },
        //正则校验
        regexp: {
          regexp: /^[0-9]{2}-[0-9]{2}$/,
          message: '尺寸格式必须为20-30'
        }
      }
    },
    oldPrice:{
      validators:{
        notEmpty:{
          message:'请输入商品原价'
        }
      }
    },
    price:{
      validators:{
        notEmpty:{
          message:'请输入商品现价'
        }
      }
    },
    img:{
      validators:{
        notEmpty:{
          message:'请选择三张照片'
        }
      }
    }
  }
})


function getData(arr) {
  var str = ''
  arr.forEach(function (v,i) {
    for(var k in v) {
     str += `&${k}${i+1}=${v[k]}`
     
    }
  })
  return str
}
 
$('#form').on('success.form.bv',function (e) {
  var dataStr =  getData(arr)
  dataStr = $('#form').serialize()+ dataStr 
  console.log(dataStr);
  
  e.preventDefault();
  $.ajax({
    url:'/product/addProduct',
    type:'post',
    data:dataStr,
    dataType:'json',
    success: function ( info ) {
      if(info.success){
        $('#myModal').modal('hide');
        currentPage = 1
        reader();
        $('#form').data('bootstrapValidator').resetForm(true);
        $('#categoryTxt').text('请输入二级分类');
        $('#img_box').empty()
      }

    }
  })
})


})