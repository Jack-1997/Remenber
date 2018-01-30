
//嫌疑人类型分析
$("#asjlxxyr_page1").load("html/lxfx/xyrlx.html",function(){
	//console.log(777)
	function lxfx(){
		var quyu = $("#lxxyr_quyu");
		var quyujjstation = $("#xyrlx_jjstation");
		var quyucjstation = $("#xyrlx_cjstation");
		//var quyufkstation = $("#ajlx_fkstation");
		//console.log(quyustation);

		var promise = new Promise(function(resolve,reject){

				$.ajax({
				    type:'GET',
				    url:'api/dimDicGb/getByDmbh?dmbh=3607',

				    success:function(data){
				       // console.log(JSON.parse(data));
				        var data = JSON.parse(data);
				        var template =`<option value="">区域</option>`;
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
	   	var startdate = $(".lx_xyrstartdate").val().trim();
		var enddate = $(".lx_xyrenddate").val().trim();
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
		var caseDutyArea = $("#lxxyr_quyu").val();
		var fillinOrganization = $("#xyrlx_jjstation").val();
		var handleOrgan = $("#xyrlx_cjstation").val();


		var listArr = [datestart,dateend,caseDutyArea,fillinOrganization,handleOrgan];

		//点击统计
		$("#clacxyr_lx").click(function(){
			caseDutyArea = $("#lxxyr_quyu").val();
			console.log(caseDutyArea);
			fillinOrganization = $("#xyrlx_jjstation").val();
			handleOrgan = $("#xyrlx_cjstation").val();

			startdate = $(".lx_xyrstartdate").val().trim();
			enddate = $(".lx_xyrenddate").val().trim();
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

		 listArr = [datestart,dateend,caseDutyArea,fillinOrganization,handleOrgan];
		 //重新执行
		 	nianling(listArr);
			xiexing(listArr);
			kouying(listArr);
			renkou(listArr);
			tixing(listArr);
			huzhao(listArr);
			tezheng(listArr);
			xianshi(listArr);
			langulage(listArr);
			ident(listArr);
			edudent(listArr);
			sex(listArr);
			polite(listArr);
			xingzheng(listArr);

		});

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
						    // dataZoom : {//实现缩放功能    
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
		//年龄段
		function nianling(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					
					fileType:"age_section",
					dmlb:"AGE_SECTION",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
					
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_nld(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_nld(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("年龄段统计",'xyr_nld',description,wxsl,yxsl,yxjqzs,wxjqzs);

			}
		}
		nianling(listArr);

		//血型
		function xiexing(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"blood_type",
					dmlb:"GA_XX_2001",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_xx(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_xx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("血型统计",'xyr_xx',description,wxsl,yxsl,yxjqzs,wxjqzs);
			}
		}
		xiexing(listArr);

		//口音
		function kouying(listArr){
			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"account",
					dmlb:"ACCOUNT",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_ky(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_ky(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("口音统计",'xyr_ky',description,wxsl,yxsl,yxjqzs,wxjqzs);

			}
		}
		kouying(listArr);
		
		//人口类型
		function renkou(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"population_type",
					dmlb:"POPULATION_TYPE",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_rklx(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_rklx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("人口类型统计",'xyr_rklx',description,wxsl,yxsl,yxjqzs,wxjqzs);

			}
		}
		renkou(listArr);

		//体型
		function tixing(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"bodyshape",
					dmlb:"SHAPE",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_tx(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_tx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("体型统计",'xyr_tx',description,wxsl,yxsl,yxjqzs,wxjqzs);

			}
		}
		tixing(listArr)

		//护照证件类型
		function huzhao(listArr){
			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"passport_code",
					dmlb:"PASSPORT_TYPE",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_hzzjlx(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_hzzjlx(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("护照证件类型统计",'xyr_hzzjlx',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
			
		}
		huzhao(listArr);

		//特殊特征
		function tezheng(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"specialfeature1",
					dmlb:"FACE_BODY",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_tstz(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_tstz(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("特殊特征统计",'xyr_tstz',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		tezheng(listArr);


		//现时状况
		function xianshi(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"status_flag",
					dmlb:"MANSTATUS",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_xszk(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_xszk(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("现时状况统计",'xyr_xszk',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		xianshi(listArr);

		//语言特征
		function langulage(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"languagecharacter",
					dmlb:"LANGUAGE_CHARACTER",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_yytz(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_yytz(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("语言特征统计",'xyr_yytz',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		langulage(listArr);

		//身份
		function ident(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGa",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"status",
					dmlb:"STATUS",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_sf(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_sf(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("身份统计",'xyr_sf',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		 ident(listArr);

		//教育程度
		function edudent(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGb",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"educate_degree",
					dmlb:"GB_WHCD_1984",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_jycd(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_jycd(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("教育程度统计",'xyr_jycd',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		edudent(listArr);

		//性别
		function sex(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGb",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"sex",
					dmlb:"GB_XB_1980",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_xb(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_xb(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("性别统计",'xyr_xb',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		sex(listArr);

		//政治面貌
		function polite(listArr){

			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGb",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"politicstatus",
					dmlb:"GOVERN_VISAGE",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_zzmm(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_zzmm(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("政治面貌统计",'xyr_zzmm',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
		}
		polite(listArr);

		//行政区划
		function xingzheng(listArr){
			$.ajax({
				type:"GET",
				url:"api/suspectTrend/byfileTypeGb",
				data:{
					// startDate:"20171201",
					// endDate:"20181201",
					//jqqybh:"360700",
					fileType:"native_place",
					dmlb:"GB_XZQH_2002",
					startDate:datestart,
					endDate:dateend,
					caseDutyArea:caseDutyArea,
					fillinOrganization:fillinOrganization,
					handleOrgan:handleOrgan,
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
						yxsl.push(data[i].YXXXRS);
						wxsl.push(data[i].XXRS-data[i].YXXXRS);
						yxjqzs += data[i].YXXXRS;
						wxjqzs += (data[i].XXRS-data[i].YXXXRS);
					}
					// console.log(description,wxsl,yxsl,yxjqzs,wxjqzs);
					
					xyr_zzmm(description,wxsl,yxsl,yxjqzs,wxjqzs);
				}	
			});

			function xyr_zzmm(description,wxsl,yxsl,yxjqzs,wxjqzs){
				optionl("行政区划统计",'xyr_xzqh',description,wxsl,yxsl,yxjqzs,wxjqzs);

				
			}
			
		}
		xingzheng(listArr);
	}
	lxfx();
});