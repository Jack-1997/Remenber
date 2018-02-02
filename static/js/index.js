$(document).ready(function(e) {
        $(".menu-list").hide();
        $("#tab_title>ul li").mouseenter (
            function() {
                $(this).children("ul").slideDown(200);
            }
        ).mouseleave (
            function() {
                $(this).children("ul").slideUp(200);
            }
        )
});

	$(function() {
		$("#qsfx_jq").click(function() {
            $("#linkhere")[0].src = "list/qs_jq.html";
            $("#linkhere")[0].style.height = "1340px";
		});
        $("#qsfx_aj").click(function() {
            $("#linkhere")[0].src = "list/qs_aj.html";
             $("#linkhere")[0].style.height = "1340px";
        });
        $("#qsfx_xyr").click(function() {
            $("#linkhere")[0].src = "list/qs_xyr.html";
             $("#linkhere")[0].style.height = "1340px";
        });
        $("#qyfx_jq").click(function() {
            $("#linkhere")[0].src = "list/qy_jq.html";
             $("#linkhere")[0].style.height = "900px";
        });
        $("#qyfx_aj").click(function() {
            $("#linkhere")[0].src = "list/qy_aj.html";
             $("#linkhere")[0].style.height = "900px";
        });
        $("#qyfx_xyr").click(function() {
            $("#linkhere")[0].src = "list/qy_xyr.html";
             $("#linkhere")[0].style.height = "900px";
        });
        $("#lbfx_jq").click(function() {
            $("#linkhere")[0].src = "list/lx_jq.html";
             $("#linkhere")[0].style.height = "1550px";
        });
        $("#lbfx_aj").click(function() {
            $("#linkhere")[0].src = "list/lx_aj.html";
             $("#linkhere")[0].style.height = "3300px";
        });
        $("#lbfx_xyr").click(function() {
            $("#linkhere")[0].src = "list/lx_xyr.html";
             $("#linkhere")[0].style.height = "1900px";
        });
        $("#lbzs_jq").click(function() {
            $("#linkhere")[0].src = "list/lb_jq.html";
            $("#linkhere")[0].style.height = "900px";
        });
        $("#lbzs_aj").click(function() {
            $("#linkhere")[0].src = "list/lb_aj.html";
             $("#linkhere")[0].style.height = "900px";
        });
        $("#lbzs_xyr").click(function() {
            $("#linkhere")[0].src = "list/lb_xyr.html";
             $("#linkhere")[0].style.height = "900px";
        });
	});

		//类型分析
		// $("#lxfx").change(function(){
		// 	var index= $("#lxfx").val();
		// 	if(index == 0){

		// 		$("#linkhere")[0].style.backgroundColor = "rgba(5, 21, 34, 1)";
		// 		$("#linkhere")[0].style.height = "1583px";
        //               console.log($("#linkhere")[0]);
		// 	}
		// 	else if(index == 1){

		// 		$("#linkhere")[0].style.backgroundColor = "rgba(5, 21, 34, 1)";
		// 		$("#linkhere")[0].style.height = "1500px";
		// 	}else if(index == 2){

		// 		$("#linkhere")[0].style.backgroundColor = "rgba(5, 21, 34, 1)";
		// 		$("#linkhere")[0].style.height = "1500px";
		// 	}

		// });
		//串并案分析
		$("#cban").click(function(){
			$("#linkhere")[0].src = "html/cbafx/cbafx.html";
			$("#linkhere")[0].style.height = "900px";
		});