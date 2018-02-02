
// 警情列表
	$("#list_page1").load("html/lbzs/lb_jq.html",function(){

		//页码默认为1
		var pageNO = 1;
		var pageSize = 10;
		var count ;
		var url = "api/tableDetail/getJqPage?pageNow="+ pageNO +"&pageSize="+pageSize;
		var table = $('#table');

	
			//搜索
			$("#search_jq").on("click",function(){

				   //一案一码
				   var am = $("#lb_jqam").val().replace(/[，]/ig,',');
				  //接警单编号
				   var bh = $("#lb_jqbh").val();
				   	 pageNO = 1;
					 pageSize = 10;
				   //利用正则表达式过滤
				   am = trim(am);
				   bh = trim(bh);

				   
				    url = "api/tableDetail/getJqPage?pageNow="+ pageNO +"&pageSize="+100+"&ajbms="+am+"&jjdbhs="+bh;
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
							$("#page_jq").show();
							count = JSON.parse(data).pageCount;
								//页数刷新
			     			if(count<10){
			     				//隐藏跳转页码
			     				$("#page_jq").hide();
			     				$('.showrem_jq ').html(`

								共<span id="thiscount_jq">${count}</span>条记录
					    	`);
			     			}
					     	$(".showpagenum_jq").hide();
							
						}
					})
			})
			
		
	     function positionMap(ids){
				zeroModal.show({
		            title: '地图定位',
		            iframe: true,
		            url: './list/mapPosition.html?ids='+ids+'&type=jjdb', //警情：jjdb  案件asj
		            top:'30px',
		            width: '90%',
		            height: '68%',
		            cancel: true
		        });
		} 	
		

		//生成数据
		var promise = new Promise(function(resolve, reject) {
			window.position = {
			    'click #position_a': function (e, value, row, index) {
			      	if(row.x != "0.0" && row.y != "0.0" && row.x != null && row.y != null){
						positionMap(row.jjdbh);
					}else{
						zeroModal.error({
							content : '定位失败,坐标有误',
							ok : false ,
							width : '20%',
							height : '25%'
						});
					}
			     },
			     'click #detail_a': function (e, value, row, index) {
			      	alert(row.jjdbh+"22222222222");
			     }
			   };

			 //批量定位
		    $("#thisposition").click(function(){
		    	//获取表格勾选项
		    	var select = table.find("tr.selected");
		    	var str = "";
		    	for(var i=0;i<select.length; i++){
		    		var index = select[i].getAttribute("data-index");
		    		var list = table.bootstrapTable('getData')[index];
					str += list.jjdbh+",";
					
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
					    //toolbar: '#thisposition',//绑定搜索按钮
					    // data-locale:"zh-US" , //表格汉化
					    //formatNoMatches:"你妹",
					    search: false, //显示搜索框
					    sidePagination: "server", //服务端处理分页
					    responseHandler:function(res) {
					    	$('.showrem_jq ').html(`

								显示到第${pageSize*(pageNO-1)+1}到第${pageNO*pageSize}条记录，共<span id="thiscount_jq">${res.pageCount}</span>条记录，每页显示${pageSize}条记录
					    	`);
					    	resolve(res.pageCount);
					  //   	$(".no-records-found td").html("未找到匹配记录!");
							// console.log($(".no-records-found td").html());
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
			           			//{ 
					       		//  	checkbox: true,
					       		//  	width:'36px',
					      		// },

			                  {
			                    title: '一案一码',
			                      field: 'ajbm',
			                      align: 'center',
			                      valign: 'middle',
			                      width:'64px',
			                  }, 
			                  {
			                      title: '接警单编号',
			                      field: 'jjdbh',
			                      align: 'center',
			                      valign: 'middle',
			                      width:'230px',
			                  }, 
			                  {
			                      title: '警单类型',
			                      field: 'jdlx',
			                      align: 'center',
			                      width:'64px',
			                  },
			                  {
			                      title: '行政区划',
			                      field: 'xzqhbh',
			                      align: 'center',
			                      width:'71px',
			                  },
			                  {
			                      title: '事发地址',
			                      field: 'sfdz',
			                      align: 'center',
			                      width:'181px',
			                  },
			                   {
			                      title: '报警内容',
			                      field: 'bjnr',
			                      align: 'center',
			                      width:'216px',
			                  },
			                  {
			                      title: '接警单位',
			                      field: 'jjdw',
			                      align: 'center',
			                      width:'65px',
			                  },
			                  {
			                      title: '接警时间',
			                      field: 'jjsj',
			                      align: 'center',
			                      width:'109px',
			                  },
			                   {
			                      title: '报警单位',
			                      field: 'jjdwmc',
			                      align: 'center',
			                      width:'90px',
			                  }, {
			                      title: '出警单位',
			                      field: 'cjdwmc',
			                      align: 'center',
			                      width:'103px',
			                  }, {
			                      title: '出警时间',
			                      field: 'cjsj',
			                      align: 'center',
			                      width:'103px',
			                  }, {
			                      title: '反馈单位',
			                      field: 'fkdwmc',
			                      align: 'center',
			                      width:'103px',
			                  },
			                   {
			                      title: '出警人员',
			                      field: 'cjyxm',
			                      align: 'center',
			                      width:'81px',
			                  },
			                  {
			                      title: '操作',
			                      field: 'id',
			                      align: 'center',
			                      events : position ,
			                      width:'41px',
			                      formatter:function(value,row,index){  
			                  
			                   var d = '<a id="position_a">定位</a> ';
			                   

			                        return d;  
			                    } 
			                  },
			                  
			   
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
		
		promise.then(function(value){
			
			count =parseInt(value/pageSize);
			if(value%pageSize>0){
				count = count+1;
			}
			$(".showpagenum_jq").html(`
				共${count}页
			`);
			//console.log(value,count);
			// console.log("#thiscount_jq").html();

			function getlink(pageNO,pageSize){
				console.log(567);
	     		url = "api/tableDetail/getJqPage?pageNow="+ pageNO +"&pageSize="+pageSize;
		     	table.bootstrapTable('refresh', {url:url });
	     	}
			$("#page_jq").on("click","span",function(){	     	
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
		     		pageSize = 10;
		     		getlink(pageNO,pageSize);
		     	}
		     	if(val == "last"){
		     		pageNO = count;
		     		pageSize = 10;
		     		getlink(pageNO,pageSize);
		     		setTimeout(function(){
			     		$('.showrem_jq ').html(`

									显示到第${pageSize*(pageNO-1)+1}到第${value}条记录，共<span id="thiscount_jq">${value}</span>条记录，每页显示${pageSize}条记录
						 `);
		     			
		     		},500);
		     	}
		    })
		    $("#page_jq").on("click","a",function(){
		    	//获取输入框的值
		    	if($("#page_jq input").val()==""){
		    		return
		    	}else{
		    		pageNO = $("#page_jq input").val();
		    		pageSize = 10;
		    		getlink(pageNO,pageSize);
		    	}
		    })

		    //限制输入框

		    $("#getpage_jq").on("input",function(){
		    	var inputval = $("#getpage_jq").val();
		    	//console.log(inputval,count);
		    	if(inputval<0 || inputval>count || inputval%1!=0 || inputval==0){
		    		$("#getpage_jq").val("")
		    		//console.log("return")
		    		
		    	}
		    })
		});


		$("#jq_clear").click(function(){
			$("#lb_jqam").val("");
			$("#lb_jqbh").val("");
		});


		
	});
	