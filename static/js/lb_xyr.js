// 嫌疑人列表

$("#list_page3").load("html/lbzs/lb_xyr.html",function(){

		//页码默认为1
		var pageNO = 1;
		var pageSize = 10;
		var count ;
		var url = "api/tableDetail/getXyrPage?pageNow="+ pageNO +"&pageSize="+pageSize;
		var table = $('#table_xyr');

		//搜索
		$("#search_xyr").on("click",function(){

			   //一案一码
			   var am = $("#lb_xyram").val().replace(/[，]/ig,',');
			  //受案编号
			   var bh = $("#lb_xyrbh").val();
			   //身份证号
			   var sfz = $("#lb_xyrsfz").val();
			   //利用正则表达式过滤
			   am = trim(am);
			   bh = trim(bh);
			   sfz = trim(sfz);
			   url = "api/tableDetail/getXyrPage?pageNow=1&pageSize=100&pauses="+am+"&transactCaseCodes="+bh+"&idCardCodes="+sfz;
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
						$("#page_xyr").show();
						count = JSON.parse(data).pageCount;
						pagecount = Math.ceil(count/10);
						
		     				$("#page_xyr").hide();
		     				$('.showrem_xyr ').html(`

							共<span id="thiscount_xyr">${count}</span>条记录
				    	`);
		     			
				     	$(".showpagenum_xyr").hide();

						//点击对应的按钮跳转

					}
				})
		})

		//生成数据

		var promise = new Promise(function(resolve, reject) {
			window.position = {
			 	 'click #supSeriseShunt_a' : function(e, value, row, index){
			 	 	window.open("./html/cbafx/cbafx.html?transactCaseCode="+row.transactCaseCode);
			 	 }
			};
			table.bootstrapTable({

					    url: url, 

					    dataType: "json",
					    pagination: false, //分页
					    //singleSelect: false,
					    // data-locale:"zh-US" , //表格汉化
					    search: false, //显示搜索框
					    sidePagination: "server", //服务端处理分页
					    responseHandler:function(res) {
					    	$('.showrem_xyr ').html(`

								显示到第${pageSize*(pageNO-1)+1}到第${pageNO*pageSize}条记录，共<span id="thiscount_xyr">${res.pageCount}</span>条记录，每页显示${pageSize}条记录
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
			          		
					      	 {
			                    title: '一案一码',
			                      field: 'pause',
			                      align: 'center',
			                      valign: 'middle',
			                      width:"64px",
			                  }, 
			                  {
			                    title: '身份证号',
			                      field: 'idCardCode',
			                      align: 'center',
			                      valign: 'middle',
			                      width:"144px",
			                  }, 
			                  {
			                      title: '姓名',
			                      field: 'name',
			                      align: 'center',
			                      valign: 'middle',
			                      width:"60px",
			                  }, 
			                  {
			                      title: '曾用名',
			                      field: 'alias',
			                      align: 'center',
			                      width:"60px",
			                  },
			                  {
			                      title: '绰号',
			                      field: 'nickname',
			                      align: 'center',
			                      width:"60px",
			                  },

			                  {
			                      title: '性别',
			                      field: 'sex',
			                      align: 'center',
			                      width:"60px",

			                  },
			                  {
			                      title: '民族',
			                      field: 'peoples',
			                      align: 'center',
			                      width:"60px",
			                  },
			             		{
			                      title: '籍贯',
			                      field: 'nativePlace',
			                      align: 'center',
			                     width:"121px",
			          
			                  },
			                  {
			                      title: '登记时间',
			                      field: 'created',
			                      align: 'center',
			                      width:"132px",
			                       
			                  },
			                 {
			                      title: '受案编号',
			                      field: 'transactCaseCode',
			                      align: 'center',
			                      width:"181px",
			         
			                  },
			                  {
			                      title: '案件名称',
			                      field: 'caseName',
			                      align: 'center',
			                      width:"281px",
			                     
			          
			                  },
			                  {
			                      title: '涉嫌罪名',
			                      field: 'accusal',
			                      align: 'center',
			                      width:"165px",
			                     
			          
			                  },
			                  {
			                      title: '主从犯',
			                      field: 'mainAccessory',
			                      align: 'center',
			                     width:'100px',
								 formatter:function(value,row,index){ 
								 	if(value == "01"){
								 		return "主犯";
								 	}else if(value == "02"){
								 		return "从犯";
								 	}else{
								 		return value;
								 	}
								 }
			          			
			                  },
			                  {
			                      title: '操作',
			                      field: 'id',
			                      align: 'center',
			                      events : position ,
			                      width:'100px',
			                      formatter:function(value,row,index){  
			                   // var e = '<a href="#" mce_href="#" onclick="edit(\''+ row.jjdbh + '\')">详情</a> ';  
			                   // var d = '<a href="#" mce_href="#" onclick="del(\''+ row.jjdbh +'\')">定位</a> ';
			                   		var f = '<a id="supSeriseShunt_a">串并</a> '; 

			                        return f;  
			                    } 
			                  }
			            ]
			});
			
		});

		// function aaa(value){
		// 	return "aaa"+value;
		// }
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
			$(".showpagenum_xyr").html(`
				共${count}页
			`);
			console.log(value,count);
			// console.log("#thiscount_xyr").html();

			function getlink(pageNO,pageSize){
	     		url = "api/tableDetail/getXyrPage?pageNow="+ pageNO +"&pageSize="+pageSize;
		     	table.bootstrapTable('refresh', {url:url });
	     	}
			$("#page_xyr").on("click","span",function(){	     	
	     	//console.log(this.attributes[0].value);
	     	
		     	var val = this.attributes[0].value;
		     	if(val == "prev"&& pageNO >1){
		     		pageNO = Number(pageNO) -1;
		     		pageSize = 10;
		     		getlink(pageNO,pageSize);
		     	}
		     	if(val!="prev" &&val!="next" && val!="last"){
		     		pageNO = val;
		     		if(pageNO>count){
		     			return
		     		}
		     		pageSize = 10;
		     		getlink(pageNO,pageSize);
		     		
		     	}
		     	if(val == "next"&& pageNO <count){
		     		pageNO = Number(pageNO) +1;
		     		getlink(pageNO,pageSize);
		     	}
		     	if(val == "last"){
		     		pageNO = Number(count);
		     		pageSize = 10;
		     		console.log(pageNO);
		     		getlink(pageNO,pageSize);
		     		setTimeout(function(){
			     		$('.showrem_xyr ').html(`

									显示到第${pageSize*(pageNO-1)+1}到第${value}条记录，共<span id="thiscount_xyr">${value}</span>条记录，每页显示${pageSize}条记录
						 `);
		     			
		     		},500);
		     	}
		    })
		    $("#page_xyr").on("click","a",function(){
		    	//获取输入框的值
		    	if($("#page_xyr input").val()==""){
		    		return
		    	}else{
		    		pageNO = $("#page_xyr input").val();
		    		pageSize = 10;
		    		getlink(pageNO,pageSize);
		    	}
		    })

		    //限制输入框

		    $("#getpage_xyr").on("input",function(){console.log(count)
		    	var inputval = $("#getpage_xyr").val();
		    	if(inputval<0 || inputval>count || inputval%1!=0 || inputval==0){
		    		$("#getpage_xyr").val("")
		    		//console.log("return")
		    		
		    	}
		    })    
		});

		$("#xyr_clear").click(function(){
			$("#lb_xyram").val("");
			$("#lb_xyrbh").val("");
			$("#lb_xyrsfz").val("");
		});
		
});