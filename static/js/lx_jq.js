//类型分析
$("#asjlxjq_page1").load("html/lxfx/jqlx.html",function(){
	//console.log(777)
	function lxfx(){
		var quyu = $("#lxjq_quyu");
		var quyujjstation = $("#lxjq_jjstation");
		var quyucjstation = $("#lxjq_cjstation");
		var quyufkstation = $("#lxjq_fkstation");
		

		var promise = new Promise(function(resolve,reject){

				$.ajax({
				    type:'GET',
				    url:'api/dimDicGb/getByDmbh?dmbh=3607',

				    success:function(data){
				       // console.log(JSON.parse(data));
				        var data = JSON.parse(data);
				         var template = `<option value="">区域</option>`;
				        data.forEach(function(item,index){
				        	//console.log(item.dmmc);
				        	template += `
				        		<option value="${item.dmbh}" data-dmbh="${item.dmbh}">${item.dmmc}</option>
				        	`;
				        });
				        //console.log(template);
				        quyu.html(template);

				        //地区编码
						deptCode = quyu.children()[0].dataset.dmbh;
						//console.log(deptCode);
						
						
						
								
						resolve(deptCode)
				    }

				})
		});

		promise.then(function(deptCode){
					//console.log(deptCode);
					//当上级select框改变时重新请求数据
					quyu.change(function(){
								deptCode=quyu.val();
								console.log(quyu.val())
								getdata(deptCode);
					});
					getdata(deptCode);			
		})

		//接警数据请求
		function getdata(deptCode){
			$.ajax({
			    type:'GET',
			    url:'api/dimCodeAjxxDept/getByDeptCode?deptCode='+deptCode,
			    //data:{}
			    scriptCharset:'utf-8',

			    success:function(data){
			    	//console.log(data);
			       //console.log(JSON.parse(data));
			        var data = JSON.parse(data);
			        var templatejj =`<option value="">接警单位<option>`;
			        var templatecj =`<option value="">出警单位<option>`;
			        var templatefk =`<option value="">反馈单位<option>`;
			    
			        data.forEach(function(item,index){
			        	//console.log(item.deptName);
			        	var thisstr = item.deptName;
			        	if(item.deptName.length>10){
			        		thisstr = item.deptName.slice(0,11) + "...";
			        	}
			        	//item.deptName;

			        	templatejj += `
			        		<option title="${item.deptName}" value="${item.deptCode}" data-id="${item.id}">${thisstr}</option>
			        	`;
			        	templatecj += `
			        		<option title="${item.deptName}" value="${item.deptCode}" data-id="${item.id}">${thisstr}</option>
			        	`;
			        	templatefk += `
			        		<option title="${item.deptName}" value="${item.deptCode}" data-id="${item.id}">${thisstr}</option>
			        	`;
			   
			        });
			        console.log(quyujjstation);
			        quyujjstation.html(templatejj);
			        quyujjstation.find('option')[1].remove();
			        quyucjstation.html(templatecj);
			        quyucjstation.find('option')[1].remove();
			        quyufkstation.html(templatefk);
			        quyufkstation.find('option')[1].remove();
			    }
			})
		}

	

		onLoadTimeChoiceDemo();

	    borainTimeChoice({
	        start:".start",
	        end:".end",
	        level:"YMD",
	        less:false
	    });
	   
	    TimeInitialization("yyyyMMddd");

	    var startdate = $(".lx_jqstartdate").val().trim();
		var enddate = $(".lx_jqenddate").val().trim();
		var startArr = startdate.split("-");
					
		var startyear = startArr[0];//
		var startmonth = startArr[1];//
		var startday = startArr[2];
		if(startmonth<10){
			startmonth = "0" + startmonth;
		}
		var startdatehour= startday.split(" ");
		var startdays = startdatehour[0];
		console.log()
		//var starthours = startdatehour[1].slice(0,2);//
		if(startdays<10){
			startdays = "0" + startdays;//
		}
		
		 datestart = startyear + startmonth + startdays;
		

		var endArr = enddate.split("-");
	
		var endyear = endArr[0];//
		var endmonth = endArr[1];//
		var endday = endArr[2];
		if(endmonth<10){
			endmonth = "0" + endmonth;
		}
		var enddatehour= endday.split(" ");
		var enddays = enddatehour[0];
		//var endhours = enddatehour[1].slice(0,2);//
		if(enddays<10){
			enddays = "0" + enddays;//
		}
		
		 dateend = endyear + endmonth + enddays;

		//初始化界面
		var jqqybh = $("#lxjq_quyu").val();
		var jqdwbh = $("#lxjq_jjstation").val();
		var cjdwbh = $("#lxjq_cjstation").val();
		var fkdwbh =$("#lxjq_fkstation").val();
		var dataArr = [datestart,dateend,jqqybh,jqdwbh,cjdwbh,fkdwbh];
		//点击统计
		$("#calclx_jq").click(function(){
			jqqybh = $("#lxjq_quyu").val();
			jqdwbh = $("#lxjq_jjstation").val();
			cjdwbh = $("#lxjq_cjstation").val();
			fkdwbh =$("#lxjq_fkstation").val();

			

			startdate = $(".lx_jqstartdate").val().trim();
			enddate = $(".lx_jqenddate").val().trim();

			//对时间格式进行处理
			startArr = startdate.split("-");
					
			startyear = startArr[0];//
			startmonth = startArr[1];//
			startday = startArr[2];
		if(startmonth<10){
			startmonth = "0" + startmonth;
		}
			startdatehour= startday.split(" ");
			startdays = startdatehour[0];
		
		if(startdays<10){
			startdays = "0" + startdays;//
		}
		
		 datestart = startyear + startmonth + startdays;
		

		endArr = enddate.split("-");
	
		endyear = endArr[0];//
		endmonth = endArr[1];//
		endday = endArr[2];
		if(endmonth<10){
			endmonth = "0" + endmonth;
		}
		var enddatehour= endday.split(" ");
		var enddays = enddatehour[0];
		//var endhours = enddatehour[1].slice(0,2);//
		if(enddays<10){
			enddays = "0" + enddays;//
		}
		
		 dateend = endyear + endmonth + enddays;
			 console.log(startdate,enddate);
			 dataArr = [datestart,dateend,jqqybh,jqdwbh,cjdwbh,fkdwbh];
			 //重新执行函数
			 jdlx(dataArr);
			 cj110(dataArr);
			 cj120(dataArr);
			 cj119(dataArr);
			 jqlx(dataArr);
			 weather(dataArr);
			 accident(dataArr);
			 personstyle(dataArr);
			 crimeway(dataArr);
			 crimecreate(dataArr);
			 result(dataArr);
			 traffic(dataArr);
		})


		//加载图表数据
		function change(obj,data){
				//遍历对象
				for(var i in obj){
					//console.log(i,obj[i]);
					var name = i;
					var value = obj[i];
					//console.log({name:i,value:value});
					if( i == "fksl"){
						i = "反馈数量";
					}else if( i == "jjsl"){
						i = "接警数量";
					}else if( i== "cjsl"){
						i = "出警数量";
					}
					 data.push({name:i,value:value});
				}
				return data;
		}
		function getval(obj,arr){
			for(var i in obj){
					//console.log(i,obj[i]);
					
					arr.push(obj[i]);
			}
				return arr;
		}

		//警单类型
		function jdlx(dataArr){
			$.ajax({
				type:'GET',
				url:'api/alarmTrend/getSingleAlarm',
				data:{	startDate:datestart,
						endDate:dateend,
						jqqybh:jqqybh,
						//jqqybh:"360702",
						jqdwbh:jqdwbh,
						fkdwbh:fkdwbh,
						cjdwbh:cjdwbh
				},
				// alarmTrend/getSingleAlarm?startDate=20180111&endDate=20180112
				success:function(data){
					console.log(JSON.parse(data));
					var data = JSON.parse(data);


					//警单数量
					var obj = data.glsl;
					var jdsl = new Array();
					
					change(obj,jdsl);
					
					var yxtj;
					var wxtj;
					//警单类型取前十个
					var jdtype = data.cdlx.slice(0,10);
					if(obj==null){
						jdtype = [];
						yxtj =0;
						wxtj =0;
					}else{
						//有效统计
					yxtj = data.yxwxtj.yxtj;

					//无效统计
					wxtj = data.yxwxtj.wxtj;
					}
					//console.log(jdsl,jdtype);
					fl1_fun(yxtj,wxtj,jdtype,jdsl);
				}
			});

			function fl1_fun(yxtj,wxtj,jdtype,jdsl) {
				
				option = {	
					title: {text: "警单",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"},subtext:`有效统计：${yxtj}，无统计：${wxtj}`},
					tooltip: {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},

			        series: [
				        {
			                name:'警单数量',
			                type:'pie',
			                selectedMode: 'single',
			                radius : [0, 50],
			 
			                // for funnel
			                x: '20%',
			                width: '40%',
			                funnelAlign: 'right',
			                max: 1548,
			 				color:["#9203ee","#0060c2","#01409e"],
			                itemStyle : {
			                    normal : {
			                    
			                        label : {
			                            position : 'inner'
			                        },
			                        labelLine : {
			                            show : false
			                        }
			                }
		                	},
		                	data:jdsl,
		            	},
			            {
			                name:'警单类型',
			                type:'pie',
			                radius : [60, 80],
			 
			                // for funnel
			                x: '60%',
			                width: '35%',
			                funnelAlign: 'center',
			                max: 1048,
					 				// itemStyle : {
						    //                 normal : {
						    //                     label : {
						    //                         position : 'inner'
						    //                     },
						    //                     labelLine : {
						    //                         show : false
						    //                  	}  
						    //                 }
						    //         },
				             color: ['rgb(254,67,101)','rgb(252,157,154)','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
			                data:jdtype,
			            }
					       // {
					       //      type: 'pie',
					       //      radius: [50, ],
					       //      silent: true,
					       //      data:[
					       //              {
					       //                  value: 1, 
					       //                  itemStyle: {
					       //                      normal: {
					       //                          color: 'rgba(5,15,88,.85)',
					       //                          borderColor: '#162abb', 
					       //                          borderWidth: 2,
					       //                          shadowBlur: 80,
					       //                          shadowColor: "#00497a",
					       //                          labelLine:false
					       //                      } 
					       //                  }
					       //              }
					       //          ]
					       // },
					        // {
					        //     name: '警单类型',
					        //     type: 'pie',radius: ['35%', '45%'],
					        //     label: {normal: {position: 'outer',formatter: '{b}\n{c}',textStyle: {color: 'rgba(204,204,204,.85)',fontSize: 12}}},
					        //     color:[
					        //     	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					        //             {offset:  1,color: "rgba(0,185,96,.85)"}, 
					        //             {offset: 0,color: "rgba(3,119,63,.85)"}]),
					        //     	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					        //             {offset:  0,color: "rgba(0,102,255,.85)"},
					        //              {offset: 1,color: "rgba(1,34,82,.85)"}]),
					        //     	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					        //             {offset:  1,color: "rgba(113,129,248,.85)"}, 
					        //             {offset: 0,color: "rgba(0,96,194,.85)"}]),
					        //     	new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					        //             {offset:  0,color: "rgba(0,102,255,.85)"}, 
					        //             {offset: 1,color: "rgba(1,34,82,.85)"}])
					        //     	],
					        //     data:jdtype, 
					           	
					        // }
			        ],
				};
				var Chart = echarts.init(document.getElementById('fl1'));
				Chart.setOption(option);
			}

		}
		jdlx(dataArr);
		//fl1_fun();

		//出警效率
		//110
		function cj110(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/getEfficiency",
				data:{
					
					startDate:datestart,
					endDate:dateend,
					type:"110",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					//console.log(JSON.parse(data));
					var city = JSON.parse(data).city;
					var village = JSON.parse(data).village;
					var cityArr = new Array();
					var villageArr = new Array();
					console.log(city,village);
					getval(city,cityArr);
					getval(village,villageArr);
					//console.log(cityArr,villageArr);

					fl110_fun(cityArr,villageArr)
				}
			});
			function fl110_fun(cityArr,villageArr) {
				option = {
					title: {text: "110出警效率",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"},},
			        tooltip:{trigger:'item',position:function(pos,params,dom,rect,size){
			            var obj = {top:60};
			            obj[['left','right'][+(pos[0]<size.viewSize[0]/2)]] =5;
			            return obj;
			        }},
			    radar: [{
			        indicator: [
			        	{text: '10min-20min'},
			        	{text: '大于6h'},
			        	{text: '5min-10min'},
			        	{text: '小于5min'},
			        	{text: '2h-6h'},
			        	{text: '20min-2h'},
			        	],
			        center: ['60%', '60%'],
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
			                name: '农村',
			                type: 'radar',
			                itemStyle: {normal: {color: '#fff'}},
			                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,102,255,.85)'}, { offset: 1,color: 'rgba(1,34,82,.85)'}],globalCoord: false}}},
			                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			                data: [{
			                    value: villageArr,
			                    symbol: 'rect',
			                    symbolSize: 4
			                }]
			            },
			            {
			                name: '城市',
			                type: 'radar',
			                itemStyle: {normal: {color: '#fff'}},
			                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,185,96,.85)'}, { offset: 1,color: 'rgba(3,119,63,.85)'}],globalCoord: false}}},
			                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			                data: [{
			                    value: cityArr,
			                    symbol: 'rect',
			                    symbolSize: 4
			                }]
			            }
			        ]
				}
				var Chart = echarts.init(document.getElementById('fl2'));
				Chart.setOption(option);
			}
			
		}
		cj110(dataArr);

		//120
		function cj120(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/getEfficiency",
				data:{
					startDate:datestart,
					endDate:dateend,
					jqqybh:jqqybh,
					type:"120",
					//jqqybh:"360702",
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					console.log(JSON.parse(data));
					var city = JSON.parse(data).city;
					var village = JSON.parse(data).village;
					var cityArr = new Array();
					var villageArr = new Array();
					console.log(city,village);
					getval(city,cityArr);
					getval(village,villageArr);
					//console.log(cityArr,villageArr);

					fl120_fun(cityArr,villageArr)
				}
			});
			function fl120_fun(cityArr,villageArr) {
				option = {
					title: {text: "120出警效率",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"},},
			        tooltip:{trigger:'item',position:function(pos,params,dom,rect,size){
			            var obj = {top:60};
			            obj[['left','right'][+(pos[0]<size.viewSize[0]/2)]] =5;
			            return obj;
			        }},
			    radar: [{
			        indicator: [
			        	{text: '10min-20min'},
			        	{text: '大于6h'},
			        	{text: '5min-10min'},
			        	{text: '小于5min'},
			        	{text: '2h-6h'},
			        	{text: '20min-2h'},
			        	],
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
			                name: '农村',
			                type: 'radar',
			                itemStyle: {normal: {color: '#fff'}},
			                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,102,255,.85)'}, { offset: 1,color: 'rgba(1,34,82,.85)'}],globalCoord: false}}},
			                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			                data: [{
			                    value: villageArr,
			                    symbol: 'rect',
			                    symbolSize: 4
			                }]
			            },
			            {
			                name: '城市',
			                type: 'radar',
			                itemStyle: {normal: {color: '#fff'}},
			                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,185,96,.85)'}, { offset: 1,color: 'rgba(3,119,63,.85)'}],globalCoord: false}}},
			                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			                data: [{
			                    value: cityArr,
			                    symbol: 'rect',
			                    symbolSize: 4
			                }]
			            }
			        ]
				}
				var Chart = echarts.init(document.getElementById('fl3'));
				Chart.setOption(option);
			}
		}
		cj120(dataArr);

		//119
		function cj119(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/getEfficiency",
				data:{
					startDate:datestart,
					endDate:dateend,
					jqqybh:jqqybh,
					type:"119",
					//jqqybh:"360702",
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					//console.log(JSON.parse(data));
					var city = JSON.parse(data).city;
					var village = JSON.parse(data).village;
					var cityArr = new Array();
					var villageArr = new Array();
					//console.log(city,village);
					getval(city,cityArr);
					getval(village,villageArr);
					//console.log(cityArr,villageArr);

					fl119_fun(cityArr,villageArr)
				}
			});
			function fl119_fun(cityArr,villageArr) {
				option = {
					title: {text: "119出警效率",left: 'center',textStyle:{color:"rgba(204,204,204,.85)"},},
			        tooltip:{trigger:'item',position:function(pos,params,dom,rect,size){
			            var obj = {top:60};
			            obj[['left','right'][+(pos[0]<size.viewSize[0]/2)]] =5;
			            return obj;
			        }},
			    radar: [{
			        indicator: [
			        	{text: '10min-20min'},
			        	{text: '大于6h'},
			        	{text: '5min-10min'},
			        	{text: '小于5min'},
			        	{text: '2h-6h'},
			        	{text: '20min-2h'},
			        	],
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
			                name: '农村',
			                type: 'radar',
			                itemStyle: {normal: {color: '#fff'}},
			                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,102,255,.85)'}, { offset: 1,color: 'rgba(1,34,82,.85)'}],globalCoord: false}}},
			                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			                data: [{
			                    value: villageArr,
			                    symbol: 'rect',
			                    symbolSize: 4
			                }]
			            },
			            {
			                name: '城市',
			                type: 'radar',
			                itemStyle: {normal: {color: '#fff'}},
			                areaStyle: {normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(0,185,96,.85)'}, { offset: 1,color: 'rgba(3,119,63,.85)'}],globalCoord: false}}},
			                lineStyle: {normal: {color: 'rgba(0,0,0,0)'}},
			                data: [{
			                    value: cityArr,
			                    symbol: 'rect',
			                    symbolSize: 4
			                }]
			            }
			        ]
				}
				var Chart = echarts.init(document.getElementById('fl4'));
				Chart.setOption(option);
			}
			
		}
		cj119(dataArr);

		function optionl(textStr,idStr,description,wxsl,yxsl,yxjqzs,wxjqzs){
			// if(description.length>10){
			// 	description = description.slice(0,10);
			// 	wxsl = wxsl.slice(0,10);
			// 	yxsl = yxsl.slice(0,10);
			// }
			option = {
						    title : {
						        text: textStr,
						        subtext:"有效警情总数："+ yxjqzs+"，无效警情总数："+wxjqzs,
						        left: 'center',
						        textStyle:{color:"rgba(204,204,204,.85)"},
						        
						    },
						    tooltip : {
						        trigger: 'axis'
						    },
						    // legend: {
						    //     data:['有效统计'],
						    //     left:"25px",
					     //    	textStyle: {color: '#B4B4B4',fontSize: 12,},
					     //    	top:'7%',
						    // },
		
						    calculable : true,
						    xAxis : [
						        {
						            type : 'category',
						            data :description,
						            axisLine: {lineStyle: {color: '#B4B4B4',}},
						            axisLabel:{  
						                        interval:0,  
						                        rotate:45 
									},
						        }
						    ],
						    yAxis : [
						        {
						            type : 'value',
						            axisLine: {lineStyle: {color: '#B4B4B4',}},
						            splitLine:{
					                    show:false 
					               	},
						        },
						       
						    ],
						    //dataZoom : {//实现缩放功能    
		                        show : true,      
		                        realtime : true,    
		                       	start : 0,      
		                        end : 70,
		                        textStyle:{
		                        	color: '#B4B4B4',
		                        },
		                          
		                    //},    
						    series : [
						        {
						            name:'有效统计',
						            type:'bar',
						            data:yxsl,
						           	label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
							        itemStyle: {
							            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}])}
							        },
						            
						        },
						        
						    ]
					};
				var Chart = echarts.init(document.getElementById(idStr));//'fl_jqlb'
				Chart.setOption(option);
		}
		
		//警情类型
		function jqlx(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					fileType:"bjlb",
					sScope:"caseType110",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					
					var data = JSON.parse(data);
					//遍历数据
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					console.log(yxjqzs,wxjqzs);
					jqlb(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}
			});

			function jqlb(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("警情类型统计",'fl_jqlb',description,wxsl,yxsl,yxjqzs,wxjqzs);
			}
		}
		jqlx(dataArr);

		//天气情况
		function weather(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"tqqk",
					sScope:"weatherType",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					//debugger;
					
					var data = JSON.parse(data);
					

					//
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					tianqi(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}
			});

			function tianqi(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("天气情况统计",'fl_jqtianqi',description,wxsl,yxsl,yxjqzs,wxjqzs);
			}	
		}
		weather(dataArr);

		//事发场所
		function accident(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"sfcs",
					sScope:"facs",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					
					var data = JSON.parse(data);
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					shifachangsuo(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function shifachangsuo(description,wxsl,yxsl,yxjqzs,wxjqzs){
				
				optionl("事发场所统计",'fl_jqsfcs',description,wxsl,yxsl,yxjqzs,wxjqzs);
			}	
		}
		accident(dataArr);

		//涉案人员性质
		function personstyle(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"sjryxz",
					sScope:"personType",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					
					var data = JSON.parse(data);
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					saryxz(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function saryxz(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("涉案人员性质统计",'fl_jqsaryxz',description,wxsl,yxsl,yxjqzs,wxjqzs);
			}
			
		}
		personstyle(dataArr);

		//作案手段
		function crimeway(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"zasd",
					sScope:"zasd",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh

				},
				success:function(data){
					
					var data = JSON.parse(data);
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					zasd(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function zasd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("作案手段统计",'fl_jqzasd',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		crimeway(dataArr);

		//作案特点
		function crimecreate(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"zatd",
					sScope:"zatd",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					
					var data = JSON.parse(data);
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					zatd(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function zatd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("作案特点统计",'fl_jqzatd',description,wxsl,yxsl,yxjqzs,wxjqzs);
			
			}
			
		}
		crimecreate(dataArr);


		//处理结果
		function result(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"zatd",
					sScope:"zatd",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh
				},
				success:function(data){
					
					var data = JSON.parse(data);
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					cljg(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function cljg(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("处理结果统计",'fl_jqcljg',description,wxsl,yxsl,yxjqzs,wxjqzs);
		
			}
			
		}
		result(dataArr);

		//交通事故原因
		function traffic(dataArr){
			$.ajax({
				type:"GET",
				url:"api/alarmTrend/byfileType",
				data:{
					startDate:datestart,
					endDate:dateend,
					//jqqybh:"360700",
					fileType:"sgccyy",
					jqqybh:jqqybh,
					jqdwbh:jqdwbh,
					fkdwbh:fkdwbh,
					cjdwbh:cjdwbh

				},
				success:function(data){
					
					var data = JSON.parse(data);
					if(data.length>15){
						data = data.slice(0,15);
					}
					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						description.push(data[i].s_description);
						yxsl.push(data[i].YXJQSL);
						wxsl.push(data[i].JQSL-data[i].YXJQSL);
						yxjqzs += data[i].YXJQSL;
						wxjqzs += (data[i].JQSL-data[i].YXJQSL);
					}
					console.log(yxjqzs,wxjqzs);
					
					jtsg(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function jtsg(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl('交通事故原因','fl_jqjtsg',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		traffic(dataArr);
		
	}
	lxfx();
});