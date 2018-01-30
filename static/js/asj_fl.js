function fl1_fun() {
	option = {	
		title: {text: "分类",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"},subtext:"有效统计：20000，无统计：200000"},
		tooltip: {trigger: 'item',formatter: "{b}:({d}%)"},
        series: [
        {
            type: 'pie',radius: ['30%', '50%'],silent: true,
            data:[
                    {
                        value: 1, 
                        itemStyle: {
                            normal: {
                                color: 'rgba(5,15,88,.85)',
                                borderColor: '#162abb', 
                                borderWidth: 2,
                                shadowBlur: 80,
                                shadowColor: "#00497a",
                                labelLine:false
                            } 
                        }
                    }
                ]
        },
         {
            name: '分类',
            type: 'pie',radius: ['35%', '45%'],
            label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(204,204,204,.85)',fontSize: 12}}},
            color:[
            	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset:  1,color: "rgba(0,185,96,.85)"}, 
                    {offset: 0,color: "rgba(3,119,63,.85)"}]),
            	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset:  0,color: "rgba(0,102,255,.85)"},
                     {offset: 1,color: "rgba(1,34,82,.85)"}]),
            	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset:  1,color: "rgba(113,129,248,.85)"}, 
                    {offset: 0,color: "rgba(0,96,194,.85)"}]),
            	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset:  0,color: "rgba(0,102,255,.85)"}, 
                    {offset: 1,color: "rgba(1,34,82,.85)"}])
            	],
            data: [
           	 {value: 45,name: '分类项1'},
           	 {value: 24,name: '分类项2'},
           	 {value: 24,name: '分类项3'},
           	 {value: 75,name: '分类项4'},
           	 {value: 23,name: '分类项5'},
           	 {value: 23,name: '分类项6'},
           	 {value: 86,name: '分类项7'},
           	 {value: 23,name: '分类项8'},
           	 {value: 35,name: '分类项9'},
           	 {value: 65,name: '分类项10'},
             {value: 33,name: '其他'}
            ].reverse()
        },]
	};
	var Chart = echarts.init(document.getElementById('fl1'));
	Chart.setOption(option);
}
fl1_fun();

function fl2_fun() {
	option = {
		title: {text: "分类",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"},subtext:"有效统计：20000，无统计：200000"},
        tooltip:{trigger:'item',position:function(pos,params,dom,rect,size){
            var obj = {top:60};
            obj[['left','right'][+(pos[0]<size.viewSize[0]/2)]] =5;
            return obj;
        }},
    radar: [{
        indicator: [
        	{text: '分类项1'},
        	{text: '分类项2'},
        	{text: '分类项3'},
        	{text: '分类项4'},
        	{text: '分类项5'},
        	{text: '分类项6'},
        	{text: '分类项7'},
        	{text: '分类项8'},
        	{text: '分类项9'},
        	{text: '分类项10'},
        	{text: '其他'}],
        center: ['50%', '50%'],
        radius: 90,
        startAngle: 90,
        splitNumber: 3,
        shape: 'polygon',
        triggerEvent: true,
        silent: true,
        scale: true,
        nameGap:2,
        name: {formatter: '{value}',textStyle: {color: '#fff',fontSize: 12}},
        splitArea: {show: false},
        axisLine: {lineStyle: {color: '#666a7e'}},
        splitLine: {lineStyle: {color: '#666a7e'}}

    }],
    series: [
            {
                name: '雷达图',
                type: 'radar',
                itemStyle: {normal: {color: '#fff'}},
                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,102,255,.85)'}, { offset: 1,color: 'rgba(1,34,82,.85)'}],globalCoord: false}}},
                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
                data: [{
                    value: [100, 200, 300, 400, 500,100, 200, 300, 400, 500,1000],
                    symbol: 'rect',
                    symbolSize: 4
                }]
            },
            {
                name: '雷达图',
                type: 'radar',
                itemStyle: {normal: {color: '#fff'}},
                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,185,96,.85)'}, { offset: 1,color: 'rgba(3,119,63,.85)'}],globalCoord: false}}},
                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
                data: [{
                    value: [90,180, 260, 350, 430,80, 160, 260, 330, 410,930],
                    symbol: 'rect',
                    symbolSize: 4
                }]
            }
        ]
	}
	var Chart = echarts.init(document.getElementById('fl2'));
	Chart.setOption(option);
}
fl2_fun();

function fl3_fun() {
	option = {	
		title: {text: "分类3",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a",labelLine:{show:false,}} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {
                normal: {
                    position: 'outer',
                    formatter: '{b}\n{c}万',
                    textStyle: {
                        color: 'rgba(155,166,198,1)',
                        fontSize: 12,
                        // fontWeight: "bold"
                    }}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
       	 {value: 324.3,name: '分类项1'},
         {value: 351.7,name: '分类项2'}
        ].reverse()
    },]
	};
	var Chart = echarts.init(document.getElementById('fl3'));
	Chart.setOption(option);
}
fl3_fun();

function fl4_fun() {
	option = {	
		title: {text: "分类4",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a,labelLine:{show:false,}"} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
       	 {value: 324.3,name: '分类项1'},
         {value: 351.7,name: '分类项2'}
        ].reverse()
    },]
	};
	var Chart = echarts.init(document.getElementById('fl4'));
	Chart.setOption(option);
}
fl4_fun();


function fl5_fun() {
	option = {	
		title: {text: "分类5",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a",labelLine:{show:false,}} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
       	 {value: 324.3,name: '分类项1'},
         {value: 351.7,name: '分类项2'}
        ].reverse()
    },]
	};
	var Chart = echarts.init(document.getElementById('fl5'));
	Chart.setOption(option);
}
fl5_fun();

function fl6_fun() {
	option = {	
		title: {text: "分类6",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a",labelLine:{show:false,}} }}]
    }, {
        name: '',
        type: 'pie',radius: ['35%', '45%'],
        label: {normal: {position: 'outer',formatter: '{b}\n{c}万',textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,}}},
        color:[
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
        	],
        data: [
       	 {value: 324.3,name: '分类项1'},
         {value: 351.7,name: '分类项2'}
        ].reverse()
    },]
	};
	var Chart = echarts.init(document.getElementById('fl6'));
	Chart.setOption(option);
}
fl6_fun();

function fl7_fun() {
	option = {	
		title: {text: "分类7",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
    series: [{
        type: 'pie',radius: ['30%', '50%'],silent: true,
        data: [{value: 1, itemStyle: {normal: {color: 'rgba(5,15,88,.85)',borderColor: '#162abb', borderWidth: 2,shadowBlur: 80,shadowColor: "#00497a",labelLine:{show:false,}} }}]
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
       	 {value: 324.3,name: '分类项1'},
         {value: 351.7,name: '分类项2'}
        ].reverse()
    },]
	};
	var Chart = echarts.init(document.getElementById('fl7'));
	Chart.setOption(option);
}
fl7_fun();

function fl8_fun() {
	option = {	
		title: {text: "分类8",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
		tooltip: {trigger: 'item',formatter: "{a} <br/>{b}:({d}%)"},
        series: [
                    {
                        type: 'pie',radius: ['30%', '50%'],silent: true,
                        data: [
                                {
                                    value: 1, 
                                    itemStyle: {
                                        normal:{
                                            // color: 'rgba(5,15,88,.85)',
                                            color:'red',//内层border
                                            //borderColor: '#162abb', 
                                            borderColor:'yellow',//外层border
                                            borderWidth: 2,
                                            shadowBlur: 80,
                                            shadowColor: "#00497a",
                                            labelLine:{show:false,}
                                        } 
                                    }
                                }
                        ]
                    }, 
                    {
                        name: '',
                        type: 'pie',radius: ['35%', '45%'],
                        label: {
                                normal: {
                                    position: 'outer',
                                    formatter: '{b}\n{c}万',
                                    textStyle: {
                                        color: 'rgba(155,166,198,1)',
                                        fontSize: 12,
                                        fontWeight: "bold"
                                    }
                                }
                        },
                        color:[//中心圆渐变颜色
                        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}]),
                        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}]),
                        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  1,color: "rgba(113,129,248,.85)"}, {offset: 0,color: "rgba(0,96,194,.85)"}]),
                        	new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset:  0,color: "rgba(0,102,255,.85)"}, {offset: 1,color: "rgba(1,34,82,.85)"}])
                        ],
                        data: [
                       	    {value: 324.3,name: '分类项1'},
                            {value: 351.7,name: '分类项2'}
                        ].reverse()
                    },
        ]
	};
	   var Chart = echarts.init(document.getElementById('fl8'));
	   Chart.setOption(option);
}
fl8_fun();

