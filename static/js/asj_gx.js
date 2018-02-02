

    function addClickEventsToEcharts(Chart) {
        Chart.on("click", function (param){
            var lx = param;
            var Chart = echarts.init(document.getElementById('gx'));
            var option = Chart.getOption();
            var removeCaseCode = "";
            var removeCodeValue = "";
            var tableHtml = "<tr><th>嫌疑人</th><th>电话号码</th><th>车牌号</th><th>案件名称</th><th>报案内容</th><th>案由</th><th>现勘情况</th><th>破案经过</th><th>侦查员作案过程分析</th></tr>";
            $("#cbafxTab").html("");
            var xyr = "";
            var dhhm = "";
            var cph = "";
            for (var i in option.series[0].data) {
                if(option.series[0].data[i].category=="案") {
                    if(i == option.series[0].data.length-1) {
                        removeCaseCode += option.series[0].data[i].name;
                    }else {
                        removeCaseCode += option.series[0].data[i].name+",";
                    }
                }else {
                    if(i == option.series[0].data.length-1) {
                        removeCodeValue += option.series[0].data[i].name;
                    }else {
                        removeCodeValue += option.series[0].data[i].name+",";
                    }
                    if(option.series[0].data[i].category=="人") {
                        xyr += option.series[0].data[i].name+",<br>";
                    }else if(option.series[0].data[i].category=="号") {
                        dhhm += option.series[0].data[i].name+",<br>";
                    }else if(option.series[0].data[i].category=="车") {
                        cph += option.series[0].data[i].name+",<br>";
                    }
                }
            }
            tableHtml += "<tr><td>"+xyr+"</td><td>"+dhhm+"</td><td>"+cph+"</td>";
            var category = lx.data.category;
            $("#cbafxTip").hide();
            $('#cbafxCaseCode').attr("value",removeCaseCode);
            $('#cbafxCodeValue').attr("value",lx.name);
            $('#removeCodeValue').attr("value",removeCodeValue);
            $("#cbafxTab").hide();
            $("#code").css({"width":"200px","height":"70px"});
            $(".close1").css({"width":"200px","height":"30px"});
            var element = "";
            var id = lx.name;
            var esSearchURL = "http://10.138.86.205/html/detail.html";
            if(category=='案') {
                $("#cbafxTab").show();
                element = "aj";
                $("#code").css({"width":"800px","height":"500px"});
                $(".close1").css({"width":"800px","height":"60px"});
                $.ajax({
                    type:'GET',
                    url:'api/caseTrend/getCaseDetail',
                    async:false,
                    data:{
                        "case_code":id
                    },
                    success:function(data){
                        if(!data){
                            tableHtml += "<td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                            $("#cbafxTip").text("未找到案件详情！");
                            $("#cbafxTip").show();
                        }else{
                            data = JSON.parse(data);
                            tableHtml += "<td>"+data.CASE_NAME+"</td><td>"+data.BRIEF_CASE_INFO+"</td><td>"+data.CASE_REASON+"</td><td>"+data.RESEARCH_RESULTS+"</td><td>"+data.PROCESS_RESULTS+"</td><td>"+data.PROCESSANALYZE+"</td></tr>";
                        }
                        $("#cbafxTab").html(tableHtml);
                    }
                });
            }
            $('#cbafxDetail').show();
            if(category=='人') {
                element = "ry";
            }
            if(category=='号') {
                $('#cbafxDetail').hide();
            }
            if(category=='车') {
                element = "wp";
            }
            $('#cbafxDetail').attr("href",esSearchURL+"?element="+element+"&id="+id+"&q="+id);
            $('#code').center();
            $('#goodcover').show();
            $('#code').fadeIn();
        });
    }
    function gx_fun() {
        var url = location.search;   
        var Request = new Object();
        if(url.indexOf("?") != -1){
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0 ; i < strs.length ; i++){
                Request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        var transactCaseCode = Request["transactCaseCode"];
        /*[
         {name: '案AAAAAAAAAAAAAAAAAAAAAA',category:'案',symbol: 'roundRect',symbolSize:[60,20]},
         {name: '张三',category:'人',symbol: 'circle',symbolSize:45},
         {name: '案EEEEEEEEEEEEEEEEEEEEEE',category:'案',symbol: 'roundRect',symbolSize:[60,20]},
         {name: '13000000000',category:'号',symbol: 'triangle',symbolSize:20},
         {name: '案BBBBBBBBBBBBBBBBBBBBBB',category:'案',symbol: 'roundRect',symbolSize:[60,20]},
         {name: '案CCCCCCCCCCCCCCCCCCCCCC',category: '案',symbol: 'roundRect',symbolSize:[60,20]},
         {name: '赣A000000',category:'车',symbol: 'arrow',symbolSize:20},
         {name: '案DDDDDDDDDDDDDDDDDDDDDD',category: '案',symbol: 'roundRect',symbolSize:[60,20]},
         ]
         [
         {source: "A3601001103002013090002", target: "360121197111082952", value: "嫌疑"},
         {source: "A3601001103002013090002", target: "360121198812112936", value: "嫌疑"}
         ]*/
        var asjData = [];
        var asjLinkData = [];
        $.ajax({
            type:'GET',
            url:'api/caseTrend/getCaseConnectData',
            data : {
                "case_code":transactCaseCode
            },
            async:false,
            success:function(data){
                data = JSON.parse(data);
                var listData = data.asjData;
                var listLinkData = data.asjLinkData;
                
                if(!data){
                   return;
                }else{
                    if(data.asjData.length > 0){
                         for(var i in listData) {
                                var symbolObj = '';
                                if(listData[i].category=='案') {
                                    symbolObj = 'image://html/cbafx/case.jpg';
                                }
                                if(listData[i].category=='人') {
                                    symbolObj = 'image://html/cbafx/user.jpg';
                                }
                                if(listData[i].category=='号') {
                                    symbolObj = 'image://html/cbafx/phone.jpg';
                                }
                                if(listData[i].category=='车') {
                                    symbolObj = 'image://html/cbafx/timg.jpg';
                                }
                                asjData.push({name:listData[i].name,category:listData[i].category,symbol:symbolObj,symbolSize:[50,50],value:listData[i].case_name});
                        }
                        for(var i in listLinkData) {
                            asjLinkData.push({source:listLinkData[i].source,target:listLinkData[i].target,value:listLinkData[i].val});
                        }
                    }else{
                         alert("对不起，未找到该案件的串并案关系。");
                    }
                }
            }
        });
        
        option = {
            title: {text: ''},
            tooltip: {formatter:'{b}'},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            label: {normal: {show: true,textStyle: {fontSize: 12},}},
            legend: {
                x: "center",
                data: ["案","人", "号", '车'],
                textStyle:{color: 'rgba(155,166,198,1)',fontSize: 12,fontWeight: "bold"},
            },
            series: [{
                type: 'graph',
                layout: 'force',  //图的布局，'none'不采用任何布局，'circular'环形布局，'force'引导布局
                force: {repulsion: 1000},
                focusNodeAdjacency: true,
                symbol:['roundRect'], //节点形状
                symbolSize: 45, //节点大小
                roam: true, //关系图可缩放并拖曳
                nodeScaleRatio:0, //节点不缩放
                draggable:true,//节点可拖曳
                itemStyle:{normal:{
                    label:{
                        formatter:function(param) {
                           if(param.data.category=='案'&&param.data.value) {
                               return param.data.value;
                           }else {
                               return  param.data.name.slice(0,10)+"...";
                           }
                        }
                    }
                }},
                focusNodeAdjacency:false, //突出显示鼠标所放节点及边缘
                categories: [
                    {name: '案',itemStyle: {normal: {color:"rgba(0,102,255,.85)",}}},
                    {name: '人',itemStyle: {normal: {color: "rgba(113,129,248,.85)",}}},
                    {name: '号',itemStyle: {normal: {color: "rgba(0,185,96,.85)",}}},
                    {name: '车',itemStyle: {normal: {color: "rgba(0,233,255,.85)",}}}
                ],
                label: {normal: {show: true,textStyle: {fontSize: 12},position:'bottom'}},
                edgeLabel: {normal: {show: true,textStyle: {fontSize: 10},formatter: "{c}"}},
                data: asjData,
                links: asjLinkData,
                lineStyle: {normal: {opacity: 0.9,width: 1,curveness: 0}}
            }]
        };
        var Chart = echarts.init(document.getElementById('gx'));
        Chart.setOption(option);
        addClickEventsToEcharts(Chart);
    }
    gx_fun();

    $(function() {
        $('#closebt').click(function() {
            $('#code').hide();
            $('#goodcover').hide();
        });
        $('#goodcover').click(function() {
            $('#code').hide();
            $('#goodcover').hide();
        });
        jQuery.fn.center = function(loaded) {
            var obj = this;
            body_width = parseInt($(window).width());
            body_height = parseInt($(window).height());
            block_width = parseInt(obj.width());
            block_height = parseInt(obj.height());

            left_position = parseInt((body_width / 2) - (block_width / 2) + $(window).scrollLeft());
            if (body_width < block_width) {
                left_position = 0 + $(window).scrollLeft();
            };

            top_position = parseInt((body_height / 2) - (block_height / 2) + $(window).scrollTop());
            if (body_height < block_height) {
                top_position = 0 + $(window).scrollTop();
            };

            if (!loaded) {

                obj.css({
                    'position': 'absolute'
                });
                obj.css({
                    'top': ($(window).height() - $('#code').height()) * 0.5,
                    'left': left_position
                });
                $(window).bind('resize', function() {
                    obj.center(!loaded);
                });
                $(window).bind('scroll', function() {
                    obj.center(!loaded);
                });

            } else {
                obj.stop();
                obj.css({
                    'position': 'absolute'
                });
                obj.animate({
                    'top': top_position
                }, 200, 'linear');
            }
        }
        $("#cbafxBth").click(function() {
            var cbafx_case_code = $("#cbafx_case_code").val();
            var cbafx_cert_no = $("#cbafx_cert_no").val();
            var cbafx_mobile = $("#cbafx_mobile").val();
            var cbafx_car_no = $("#cbafx_car_no").val();
            cbafx_case_code = $.trim(cbafx_case_code);
            cbafx_cert_no = $.trim(cbafx_cert_no);
            cbafx_mobile = $.trim(cbafx_mobile);
            cbafx_car_no = $.trim(cbafx_car_no);
            var code_value = "";
            if(cbafx_car_no!=null&&cbafx_car_no!="") {
                code_value = cbafx_car_no;
            }
            if(cbafx_mobile!=null&&cbafx_mobile!="") {
                code_value = cbafx_mobile;
            }
            if(cbafx_cert_no!=null&&cbafx_cert_no!="") {
                code_value = cbafx_cert_no;
            }
            $.ajax({
                type:'GET',
                url:'api/caseTrend/getCaseConnectData',
                data:{
                    "case_code":cbafx_case_code,
                    "code_value":code_value
                },
                success:function(data){
                    data = JSON.parse(data);
                    var listData = data.asjData;
                    var listLinkData = data.asjLinkData;
                    if(data.length == 0){
                        return;
                    }else{
                        var asjData = [];
                        var asjLinkData = [];
                        for(var i in listData) {
                            var symbolObj = '';
                            if(listData[i].category=='案') {
                                symbolObj = 'image://html/cbafx/case.jpg';
                            }
                            if(listData[i].category=='人') {
                                symbolObj = 'image://html/cbafx/user.jpg';
                            }
                            if(listData[i].category=='号') {
                                symbolObj = 'image://html/cbafx/phone.jpg';
                            }
                            if(listData[i].category=='车') {
                                symbolObj = 'image://html/cbafx/timg.jpg';
                            }
                            asjData.push({name:listData[i].name,category:listData[i].category,symbol:symbolObj,symbolSize:[50,50],value:listData[i].case_name});
                        }
                        for(var i in listLinkData) {
                            asjLinkData.push({source:listLinkData[i].source,target:listLinkData[i].target,value:listLinkData[i].val});
                        }
                        var Chart = echarts.init(document.getElementById('gx'));
                        var option = Chart.getOption();
                        option.series[0].data=asjData;
                        option.series[0].links=asjLinkData;
                        Chart.setOption(option);
                        addClickEventsToEcharts(Chart);
                    }
                }
            });
        });
        $("#cbafxMore").click(function() {
            var cbafxCaseCode = $("#cbafxCaseCode").val();
            var cbafxCodeValue = $("#cbafxCodeValue").val();
            var removeCodeValue = $("#removeCodeValue").val();
            $('#code').hide();
            $('#goodcover').hide();
            $.ajax({
                type:'GET',
                url:'api/caseTrend/getCaseConnectData',
                data:{
                    "case_code":cbafxCaseCode,
                    "code_value":cbafxCodeValue,
                    "flag":"1",
                    "remove_code_value":removeCodeValue
                },
                success:function(data){
                    if(data){
                        data = JSON.parse(data);
                        var asjData = data.asjData;
                        var asjLinkData = data.asjLinkData;
                        var Chart = echarts.init(document.getElementById('gx'));
                        var option = Chart.getOption();
                        for(var i in asjData) {
                            var symbolObj = '';
                            if(asjData[i].category=='案') {
                                symbolObj = 'image://html/cbafx/case.jpg';
                            }
                            if(asjData[i].category=='人') {
                                symbolObj = 'image://html/cbafx/user.jpg';
                            }
                            if(asjData[i].category=='号') {
                                symbolObj = 'image://html/cbafx/phone.jpg';
                            }
                            if(asjData[i].category=='车') {
                                symbolObj = 'image://html/cbafx/timg.jpg';
                            }
                            option.series[0].data.push({name:asjData[i].name,category:asjData[i].category,symbol:symbolObj,symbolSize:[50,50],value:asjData[i].value});
                        }
                        for(var i in asjLinkData) {
                            option.series[0].links.push({source:asjLinkData[i].source,target:asjLinkData[i].target,value:asjLinkData[i].val});
                        }
                        Chart.setOption(option);
                        addClickEventsToEcharts(Chart);
                    }else{
                        return;
                    }
                }
            });
        });
    });




