
//案件类型分析
//类型分析
$("#asjlx_page1").load("html/lxfx/ajlx.html",function(){
	
	function lxfx(){
		var quyu = $("#lx_quyu");
		var quyujjstation = $("#ajlx_jjstation");
		var quyucjstation = $("#ajlx_cjstation");
		//var quyufkstation = $("#ajlx_fkstation");
		//console.log(quyustation);

		var promise = new Promise(function(resolve,reject){

				$.ajax({
				    type:'GET',
				    url:'api/dimDicGb/getByDmbh?dmbh=3607',

				    success:function(data){
				       // 
				        var data = JSON.parse(data);
				        var template = `<option value="" >区域</option>`;
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
			       //
			        var data = JSON.parse(data);
			        var templatejj =`<option value="">受案单位<option>`;
			        var templatecj =`<option value="">办案单位<option>`;
			        //var templatefk =`<option value="">接警单位<option>`;
			    
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
			   
			        });
			        quyujjstation.html(templatejj);
			        quyujjstation.find('option')[1].remove();
			        quyucjstation.html(templatecj);
			        quyucjstation.find('option')[1].remove();
			        // quyufkstation.html(templatejj);
			        // quyufkstation.find('option')[1].remove();
			    }
			})
		}

		//时间控件
		onLoadTimeChoiceDemo();

	    borainTimeChoice({
	        start:".start",
	        end:".end",
	        level:"YMD",
	        less:false
	    });
	   
	    TimeInitialization("yyyyMMdd");
	   	var startdate = $(".lx_ajstartdate").val().trim();
		var enddate = $(".lx_ajenddate").val().trim();
		var startArr = startdate.split("-");
					
		var startyear = startArr[0];//
		var startmonth = startArr[1];//
		var startday = startArr[2];
		if(startmonth<10){
			startmonth = "0" + startmonth;
		}
		var startdatehour= startday.split(" ");
		var startdays = startdatehour[0];
		
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
		var caseDutyArea = $("#lx_quyu").val();
		var fillinOrganization = $("#ajlx_jjstation").val();
		var handleOrgan = $("#ajlx_cjstation").val();
		var caseLabel =$("#ajlx_xsstation").val();
		var listArr = [datestart,dateend,caseDutyArea,fillinOrganization,handleOrgan,caseLabel];

		//点击统计
		$("#lxaj_tj").click(function(){
			
			caseDutyArea = $("#lx_quyu").val();
			fillinOrganization = $("#ajlx_jjstation").val();
			handleOrgan = $("#ajlx_cjstation").val();
			caseLabel =$("#ajlx_xsstation").val();

			startdate = $(".lx_ajstartdate").val().trim();
			enddate = $(".lx_ajenddate").val().trim();
			

			//对时间格式进行处理
			var startArr = startdate.split("-");
					
			var startyear = startArr[0];//
			var startmonth = startArr[1];//
			var startday = startArr[2];
			if(startmonth<10){
				startmonth = "0" + startmonth;
			}
			var startdatehour= startday.split(" ");
			var startdays = startdatehour[0];
			
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


			listArr = [datestart,dateend,caseDutyArea,fillinOrganization,handleOrgan,caseLabel];

			accidentorigin(listArr);
			dostyle(listArr);
			treestyle(listArr);
			 baanstyle(listArr);
			 ajstyle(listArr);
			poanstyle(listArr);
			taopaostyle(listArr);
			sheanstyle(listArr);
			anjianfree(listArr);
			zhuanjia(listArr);
			duban(listArr);
			baomi(listArr);
			weihai(listArr);
			zuoan(listArr);
			buwwei(listArr);
			duixiang(listArr);
			shousduan(listArr);
			tedian(listArr);
			zhuangchang(listArr);
			ruqing(listArr);
			taoli(listArr);
			gongjv(listArr);
			xiaozhang(listArr);
			loaiyuan(listArr);
			tongxun(listArr);
			huodong(listArr);
			fanan(listArr);
		})


		// function optionl(textStr,idStr,description,wxsl,yxsl,yxjqzs,wxjqzs){

			
			
		// 			option = {
		// 						    title : {
		// 						        text: textStr,
		// 						        left: 'center',
		// 						        subtext:"有效警情总数："+ yxjqzs+"，无效警情总数："+wxjqzs,
		// 						        itemGap: 20,
		// 						        textStyle:{color:"rgba(204,204,204,.85)"},
								        
		// 						    },
		// 						    tooltip : {
		// 						        trigger: 'axis'
		// 						    },
								    
		// 						    calculable : true,
		// 						    xAxis : [
		// 								        {
		// 								            type : 'category',
		// 								            data :description,
		// 								            axisLine: {lineStyle: {color: '#B4B4B4',}},
		// 								            axisLabel:{  
		// 								                        interval:0,  
		// 								                        rotate:45 
		// 											},
		// 								        }
		// 						    ],
		// 						    yAxis : [
		// 						        {
		// 						            type : 'value',
		// 						            axisLine: {lineStyle: {color: '#B4B4B4',}},
		// 						        }
		// 						    ],
		// 						     dataZoom : {//实现缩放功能    
		// 		                        show : true,      
		// 		                        realtime : true,    
		// 		                       	start : 0,      
		// 		                        end : 70,
		// 		                        textStyle:{
		// 		                        	color: '#B4B4B4',
		// 		                        },
				                          
		// 		                     },    
		// 						    series : [
		// 						        {
		// 						            name:'有效统计',
		// 						            type:'bar',
		// 						            data:yxsl,
		// 						           	label:{normal:{formatter: '{c}',show:true,position:'top',textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"}}},
		// 							        itemStyle: {
		// 							            normal: {barBorderRadius:5, color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset:  1,color: "rgba(0,185,96,.85)"}, {offset: 0,color: "rgba(3,119,63,.85)"}])}
		// 							        },
								            
		// 						        },
								   
		// 						    ]
		// 			};
		// 		var Chart = echarts.init(document.getElementById(idStr));//'fl_jqlb'
		// 		Chart.setOption(option);
		// }
		function optionl(textStr,idStr,description,wxsl,yxsl,yxjqzs,wxjqzs){
			// if(description.length>10){
			// 	description = description.slice(0,10);
			// 	wxsl = wxsl.slice(0,10);
			// 	yxsl = yxsl.slice(0,10);
			// }
			option = {
						    title : {
						        text: textStr,
						        left: 'center',
						        subtext:"有效警情总数："+ yxjqzs+"，无效警情总数："+wxjqzs,
						        textStyle:{color:"rgba(204,204,204,.85)"},
						        
						    },
						    tooltip : {
						        trigger: 'axis'
						    },
						    // legend: {
						    //     data:['有效统计'],

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
						        }
						    ],
						    //dataZoom : {//实现缩放功能    
		        //                 show : true,      
		        //                 realtime : true,    
		        //                	start : 0,      
		        //                 end : 70,
		        //                 textStyle:{
		        //                 	color: '#B4B4B4',
		        //                 },
		                          
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
		//案件来源
		function accidentorigin(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	
						startDate:datestart,
						endDate:dateend,
						fileType:"find_form",
						dmlb:"FIND_FORM",
						caseDutyArea:caseDutyArea,
						fillinOrganization:fillinOrganization,
						handleOrgan:handleOrgan,
						caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					
					ajly(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function ajly(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("案件来源",'ajly',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}

		}
		accidentorigin(listArr);

		//处理方式
		function dostyle(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	
						fileType:"transact_mode",
						dmlb:"ACCEPT_CASE_MODE",
						startDate:datestart,
						endDate:dateend,
						caseDutyArea:caseDutyArea,
						fillinOrganization:fillinOrganization,
						handleOrgan:handleOrgan,
						caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					clfs(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function clfs(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("处理方式统计",'clfs',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		dostyle(listArr);

		//处理类型
		function treestyle(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"change_type_flag",
						dmlb:"CA_OR_COMMON",
						startDate:datestart,
						endDate:dateend,
						caseDutyArea:caseDutyArea,
						fillinOrganization:fillinOrganization,
						handleOrgan:handleOrgan,
						caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					cllx(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function cllx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("处理类型统计",'cllx',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		treestyle(listArr);

		//报案方式
		function baanstyle(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"report_case_type",
						dmlb:"REPORT_CASE_TYPE2",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					bafs(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function bafs(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("报案方式统计",'bafs',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		 baanstyle(listArr);

		//案件状态
		function ajstyle(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"case_state",
						dmlb:"CASE_STATE_JX2012",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					ajzt(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function ajzt(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("案件状态统计",'ajzt',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		ajstyle(listArr);

		//破案方式
		function poanstyle(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"solve_type",
						dmlb:"CASE_CRACKFASHION",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					pafs(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function pafs(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("破案方式统计",'pafs',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		poanstyle(listArr);

		//逃跑情况代码
		function taopaostyle(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"solve_type",
						dmlb:"CASE_CRACKFASHION",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					tpqk(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function tpqk(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("逃跑情况代码",'tpqk',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		taopaostyle(listArr);

		//涉案类型
		function sheanstyle(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"solve_type",
						dmlb:"CASE_CRACKFASHION",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					salx(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function salx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("涉案类型统计",'salx',description,wxsl,yxsl,yxjqzs,wxjqzs);
			
			}
		}
		sheanstyle(listArr);

		//案件性质
		function anjianfree(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"case_class",
						dmlb:"CASE_CLASS",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					ajxz(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function ajxz(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("案件性质统计",'ajxz',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		 anjianfree(listArr);

		//专家级别
		function zhuanjia(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"specialcasegrade",
						dmlb:"SPECIAL_CASE_GRADE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					zjjb(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function zjjb(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("专家级别统计",'zjjb',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		zhuanjia(listArr);

		//督办级别
		function duban(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"supervisegrade",
						dmlb:"SUPERVISE_GRADE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					dbjb(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function dbjb(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("督办级别统计",'dbjb',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		duban(listArr);

		//密级
		function baomi(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"secret_level",
						dmlb:"SECRET_LEVEL",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					mj(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function mj(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("统计",'mj',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		baomi(listArr);

		//危害程度
		function weihai(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"secret_level",
						dmlb:"SECRET_LEVEL",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					whcd(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function whcd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("危害程度统计",'whcd',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		weihai(listArr);

		//作案时机
		function zuoan(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"select_occasion",
						dmlb:"SELECT_TIME",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					zasj(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function zasj(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("作案时机统计",'zasj',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		zuoan(listArr);

		//处所及部位
		function buwwei(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"select_out_part",
						dmlb:"CHOICE_TYPE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					scbw(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function scbw(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("处所及部位统计",'scbw',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		buwwei(listArr);

		//选择对象
		function duixiang(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"select_object",
						dmlb:"SELECT_OBJECT",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					xzdx(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function xzdx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("选择对象统计",'xzdx',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		duixiang(listArr);
		
		//作案手段
		function shousduan(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"commit_tools",
						dmlb:"CASE_OBJECT",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					zasd(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function zasd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("作案手段统计",'zasd',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		shousduan(listArr);

		//作案特点
		function tedian(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"commit_character",
						dmlb:"OFFENCE_CHARACTERISTIC",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					zatd(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function zatd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("作案特点",'zatd',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		tedian(listArr);

		//专长
		function zhuangchang(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"speciality1",
						dmlb:"SPECIALTY",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					zc(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function zc(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("专长统计",'zc',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		zhuangchang(listArr);

		//侵入方式
		function ruqing(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"invademode1",
						dmlb:"INVADE_MODE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					qrfs(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function qrfs(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("侵入方式统计",'qrfs',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		ruqing(listArr);

		//逃离方式
		function taoli(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"fleemode1",
						dmlb:"ESCAPE_FASHION",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					tlfs(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function tlfs(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("逃离方式统计",'tlfs',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		taoli(listArr);

		//作案工具
		function gongjv(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"tools",
						dmlb:"CASE_OBJECT",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					zagj(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function zagj(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("作案工具统计",'zagj',description,wxsl,yxsl,yxjqzs,wxjqzs);
			
			}
		}
		gongjv(listArr);

		//销赃方式
		function xiaozhang(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"fashion1",
						dmlb:"DISPOSAL_CHANNEL",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					xzfs(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function xzfs(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("销赃方式统计",'xzfs',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		xiaozhang(listArr);

		//工具来源
		function loaiyuan(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"toolssource1",
						dmlb:"TOOL_SOURCE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					gjly(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function gjly(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("工具来源统计",'gjly',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		loaiyuan(listArr);

		//使用通讯工具规律特点
		function tongxun(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"toolssource1",
						dmlb:"TOOL_SOURCE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					txltd(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function txltd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("通讯工具规律特点统计",'txltd',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		tongxun(listArr);

		//活动地区
		function huodong(listArr){

			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"zone1",
						dmlb:"ACTIVE_SCOPE",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					hddq(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function hddq(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("活动地区统计",'hddq',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
		}
		huodong(listArr);

		//案犯地域
		function fanan(listArr){
			$.ajax({
				type:'GET',
				url:'api/caseTrend/byfileType',
				data:{	//startDate:"20180111",
					//endDate:"20180112",
						fileType:"personzone",
						dmlb:"CASE_HAPPEN_AREA",
						startDate:datestart,
							endDate:dateend,
							caseDutyArea:caseDutyArea,
							fillinOrganization:fillinOrganization,
							handleOrgan:handleOrgan,
							caseLabel:caseLabel,
				},
				success:function(data){
					
					var data = JSON.parse(data);

					var description = [];
					var wxsl = [];
					var yxsl = [];
					var yxjqzs = 0;
					var wxjqzs = 0;
					for(var i= 0; i<data.length; i++){
						
						description.push(data[i].dmmc);
						yxsl.push(data[i].YXAJSL);
						wxsl.push(data[i].AJSL-data[i].YXAJSL);
						yxjqzs += data[i].YXAJSL;
						wxjqzs += (data[i].AJSL-data[i].YXAJSL);
					}
					//console.log(yxsl,wxsl,description);
					fady(description,wxsl,yxsl,yxjqzs,wxjqzs)
				}
			});
			
			function fady(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("案犯地域统计",'fady',description,wxsl,yxsl,yxjqzs,wxjqzs);
				
			}
			
		}
		fanan(listArr);

		

	}
	lxfx();
})
		
		
		

		
		