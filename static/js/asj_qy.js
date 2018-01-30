




function gzqhmap_qy_fun() {
		var uploadedDataURL = "js/map_ganzhou.json";
    var name = 'map_ganzhou';
    var Chart = echarts.init(document.getElementById('gzqhmap_qy'));
    $.getJSON(uploadedDataURL, function(geoJson) {
        echarts.registerMap(name, geoJson);
        Chart.setOption(option = {
        		title: {text: "赣州市区域分析",left: 'left',textStyle:{color:"rgba(204,204,204,.85)"},top:'3%',},
        		tooltip: {trigger: 'item'},
        		visualMap: {show: false,min: 0,max: 100,left: 'left',top: 'bottom',text: ['高', '低'],inRange: {color:['rgba(113,129,248,.55)','rgba(80,97,228,.55)','rgba(0,102,255,.55)','rgba(1,64,158,.55)']},calculable: true},            
  					legend: {orient: 'vertical',x:'left',},
            series: [{
            	name:'警情',
              type: 'map', 
              mapType: name,
              zoom:1.2,
              //roam:true,                 
              label: {normal: {formatter:'{b}\n{c}',show: true,textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"},},emphasis: {textStyle: {color: 'rgba(204,204,204,.85)'}}},
            	itemStyle: {normal: {borderColor: 'rgba(1,34,82,.55)',},emphasis: {areaColor:'rgba(3,119,63,.55)',borderWidth: 0,shadowBlur: 20,shadowColor: 'rgba(113,129,248,0.5)',}},    
              data:[
								{name:'章贡区',value:84},
								{name:'石城县',value:34},
								{name:'宁都县',value:46},
								{name:'兴国县',value:32},
								{name:'于都县',value:96},
								{name:'瑞金市',value:89},
								{name:'会昌县',value:58},
								{name:'安远县',value:15},
								{name:'寻乌县',value:96},
								{name:'定南县',value:7},
								{name:'龙南县',value:91},
								{name:'全南县',value:76},
								{name:'信丰县',value:39},
								{name:'赣县',value:85},
								{name:'南康区',value:66},
								{name:'上犹县',value:8},
								{name:'崇义县',value:69},
								{name:'大余县',value:39},],
            }],
        });
    });
}
gzqhmap_qy_fun();

function qh_qy_fun() {
	option = {	
		title: {text: "",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		grid: [{x:50},],
		tooltip: {formatter: '{b} ({c})万' },
		xAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
		yAxis: [{gridIndex: 0, interval:0,
			data: ['区划1','区划2','区划3','区划4','区划5','区划6','区划7','区划8','区划9','区划10'].reverse(),
			axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
 	 }],
		series: [{
			type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
			label:{normal:{formatter: '{c}万',show:true, position:"right",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
			data:[52.9,47.2,41.3,36.1,31.5,29.2,23.6,20.1,19.7,18.4],
		},]
	};
	var Chart = echarts.init(document.getElementById('qh_qy'));
	Chart.setOption(option);
}
qh_qy_fun();	


function jjdw_qy_fun() {
	option = {	
		title: {text: "接警单位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		grid: [{x:50},],
		tooltip: {formatter: '{b} ({c})万' },
		yAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
		xAxis: [{gridIndex: 0, interval:0,
			data: ['单位1','单位2','单位3','单位4','单位5','单位6','单位7','单位8','单位9','单位10'].reverse(),
			axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
 	 }],
		series: [{
			type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
			label:{normal:{formatter: '{c}万',show:true, position:"top",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
			data:[52.9,47.2,41.3,36.1,31.5,29.2,23.6,20.1,19.7,18.4],
		},]
	};
	var Chart = echarts.init(document.getElementById('jjdw_qy'));
	Chart.setOption(option);
}
jjdw_qy_fun();	

function cjdw_qy_fun() {
	option = {	
		title: {text: "处警单位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		grid: [{x:50},],
		tooltip: {formatter: '{b} ({c})万' },
		yAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
		xAxis: [{gridIndex: 0, interval:0,
			data: ['单位1','单位2','单位3','单位4','单位5','单位6','单位7','单位8','单位9','单位10'].reverse(),
			axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
 	 }],
		series: [{
			type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
			label:{normal:{formatter: '{c}万',show:true, position:"top",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
			data:[52.9,47.2,41.3,36.1,31.5,29.2,23.6,20.1,19.7,18.4],
		},]
	};
	var Chart = echarts.init(document.getElementById('cjdw_qy'));
	Chart.setOption(option);
}
cjdw_qy_fun();	

function fkdw_qy_fun() {
	option = {	
		title: {text: "反馈单位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		grid: [{x:50},],
		tooltip: {formatter: '{b} ({c})万' },
		yAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
		xAxis: [{gridIndex: 0, interval:0,
			data: ['单位1','单位2','单位3','单位4','单位5','单位6','单位7','单位8','单位9','单位10'].reverse(),
			axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
 	 }],
		series: [{
			type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
			label:{normal:{formatter: '{c}万',show:true, position:"top",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
			data:[52.9,47.2,41.3,36.1,31.5,29.2,23.6,20.1,19.7,18.4],
		},]
	};
	var Chart = echarts.init(document.getElementById('fkdw_qy'));
	Chart.setOption(option);
}
fkdw_qy_fun();	