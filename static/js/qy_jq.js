//警情区域分析

		$("#asjqy_page1").load("html/qyfx/qy_jq.html",function(){
				
			function quyu_jq(){
				$(document).ready(function(){
			  		$(".b_search").click(function(){//搜索栏隐藏
			  			//console.log(555)
			  			$(".search").toggle(500);
			  		});
				});
				//时间控件
				onLoadTimeChoiceDemo();
				borainTimeChoice({
			        start:".start",
			        end:".end",
			        level:"H",
			        less:false
			    });
				TimeInitialization("yyyyMMddhhh");
				
				//console.log($(".startdate ").val());
				//console.log($(".enddate").val());

				//获取当前时间
				//var date = new Date();
				var date = new Date();
				var year = date.getFullYear();
				var month = (date.getMonth()+1);
				var ri = date.getDate();
				var hour = date.getHours();

				//补零
				if(Number(month)<10){
					month = "0" + month;
				}
				if(Number(ri)<10){
					ri = "0" + ri;
				}
				if(Number(hour)<10){
					hour = hour ;
				}
				//console.log(hour);
				var dateString = year + "-" + month + "-" + ri;
				var datestart = year +month + ri + "00";

				var date = new Date();
				var yearend = date.getFullYear();
				var monthend = (date.getMonth()+1);
				var riend = date.getDate();
				var hourend = date.getHours();

				//补零
				if(Number(month)<10){
					monthend = "0" + monthend;
				}
				if(Number(ri)<10){
					riend = "0" + riend;
				}
				if(Number(hour)<10){
					hourend = "0" + hourend ;
				}
				var dateend=yearend +monthend + riend + hourend;
				//console.log(datestart,dateend);
				//左侧初始化
				var field = $("#qy_jqfx").val();
				
				//初始化界面
				$(function(){
					getrightjjdata(1,"",field,datestart,dateend);
					getrightcjdata(1,"",field,datestart,dateend);
					getrightfkdata(1,"",field,datestart,dateend);
					getleftdata(field,datestart,dateend);
				});

				

				//点击统计
				$('#clac_qy').on("click",function(){
					//获取对应的值
					field = $("#qy_jqfx").val();
					startdate = $(".qy_jqstartdate").val().trim();
					enddate = $(".qy_jqenddate").val().trim();
				
					//对时间格式进行处理

					// function getdate(startdate){
						var startArr = startdate.split("-");
					
						var startyear = startArr[0];//
						var startmonth = startArr[1];//
						var startday = startArr[2];
						if(startmonth<10){
							startmonth = "0" + startmonth;
						}
						var startdatehour= startday.split(" ");
						var startdays = startdatehour[0];
						var starthours = startdatehour[1].slice(0,2);//
						if(startdays<10){
							startdays = "0" + startdays;//
						}
						
						 startdate = startyear + startmonth + startdays +starthours;
						//console.log(startdate)
						
					// }

						var endArr = enddate.split("-");
					
						var endyear = endArr[0];//
						var endmonth = endArr[1];//
						var endday = endArr[2];
						if(endmonth<10){
							endmonth = "0" + endmonth;
						}
						var enddatehour= endday.split(" ");
						var enddays = enddatehour[0];
						var endhours = enddatehour[1].slice(0,2);//
						if(enddays<10){
							enddays = "0" + enddays;//
						}
						
						 enddate = endyear + endmonth + enddays +endhours;
						//console.log(enddate)

					
					
					console.log(field,startdate,enddate);
					
					//重新加载数据//field startdate enddate
					
					//左侧数据
					getleftdata(field,startdate,enddate);
					getrightjjdata(1,"",field,startdate,enddate);
					getrightcjdata(1,"",field,startdate,enddate);
					getrightfkdata(1,"",field,startdate,enddate);
				});

				// var leftinitdata = {
				// 	field:field,
				// 	startDate:datestart,
				// 	endDate:dateend,
				// }
				// console.log(leftinitdata);
				//数据请求
				function getleftdata(field,datestart,dateend){
					//console.log("成功！")4

					
					//左侧
					$.ajax({
					    type:'GET',
					    url:'api/alarmTrend/getGroupByArea',

					    data:{
					    	field:field,
					    	startDate:datestart,
					    	endDate:dateend,
					    },
					    success:function(data){
					        //console.log(JSON.parse(data));
					       var data = JSON.parse(data);
					      
					       var mapdata = data.shift();
					      // console.log(data)
					       	var thisda =[
											{name:'章贡区',value:0},
											{name:'石城县',value:0},
											{name:'宁都县',value:0},
											{name:'兴国县',value:0},
											{name:'于都县',value:0},
											{name:'瑞金市',value:0},
											{name:'会昌县',value:0},
											{name:'安远县',value:0},
											{name:'寻乌县',value:0},
											{name:'定南县',value:0},
											{name:'龙南县',value:0},
											{name:'全南县',value:0},
											{name:'信丰县',value:0},
											{name:'赣县',value:0},
											{name:'南康市',value:0},
											{name:'上犹县',value:0},
											{name:'崇义县',value:0},
											{name:'大余县',value:0},
							];

							 if(data.length ==0 ){
					       		data = thisda;
					       }else if(data.length<18){
					       		//先找出少了哪一个
					       		var a = new Array();
					       		var b = new Array();
					       		var c = new Array();
					       		for(var i=0;i<thisda.length; i++){
					       			a.push(thisda[i].name);
					       		}
					       		for(var i=0;i<data.length; i++){
					       			b.push(data[i].name);
					       		}
					       		console.log(a,b,c);
					       		for(var i in a){
									c[a[i]]=a[i];
								}
								for(var i in b){
									if(c[b[i]]){
										delete c[b[i]];
									}else{
										c[b[i]]=b[i];
									}
								}
								for(var i in c){
									console.log(c[i]);
									data.push({name:c[i],value:0});
								}
								console.log(data);

					       		
					       }
					      	gzqhmap_qy_fun(data);
					      	qh_qy_fun(data);
					    }

					});

					//右侧接警单位
					
				}
				
				
				//右侧接警单位数据
				function getrightjjdata(jjgrade,deptCode,field,datestart,dateend){
					$.ajax({
								type:'GET',
								url:'api/alarmTrend/getGroupByfield',
								data:{
									field:field,
									// startDate:"2017120100",
									// endDate:"2017121200",
									startDate:datestart,
									endDate:dateend,
									fieldGroup:"JJDWBH",
									grade:jjgrade,
									deptCode:deptCode
								},
								success:function(data){
									//console.log(JSON.parse(data));
									
									if(data.length == 2&& jjgrade!=1){
										//console.log("数组为空");
										return
									}else{
										data = JSON.parse(data);
										jjdw_qy_fun(data,jjgrade,field,datestart,dateend);
									}
								}
					})
				}

				//右侧出警单位
				function getrightcjdata(cjgrade,deptCode,field,datestart,dateend){
					$.ajax({
								type:'GET',
								url:'api/alarmTrend/getGroupByfield',
								data:{
									field:field,
									// startDate:"2017120100",
									// endDate:"2017121200",
									startDate:datestart,
									endDate:dateend,
									fieldGroup:"CJDWBH",
									grade:cjgrade,
									deptCode:deptCode,
								},
								success:function(data){
									//console.log(JSON.parse(data));
									
									if(data.length == 2&& cjgrade!=1){
										return
									}else{
										data = JSON.parse(data);
										cjdw_qy_fun(data,cjgrade,field,datestart,dateend);
									}
								}
					})
				}

				//右侧反馈单位
				function getrightfkdata(fkgrade,deptCode,field,datestart,dateend){
					$.ajax({
								type:'GET',
								url:'api/alarmTrend/getGroupByfield',
								data:{
									field:field,
									// startDate:"2017120100",
									// endDate:"2017121200",
									startDate:datestart,
									endDate:dateend,
									fieldGroup:"FKDWBH",
									grade:fkgrade,
									deptCode:deptCode,
								},
								success:function(data){
									//console.log(JSON.parse(data));
									//data = JSON.parse(data);
									if(data.length == 2 && fkgrade!=1){
										return
									}else{
										data = JSON.parse(data);
										fkdw_qy_fun(data,fkgrade,field,datestart,dateend);
									}
								}
					})
				}






				//赣州地图
				function gzqhmap_qy_fun(mapdata) {
					//console.log(mapdata);
					var maxdata;
					for(var i=0; i<mapdata.length; i++){
						maxdata = mapdata[0].value;
						if(mapdata[i].value>maxdata){
							maxdata = mapdata[i].value;
						}
					}
					//console.log(maxdata);
					var uploadedDataURL = "js/map_ganzhou.json";
				    var name = 'map_ganzhou';
				    var Chart = echarts.init(document.getElementById('gzqhmap_qy'));
				   
				     $.getJSON(uploadedDataURL, function(geoJson) {
				        echarts.registerMap(name, geoJson);
				        Chart.setOption(option = {
				        		title: {text: "赣州市区域分析",left: 'left',textStyle:{color:"rgba(204,204,204,.85)"},top:'3%',},
				        		tooltip: {trigger: 'item'},
				        		visualMap: {show: false,min: 0,max:maxdata,left: 'left',top: 'bottom',text: ['高', '低'],inRange: {color:['rgba(113,129,248,.55)','rgba(80,97,228,.55)','rgba(0,102,255,.55)','rgba(1,64,158,.55)']},calculable: true},            
				  					legend: {orient: 'vertical',x:'left',},
				            series: [{
				            	name:'警情',
				              type: 'map', 
				              mapType: name,
				              zoom:1.2,
				              //roam:true,                 
				              label: {normal: {formatter:'{b}\n{c}',show: true,textStyle: {color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"},},emphasis: {textStyle: {color: 'rgba(204,204,204,.85)'}}},
				            	itemStyle: {normal: {borderColor: 'rgba(1,34,82,.55)',areaColor:'rgba(113,129,248,.55)'},emphasis: {areaColor:'rgba(3,119,63,.55)',borderWidth: 0,shadowBlur: 20,shadowColor: 'rgba(113,129,248,0.5)',}},    
				      
								data:mapdata,
				            }],
				        });
				    });
				}
				//gzqhmap_qy_fun();

				//左侧柱状图
				function qh_qy_fun(mapdata) {
					var dataqh = new Array;
					var database = new Array;
					for(var i=0; i<mapdata.length; i++){
						dataqh.push(mapdata[i].name);
						database.push(mapdata[i].value);

					}
					
					option = {	
						title: {text: "",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
						grid: [{x:50},],
						tooltip: {formatter: '{b} ({c})' },
						xAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
						yAxis: [{gridIndex: 0, interval:0,
							// data: ['区划1','区划2','区划3','区划4','区划5','区划6','区划7','区划8','区划9','区划10'].reverse(),
							data:dataqh.reverse(),
							axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
				 	 }],
						series: [{
							type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
							label:{normal:{formatter: '{c}',show:true, position:"right",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
							// data:[52.9,47.2,41.3,36.1,31.5,29.2,23.6,20.1,19.7,18.4],
							data:database.reverse(),
						},]
					};
					var Chart = echarts.init(document.getElementById('qh_qy'));
					Chart.setOption(option);
				}
				// qh_qy_fun();	

				//接警单位 点击
				function jjdw_qy_fun(jjdwdata,jjgrade,field,datestart,dateend) {
					// alert("aaa");
					$("#jjdw_qy").remove();
					$("#myDiv").append("<div id='jjdw_qy' style='width:500px;height:270px;'>");
					var dataqh = new Array();
					var database = new Array();
					var nextcode = new Array();
					for(var i=0; i<jjdwdata.length; i++){
						dataqh.push(jjdwdata[i].name);
						database.push(jjdwdata[i].value);
						nextcode.push(jjdwdata[i].deptCode);
					}
					//console.log(nextcode);
					option = {	
						title: {text: "接警单位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
						grid: [{x:50},],
						tooltip: {formatter: '{b} ({c})' },
						yAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
						xAxis: [{gridIndex: 0, interval:0,
							data: dataqh,
							axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
				 	 }],
						series: [{
							type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
							label:{normal:{formatter: '{c}',show:true, position:"top",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
							data:database,
						},]
					};
					var Chart = echarts.init(document.getElementById('jjdw_qy'));
					Chart.setOption(option);

					Chart.on("click",function(params){

						//显示返回按钮
						$("#jjdwreturn").css("display","block");

						//获取索引
						var thisindex = params.dataIndex;

						//更新deptcode
						var deptCode = nextcode[thisindex];
						jjgrade++;
						 // $("#jjdw_qy").html('');console.log(1)
						 console.log("进入下一层");
						getrightjjdata(jjgrade,deptCode,field,datestart,dateend);
						//console.log(deptCode);

					});	

					//点击按钮返回接警首层
					$("#jjdwreturn").unbind();//清除事件队列
					$("#jjdwreturn").on("click",function(){
						console.log("返回首层")
						//返回首层
						deptCode = "";
						jjgrade = 1;
						getrightjjdata(jjgrade,deptCode,field,datestart,dateend);
						// console.log(jjgrade);

						//隐藏首层按钮
						$("#jjdwreturn").css("display","none");
					})
				}
					
				

				//出警单位 
				function cjdw_qy_fun(cjdwdata,cjgrade,field,datestart,dateend) {
					$("#cjdw_qy").remove();
					$("#cjdws").append("<div id='cjdw_qy' style='width:500px;height:270px;'>");
					
					var dataqh = new Array();
					var database = new Array();
					var nextcode = new Array();
					for(var i=0; i<cjdwdata.length; i++){
						dataqh.push(cjdwdata[i].name);
						database.push(cjdwdata[i].value);
						nextcode.push(cjdwdata[i].deptCode);
					}

					option = {	
						title: {text: "出警单位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
						grid: [{x:50},],
						tooltip: {formatter: '{b} ({c})' },
						yAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
						xAxis: [{gridIndex: 0, interval:0,
							data:dataqh,
							axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
				 	 }],
						series: [{
							type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
							label:{normal:{formatter: '{c}',show:true, position:"top",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
							data:database,
						},]
					};
					//console.log($("#cjdws").html());
					var Chart = echarts.init(document.getElementById('cjdw_qy'));
					Chart.setOption(option);

					Chart.on("click",function(params){

						//显示返回按钮
						$("#cjdwreturn").css("display","block");

						//获取索引
						var thisindex = params.dataIndex;

						//更新deptcode
						var deptCode = nextcode[thisindex];
						cjgrade++;
						 // $("#jjdw_qy").html('');console.log(1)
						getrightcjdata(cjgrade,deptCode,field,datestart,dateend);
						//console.log(deptCode);

					});	

					//点击按钮返回出警首层
					$("#cjdwreturn").unbind();
					$("#cjdwreturn").on("click",function(){
						console.log("返回首层")
						//返回首层
						deptCode = "";
						cjgrade = 1;
						getrightcjdata(cjgrade,deptCode,field,datestart,dateend);
						// console.log(jjgrade);

						//隐藏首层按钮
						$("#cjdwreturn").css("display","none");
					})
				}
				
				
				

				//反馈单位
				function fkdw_qy_fun(fkdwdata,fkgrade,field,datestart,dateend) {
					$("#fkdw_qy").remove();
					$("#fkdws").append("<div id='fkdw_qy' style='width:500px;height:270px;'>");
					
					var dataqh = new Array();
					var database = new Array();
					var nextcode = new Array();
					for(var i=0; i<fkdwdata.length; i++){
						dataqh.push(fkdwdata[i].name);
						database.push(fkdwdata[i].value);
						nextcode.push(fkdwdata[i].deptCode);
					}
					option = {	
						title: {text: "反馈单位",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"}},
						grid: [{x:50},],
						tooltip: {formatter: '{b} ({c})' },
						yAxis: [{gridIndex: 0, axisTick: {show:false},axisLabel: {show:false},splitLine: {show:false},axisLine: {show:false }},],
						xAxis: [{gridIndex: 0, interval:0,
							data:dataqh ,
							axisTick: {show:false}, axisLabel: {show:true,textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}},splitLine: {show:false},axisLine: {show:true,lineStyle:{color:"rgba(204,204,204,.85)"}},		
				 	 }],
						series: [{
							type: 'bar',xAxisIndex: 0,yAxisIndex: 0,barWidth:'45%',itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0,color: "rgba(0,102,255,1)"}, {offset: 1,color: "rgba(80,97,228,0.5)"}])}},
							label:{normal:{formatter: '{c}',show:true, position:"top",textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
							data:database,
						},]
					};
					var Chart = echarts.init(document.getElementById('fkdw_qy'));
					Chart.setOption(option);

					//点击子类
					Chart.on("click",function(params){

						//显示返回按钮
						$("#fkdwreturn").css("display","block");

						//获取索引
						var thisindex = params.dataIndex;

						//更新deptcode
						var deptCode = nextcode[thisindex];
						fkgrade++;
						 // $("#jjdw_qy").html('');console.log(1)
						getrightfkdata(fkgrade,deptCode,field,datestart,dateend);
						//console.log(deptCode);

					});	

					//点击返回首层
					$("#fkdwreturn").unbind();
					$("#fkdwreturn").on("click",function(){
						console.log("返回首层")
						//返回首层
						deptCode = "";
						fkgrade = 1;
						getrightfkdata(fkgrade,deptCode,field,datestart,dateend);
						// console.log(jjgrade);

						//隐藏首层按钮
						$("#fkdwreturn").css("display","none");
					})
				}
			}
			quyu_jq();
		});