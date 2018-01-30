function sortNumber(a,b){ //数组按数值排序，调用方式 arry.sort(sortNumber)
return a - b 
} 

window.onresize = function(){
rk_jiguan_Chart.resize();
rk_xingbie_Chart.resize();
rk_minzu_Chart.resize();
rk_wenhua_Chart.resize();
rk_nianling_Chart.resize();
rk_hunyin_Chart.resize();
rk_zhiye_Chart.resize();
}``````````````````````````````````

rk_jiguan_option = {	
	title: {text: "外市籍贯排行前10位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
	grid: [{x:50},],`````````````````````````````````````````````````````
	tooltip: {formatter: '{b} ({c})万' },
	xAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
	yAxis: [{gridIndex: 0, interval:0,
		data: ['南昌','九江','抚州','宜春','吉安','景德镇','赣州','衢州','鹰潭','南平'].reverse(),
		axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
  }],
	series: [{
		type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
		label:{normal:{formatter: '{c}万',show:true, position:"right",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
		data:[52.9,47.2,41.3,36.1,31.5,29.2,23.6,20.1,19.7,18.4].sort(sortNumber),
	},]
};
var rk_jiguan_Chart = echarts.init(document.getElementById('rk_jiguan'));
rk_jiguan_Chart.setOption(rk_jiguan_option);

rk_zongshu_option = {	
    title: {text: '人口数量统计',left:50,textStyle:{color:"rgba(204,204,204,.85)"}},
    tooltip: {trigger: 'axis',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},
    legend: {
    	right:10,top:0,itemGap: 16,itemWidth: 18,itemHeight: 10,
    	textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"},
    	data:['人口总数','出生人数','死亡人数','迁入人数','迁出人数',]
    },
    grid: {left: '3%', right: '4%',bottom: '10%',containLabel: true},
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2011','2012','2013','2014','2015','2016','2017'],
        axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
    		
    },
    yAxis: {
        type: 'value',
        axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
   			splitLine: {show: true,lineStyle: {color: ['rgba(155,166,198,1)'],opacity:0.1}}
    },
    series: [{
            name:'总数',
            type:'line',
            stack: '总量',
            symbolSize:5,
            symbol:'circle',
            label:{normal:{position:"right"}},
            itemStyle:{normal:{color:'rgba(146,3,238,0.85)',barBorderRadius:0,label:{show:true,position:'top',formatter:'{c}万'} }},
            data:[120, 132, 101, 134, 90, 230, 210]
        },{
            name:'出生人数',
            type:'line',
            stack: '总量',
            symbolSize:5,
            symbol:'circle',
            label:{normal:{position:"right"}},
            itemStyle:{normal:{color:'rgba(113,129,248,0.85)',barBorderRadius:0,label:{show:true,position:'top',formatter:'{c}万'} }},
            data:[220, 182, 191, 234, 290, 330, 310]
        },{
            name:'死亡人数',
            type:'line',
            stack: '总量',
            symbolSize:5,
            symbol:'circle',
            label:{normal:{position:"right"}},
            itemStyle:{normal:{color:'rgba(0,102,255,0.85)',barBorderRadius:0,label:{show:true,position:'top',formatter:'{c}万'} }},
            data:[150, 232, 201, 154, 190, 330, 410]
        },{
            name:'迁入人数',
            type:'line',
            stack: '迁出人数',
            symbolSize:5,
            symbol:'circle',
            label:{normal:{position:"right"}},
            itemStyle:{normal:{color:'rgba(0,185,96,0.85)',barBorderRadius:0,label:{show:true,position:'top',formatter:'{c}万'} }},
            data:[320, 332, 301, 334, 390, 330, 320]
        },{
            name:'迁出人数',
            type:'line',
            stack: '总量',
            symbolSize:5,
            symbol:'circle',
            label:{normal:{position:"right"}},
            itemStyle:{normal:{color:'rgba(155,166,198,0.85)',barBorderRadius:0,label:{show:true,position:'top',formatter:'{c}万'} }},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }]
};
var rk_zongshu_Chart = echarts.init(document.getElementById('rk_zongshu'));
rk_zongshu_Chart.setOption(rk_zongshu_option);

function rk_map_fun() {
		var uploadedDataURL = "js/map_shangrao.json";
    var name = 'map_shangrao';
    var rk_map_Chart = echarts.init(document.getElementById('rk_map'));
    $.getJSON(uploadedDataURL, function(geoJson) {
        echarts.registerMap(name, geoJson);
        rk_map_Chart.setOption(option = {
        		tooltip: {trigger: 'item'},
        		visualMap: {show: false,min: 0,max: 100,left: 'left',top: 'bottom',text: ['高', '低'],inRange: {color:['rgba(113,129,248,.55)','rgba(80,97,228,.55)','rgba(0,102,255,.55)','rgba(1,64,158,.55)']},calculable: true},            
  					legend: {orient: 'vertical',x:'left',},
            series: [{
            	name:'人口总数',
              type: 'map', 
              mapType: name,
              zoom:1.1,
              //roam:true,                 
              label: {normal: {formatter:'{b}\n\n{c}万',show: true,textStyle: {color: 'rgba(155,166,198,1)',fontSize: 14,fontWeight: "bold"},},emphasis: {textStyle: {color: 'rgba(204,204,204,.85)'}}},
            	itemStyle: {normal: {borderColor: 'rgba(1,34,82,.55)',},emphasis: {areaColor:'rgba(3,119,63,.55)',borderWidth: 0,shadowBlur: 20,shadowColor: 'rgba(113,129,248,0.5)',}},    
              data:[
								{value: 37.2,name: '信州区'},
								{value: 71.6,name: '上饶县'},
								{value: 80.1,name: '广丰县'},
								{value: 55.4,name: '玉山县'},
								{value: 41.3,name: '铅山县'},
								{value: 19.7,name: '横峰县'},
								{value: 36.7,name: '弋阳县'},
								{value: 89.5,name: '余干县'},
								{value: 143.9,name: '鄱阳县'},
								{value: 36.5,name: '万年县'},
								{value: 33.7,name: '婺源县'},
								{value: 30.4,name: '德兴市'},],
            }],
        });
    });
}
rk_map_fun();

rk_xingbie_option = {	
		title: {text: "性别分布",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
       	 {value: 324.3,name: '女'},
         {value: 351.7,name: '男'}
        ].reverse()
    },]
};
var rk_xingbie_Chart = echarts.init(document.getElementById('rk_xingbie'));
rk_xingbie_Chart.setOption(rk_xingbie_option);


rk_minzu_option = {	
		title: {text: "民族分布",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}{c}人',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
        	{value: 9106,name: '畲族'},
        	{value: 912,name: '苗族'},
        	{value: 890,name: '回族'},
        	{value: 797,name: '壮族'},
        	{value: 494,name: '满族'},
        	{value: 481,name: '土家族'},
        	{value: 347,name: '蒙古族'},
        	{value: 259,name: '瑶族'},
        	{value: 218,name: '侗族'},
        	{value: 215,name: '布依族'},
        ].reverse()
    },]
};
var rk_minzu_Chart = echarts.init(document.getElementById('rk_minzu'));
rk_minzu_Chart.setOption(rk_minzu_option);


rk_wenhua_option = {	
		title: {text: "文化程度分布",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
        	{value: 12.5,name: '研究生'},
        	{value: 89.1,name: '大学'},
        	{value: 75.8,name: '专科'},
        	{value: 63.5,name: '中专'},
        	{value: 57.1,name: '技校'},
        	{value: 99.9,name: '高中'},
        	{value: 136.9,name: '初中'},
        	{value: 165,name: '小学'},
        	{value: 26.2,name: '文盲半文盲'},
        ].reverse()
    },]
};
var rk_wenhua_Chart = echarts.init(document.getElementById('rk_wenhua'));
rk_wenhua_Chart.setOption(rk_wenhua_option);

rk_nianling_option = {	
		title: {text: "年龄段分布",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
        	{value: 114.5,name: '0-17'},
        	{value: 90.7,name: '18-25'},
        	{value: 93.2,name: '26-35'},
        	{value: 91.7,name: '36-45'},
        	{value: 89.2,name: '46-55'},
        	{value: 88.6,name: '56-65'},
        	{value: 108.1,name: '65岁以上'},
        ].reverse()
    },]
};
var rk_nianling_Chart = echarts.init(document.getElementById('rk_nianling'));
rk_nianling_Chart.setOption(rk_nianling_option);

rk_hunyin_option = {	
		title: {text: "婚姻状况分布",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
        	{value: 201.1,name: '未婚'},
        	{value: 329.6,name: '已婚'},
        	{value: 80.4,name: '离婚'},
        	{value: 55.9,name: '未说明'},
        ].reverse()
    },]
};
var rk_hunyin_Chart = echarts.init(document.getElementById('rk_hunyin'));
rk_hunyin_Chart.setOption(rk_hunyin_option);

rk_zhiye_option = {	
		title: {text: "职业排行前10位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
        	{value:112.8,name: '工人'},
        	{value:81.6,name: '待业'},
        	{value:79.1,name: '不详'},
        	{value:72.5,name: '退休'},
        	{value:68.1,name: '学生'},
       	 	{value:53.1,name: '织布工'},
       	 	{value:34.9,name: '机器修理工'},
       	 	{value:22.6,name: '清洁工'},
       	 	{value:12.7,name: '管理员'},
       	 	{value:10.8,name: '医生'},
        	{value:9.2,name: '教师'},
        ].reverse()
    },]
};
var rk_zhiye_Chart = echarts.init(document.getElementById('rk_zhiye'));
rk_zhiye_Chart.setOption(rk_zhiye_option);