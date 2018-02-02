// 列表案件展示

	$("#list_page2").load("html/lbzs/lb_aj.html",function(){

		//页码默认为1
		var pageNO = 1;
		var pageSize = 10;
		var count ;
		var url = "api/tableDetail/getAsjPage?pageNow="+ pageNO +"&pageSize="+pageSize;
		var table = $('#table_aj');


		//搜索
	    $("#search_aj").on("click",function(){

		   //一案一码
		   var am = $("#lb_ajam").val().replace(/[，]/ig,',');
		  //受案编号
		   var bh = $("#lb_ajbh").val();
		  
		   //利用正则表达式过滤
		   am = trim(am);
		   bh = trim(bh);
		  
		    url = "api/tableDetail/getAsjPage?pageNow=1&pageSize=100&pauses="+am+"&transactCaseCodes="+bh;
	     	table.bootstrapTable('refresh', {url:url });

		   //过滤所有空格
		    function trim(str){ 
			return str.replace(/\s/g, ""); 
			} 

			//获取总条数
			$.ajax({
				type:"GET",
				url:url,
				success:function(data){

					$("#page_aj").show();
					count = JSON.parse(data).pageCount;
					console.log(data);
						//页数刷新
	     			if(count<10){
	     				//隐藏跳转页码
	     				$("#page_aj").hide();
	     				$('.showrem_aj ').html(`

						共<span id="thiscount_aj">${count}</span>条记录
			    	`);
	     			}
			     	$(".showpagenum_aj").hide();
				}
			})
	    })
		//生成数据

		function positionMap(ids){
			zeroModal.show({
	            title: '地图定位',
	            iframe: true,
	            url: './list/mapPosition.html?ids='+ids+'&type=asj', //警情：jjdb  案件asj
	            top:'30px',
	            width: '90%',
	            height: '68%',
	            cancel: true
	        });
		} 	

		var promise = new Promise(function(resolve, reject) {
			window.position = {
			    'click #casePosition_a': function (e, value, row, index) {
			      	if(row.x_zb != "0.0" && row.y_zb != "0.0" && row.x_zb != null && row.y_zb != null){
						positionMap(row.transactCaseCode);
					}else{
						zeroModal.error({
							content : '定位失败,坐标有误',
							ok : false ,
							width : '20%',
							height : '25%'
						});
					}
			     },
			     'click #caseDetail_a' : function(e, value, row, index){
			 		window.open("http://10.138.86.205/html/detail.html?element=aj&id="+row.transactCaseCode+"&q="+row.transactCaseCode);
			 	 },
			 	 'click #caseSeriseShunt_a' : function(e, value, row, index){
			 	 	window.open("./html/cbafx/cbafx.html?transactCaseCode="+row.transactCaseCode);
			 	 }
			};

			  //批量定位
		    $("#thatposition").click(function(){
		    	//获取表格勾选项
		    	var select = table.find("tr.selected");
		    	var str = "";
		    	for(var i=0;i<select.length; i++){
		    		var index = select[i].getAttribute("data-index");
		    		var list = table.bootstrapTable('getData')[index];
					str += list.transactCaseCode+",";
					
		    	}
		    	str = str.slice(0,-1);
		    	//传参
		    	positionMap(str);
		    })
			table.bootstrapTable({

					    url: url, 

					    dataType: "json",
					    pagination: false, //分页
					    singleSelect: false,
					    // data-locale:"zh-US" , //表格汉化
					    search: false, //显示搜索框
					    sidePagination: "server", //服务端处理分页
					    responseHandler:function(res) {
					    	$('.showrem_aj ').html(`

								显示到第${pageSize*(pageNO-1)+1}到第${pageNO*pageSize}条记录，共<span id="thiscount_aj">${res.pageCount}</span>条记录，每页显示${pageSize}条记录
					    	`);
					    	resolve(res.pageCount);
					    	//console.log(res.pageCount,pageNO,pageSize);
		                	return {
		                    "total":res.pageCount,//总页数
		                    "rows": res.datas  //数据
		                 	} 

		        		},

			          	columns: [
			          		{  
		                        //field: 'Number',//可不加  
		                        title: '序号',//标题  可不加  
		                        formatter: function (value, row, index) {  
		                            return index+1;  
		                        }  
		                    },
			         //  		{ 
					       //  	checkbox: true,
					       //  	width:"36px",
					      	// },
			                  {
			                    title: '一案一码',
			                      field: 'pause',
			                      align: 'center',
			                      valign: 'middle',
			                      width:'5%',//"64px",
			                  }, 
			                  {
			                      title: '受案编号',
			                      field: 'transactCaseCode',
			                      align: 'center',
			                      valign: 'middle',
			                      width:'10%',//"181px",
			                  }, 
			                  {
			                      title: '行政刑事分类',
			                      field: 'caseLabel',
			                      align: 'center',
			                      width:'7%',//"89px",
			                      formatter:function(value,row,index){
			                      	return thisclassify(value);
			                      }
			                      
			                      //  formatter:function(value,row,index){
			                      // 	return formatDateTime(value);
			                      // },
			                  },
			                  {
			                      title: '案件名称',
			                      field: 'caseName',
			                      align: 'center',
			                      width:'13%',//"140px",
			                  },
			                  {
			                      title: '发案区域',
			                      field: 'occurSection',
			                      align: 'center',
			                      width:"5%",//"65px",

			                  },
			                   {
			                      title: '发案地址',
			                      field: 'reportCaseAddress',
			                      align: 'center',
			                      width:"9%",//"100px",
			                  },
			                   {
			                      title: '报案内容',
			                      field: 'briefCaseInfo',
			                      align: 'center',
			                      width:"30%",//"230px",
			                  }, {
			                      title: '发案时间上限',
			                      field: 'caseStartDate',
			                      align: 'center',
			                      width:"5%",//"90px",
			                     
			                      // formatter:function(value,row,index){
			                      // 	return formatDateTime(value);
			                      // },
			                  },
			                  {
			                      title: '发案时间下限',
			                      field: 'caseEndDate',
			                      align: 'center',
			                      width:'5%',//"90px",
			                      //  formatter:function(value,row,index){
			                      // 	return formatDateTime(value);
			                      // },
			                  },
			                  {
			                      title: '立案时间',
			                      field: 'registerDate',
			                      align: 'center',
			                      width:'5%',//"90px",
			                      //  formatter:function(value,row,index){
			                      // 	return formatDateTime(value);
			                      // },
			                  }, {
			                      title: '破案日期',
			                      field: 'solveCaseDate',
			                      align: 'center',
			                      width:'5%',//"90px",
			                      //  formatter:function(value,row,index){
			                      // 	return formatDateTime(value);
			                      // },
			                  },
			                   {
			                      title: '办案单位',
			                      field: 'handleOrgan',
			                      align: 'center',
			                      width:"15%",//"150px",
			                  },
			                  {
			                      title: '办案人',
			                      field: 'handleName',
			                      align: 'center',
			                      width:"7%",//"77px",
			                  },
			                  {
			                      title: '操作',
			                      field: 'id',
			                      align: 'center',
			                      events : position ,
			                      width:"7%",//"80px",
			                      formatter:function(value,row,index){  
			                  		var e = '<a id="caseDetail_a">详情</a> ';  
			                   		var d = '<a id="casePosition_a">定位</a> ';
			                   		var f = '<a id="caseSeriseShunt_a">串并</a> ';  

			                        return e+d+f;  
			                    } 
			                  }
			            ],
			            //自定义提示语
			            formatNoMatches: function(){
							        return "没有相关的匹配结果";
						},

						formatLoadingMessage: function(){
							        return "请稍等，正在加载中。。。";
						},
			});	
		});

		// function aaa(value){
		// 	return "aaa"+value;
		// }

		function thisclassify(value){
			if(value == "1"){
				return "刑事"
			}else if(value == "2"){
				return "行政"
			}
		
		}

		function formatDateTime(inputTime) {    
		    var date = new Date(inputTime*1000);  
		    var y = date.getFullYear();    
		    var m = date.getMonth() + 1;    
		    m = m < 10 ? ('0' + m) : m;    
		    var d = date.getDate();    
		    d = d < 10 ? ('0' + d) : d;    
		    var h = date.getHours();  
		    h = h < 10 ? ('0' + h) : h;  
		    var minute = date.getMinutes();  
		    var second = date.getSeconds();  
		    minute = minute < 10 ? ('0' + minute) : minute;    
		    second = second < 10 ? ('0' + second) : second;   
		    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
		}; 
		
		promise.then(function(value){
			
			count =parseInt(value/pageSize);
			if(value%pageSize>0){
				count = count+1;
			}
			$(".showpagenum_aj").html(`
				共${count}页
			`);
			//console.log(value,count);
			// console.log("#thiscount_aj").html();

			function getlink(){
	     		url = "api/tableDetail/getAsjPage?pageNow="+ pageNO +"&pageSize="+pageSize;
		     	table.bootstrapTable('refresh', {url:url });
	     	}
			$("#page_aj").on("click","span",function(){	     	
	     	//console.log(this.attributes[0].value);
	     	
		     	var val = this.attributes[0].value;
		     	if(val == "prev"&& pageNO >1){
		     		pageNO = Number(pageNO) -1;
		     		getlink();
		     	}
		     	if(val!="prev" &&val!="next" && val!="last"){
		     		pageNO = val;
		     		if(pageNO>count){
		     			return
		     		}
		     		pageSize = 10;
		     		getlink();
		     		
		     	}
		     	if(val == "next"&& pageNO <count){
		     		pageNO = Number(pageNO) +1;
		     		getlink();
		     	}
		     	if(val == "last"){

		     		pageNO = count;

		     		getlink();
		     		setTimeout(function(){
			     		$('.showrem_aj ').html(`

									显示到第${pageSize*(pageNO-1)+1}到第${value}条记录，共<span id="thiscount_jq">${value}</span>条记录，每页显示${pageSize}条记录
						 `);
		     			
		     		},500);
		     	}
		    })
		    $("#page_aj").on("click","a",function(){
		    	//获取输入框的值
		    	if($("#page_aj input").val()==""){
		    		return
		    	}else{
		    		pageNO = $("#page_aj input").val();
		    		pageSize = 10;
		    		getlink(pageNO,pageSize);
		    		
		    	}
		    })

		    //限制输入框

		    $("#getpage").on("input",function(){console.log(88)
		    	var inputval = $("#getpage").val();
		    	if(inputval<0 || inputval>count || inputval%1!=0 || inputval==0){
		    		$("#getpage").val("")
		    		//console.log("return")
		    		
		    	}
		    })    
		});

		$("#aj_clear").click(function(){
			$("#lb_ajam").val("");
			$("#lb_ajbh").val("");
		})
		
	});
