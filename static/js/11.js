(function ($) {
    $.fn.selectOptions = function (options) {
        var defaults = {
            MenuOption: "", //对应html页面中div的Id
            json: "",      //对应html页面的json格式数据
            txtSelect: "" //对应html页面input文本框的Id
        };
        var options = $.extend(defaults, options);   //继承defaults中的参数
        $.each(options.json, function (key, value) { //循环遍历json数据 (简称:第一层数据)
            //动态的添加div元素
            $('<div style="margin-left:5px; margin-top:5px;">' + value.ManaDisplay + '</div>').appendTo("#" + options.MenuOption);
            //动态的添加ul 和li 元素
            var ul = $('<ul class="ulOpt"></ul>').appendTo("#" + options.MenuOption);
            $.each(value.rows, function (key, jsonData) {  //通过第一层数据 循环遍历第二层(rows:[{}])中的数据
                var current;
                var li = $('<li></li>').appendTo(ul)
                    .bind('mouseover', function () {
                        current = $(this).css('background-color');
                        $(this).css('background-color', '#CCCCCC');
                    }).bind('mouseout', function () {
                        $(this).css('background-color', current);
                    });
                //动态的添加div checkbox 元素
                var div = $('<div style="margin-left:5px;"></div>').appendTo(li);
                var chk = $('<input class="chk" type="checkbox" id=' + jsonData.OptId + ' />').appendTo(div)
                    .bind('click', function () {
                        //获选中的checkbox
                        var checked = $("#" + options.MenuOption + " input[type=checkbox]:checked");
                        var checkValue = ',';
                        var checkId = ',';
                        //遍历选中的checkbox并且获取到checkbox 对应的Id 和span中的值
                        $.each(checked, function (key, value) {
                            checkId += $(this).attr('id') + ",";
                            checkValue += $(this).siblings("span").text().replace(/(^\s+)|(\s+$)/g, '') + ","; //剔除空格
                        });
                        checkValue = checkValue.substring(1, (checkValue.length - 1)); //把checkValue前后的',' 逗号 去掉
                        if (checked.length == 0) {
                            checkValue = "";
                        }
                        checkId = checkId.substring(1, (checkId.length - 1)); //获取到checkbox对应的Id的值
                        $("#txtSelect").val(checkValue);

                    });
                var span = $('<span> &nbsp &nbsp' + jsonData.OptName + '</span>').appendTo(div);
            });
        });
        //点击的元素当ID为传进来param 参数中的input的Id(txtSelect) 和显示数据的div的Id(MenuOption) 时显示div 否则隐藏
        $("body").bind('click', function (e) {
            var target = $(e.target);
            if (target.closest("#" + options.MenuOption).length == 0 && target.closest("#" + options.txtSelect).length == 0) {
                $("#" + options.MenuOption).hide();
            } else {
                $("#" + options.MenuOption).show();
            }
            e.stopPropagation();
        });
    };

})(jQuery);