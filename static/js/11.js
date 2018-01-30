(function ($) {
    $.fn.selectOptions = function (options) {
        var defaults = {
            MenuOption: "", //��Ӧhtmlҳ����div��Id
            json: "",      //��Ӧhtmlҳ���json��ʽ����
            txtSelect: "" //��Ӧhtmlҳ��input�ı����Id
        };
        var options = $.extend(defaults, options);   //�̳�defaults�еĲ���
        $.each(options.json, function (key, value) { //ѭ������json���� (���:��һ������)
            //��̬�����divԪ��
            $('<div style="margin-left:5px; margin-top:5px;">' + value.ManaDisplay + '</div>').appendTo("#" + options.MenuOption);
            //��̬�����ul ��li Ԫ��
            var ul = $('<ul class="ulOpt"></ul>').appendTo("#" + options.MenuOption);
            $.each(value.rows, function (key, jsonData) {  //ͨ����һ������ ѭ�������ڶ���(rows:[{}])�е�����
                var current;
                var li = $('<li></li>').appendTo(ul)
                    .bind('mouseover', function () {
                        current = $(this).css('background-color');
                        $(this).css('background-color', '#CCCCCC');
                    }).bind('mouseout', function () {
                        $(this).css('background-color', current);
                    });
                //��̬�����div checkbox Ԫ��
                var div = $('<div style="margin-left:5px;"></div>').appendTo(li);
                var chk = $('<input class="chk" type="checkbox" id=' + jsonData.OptId + ' />').appendTo(div)
                    .bind('click', function () {
                        //��ѡ�е�checkbox
                        var checked = $("#" + options.MenuOption + " input[type=checkbox]:checked");
                        var checkValue = ',';
                        var checkId = ',';
                        //����ѡ�е�checkbox���һ�ȡ��checkbox ��Ӧ��Id ��span�е�ֵ
                        $.each(checked, function (key, value) {
                            checkId += $(this).attr('id') + ",";
                            checkValue += $(this).siblings("span").text().replace(/(^\s+)|(\s+$)/g, '') + ","; //�޳��ո�
                        });
                        checkValue = checkValue.substring(1, (checkValue.length - 1)); //��checkValueǰ���',' ���� ȥ��
                        if (checked.length == 0) {
                            checkValue = "";
                        }
                        checkId = checkId.substring(1, (checkId.length - 1)); //��ȡ��checkbox��Ӧ��Id��ֵ
                        $("#txtSelect").val(checkValue);

                    });
                var span = $('<span> &nbsp &nbsp' + jsonData.OptName + '</span>').appendTo(div);
            });
        });
        //�����Ԫ�ص�IDΪ������param �����е�input��Id(txtSelect) ����ʾ���ݵ�div��Id(MenuOption) ʱ��ʾdiv ��������
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