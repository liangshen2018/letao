// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.querySelector('.lt_content .echarts_1'));

// 指定图表的配置项和数据
var option1 = {
  color:["lime"],
  title: {
    text: '2017年注册人数'
  },
  tooltip: {},
  legend: {
    data: ['人数']
  },
  xAxis: {
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20, 10]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);


// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.querySelector('.lt_content .echarts_2'));

// 指定图表的配置项和数据
var option2 =  {
  color:["lime","pink","orange","yellow","skyblue"],
  
  title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'right',
      data: ['耐克','新百伦','阿迪','李宁','李宁王']
  },
  series : [
      {
          name: '品牌特惠',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'耐克'},
              {value:310, name:'新百伦'},
              {value:234, name:'阿迪'},
              {value:135, name:'李宁'},
              {value:1548, name:'李宁王'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);