var asjmap_option = {
    bmap: {
        center: [111.013413,35.032953],
        zoom: 8,
        roam: true,
        enableMapClick: false,
        mapStyle: {
        	styleJson: [
          	{"featureType": "all","elementType": "all","stylers": {"lightness": 0,}}, 
          	{"featureType": "highway","elementType": "geometry.fill", "stylers": {"color": "#ffffff"}}, 
          	{"featureType": "poi","elementType": "labels.icon","stylers": {"visibility": "off"}}, 
        		{'featureType': 'land', 'elementType': 'geometry','stylers': {'color': '#135cb5'}},//土地   
        		{'featureType': 'building', 'elementType': 'geometry','stylers': {'visibility': 'off','color': '#04406F'}},//建筑物
        		{'featureType': 'building', 'elementType': 'labels','stylers': {'visibility': 'off'}}, //建筑物标签
        		{'featureType': 'highway', 'elementType': 'geometry','stylers': {'visibility': 'off','color': '#092C4A'}},//高速道路
        		{'featureType': 'highway', 'elementType': 'labels','stylers': {'visibility': 'off','visibility': 'off'}},//高速标签
         		{'featureType': 'arterial',  'elementType': 'geometry','stylers': {'visibility': 'off','color': '#092C4A'}},//干道
        		{'featureType': 'arterial','elementType': 'labels','stylers': {'visibility': 'off','visibility': 'off'}}, //干道标签
        		{'featureType': 'green','elementType': 'geometry','stylers': {'visibility': 'off' }},//绿地
        		{'featureType': 'water','elementType': 'geometry','stylers': {'visibility': 'off','color': '#044161'}}, //水
        		{'featureType': 'subway', 'elementType': 'geometry.stroke','stylers': {'visibility': 'off','color': '#092C4A','lightness': -65}},//地铁
        		{'featureType': 'subway','elementType': 'labels', 'stylers': {'visibility': 'off','visibility': 'off'}}, //地铁标签
        		{'featureType': 'railway','elementType': 'geometry','stylers': {'visibility': 'on'}},//铁路
        		{'featureType': 'railway','elementType': 'labels','stylers': {'visibility': 'on',} }, //铁路标签
        		{'featureType': 'all','elementType': 'labels.text.stroke','stylers': {'color': '#135cb5'}}, //所有标签（边缘）
        		{'featureType': 'all', 'elementType': 'labels.text.fill', 'stylers': {'color': '#cccccc'} },//所有标签（填充）
        		{'featureType': 'manmade','elementType': 'geometry','stylers': {'visibility': 'off' }},//自定义
        		{'featureType': 'manmade','elementType': 'labels', 'stylers': {'visibility': 'off'}},//自定义标签
        		{'featureType': 'local','elementType': 'geometry','stylers': {'visibility': 'off'}}, 
        		{'featureType': 'local','elementType': 'labels','stylers': {'visibility': 'off'}},
        		{'featureType': 'boundary', 'elementType': 'geometry','stylers': {'color': '#8b8787','weight': '1','lightness': -29}},//边框
            ]
        }
    },
    visualMap: {
        type: 'piecewise',
        show: false,
        bottom: '10',
        left:"10",
        orient: 'vertical',
        min: 1000,
        max: 20000,
        seriesIndex: 0,
        calculable: true,
        pieces: [{max: 5000,}, {max: 8000,},{max: 12000,},{max: 15000,}, {max: 20000,}, {min: 20000,}],
        inRange: {color: ['#fff']}
    },
    series: [{
        type: 'heatmap',
        coordinateSystem: 'bmap',
        data:[//经度、维度、数值
            [121.459689,31.256142,'20000','上海铁路公安局'],
            [120.193898,30.251371, '5000','杭州公安处'],
            [117.213226,34.267349,'5000','徐州公安处'],
            [117.270906,31.839507,'5000','合肥公安处'],
            [118.807512,32.089453,'5000','南京公安处']
        ],    
        minOpacity: 0.5,
        pointSize: 12,
        blurSize: 0
    }]
}
var asjmap_Chart = echarts.init(document.getElementById('asjmap'));
asjmap_Chart.setOption(asjmap_option);
var bmap = asjmap_Chart.getModel().getComponent('bmap').getBMap();
bmap.addControl(new BMap.MapTypeControl());