layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'table', 'jquery','form','laydate'], function() {
    var table = layui.table,
        setter = layui.setter,
        laydate = layui.laydate,
        form = layui.form;
        $ = layui.jquery;

    var server = setter.baseUrl;
    var imageUrl = setter.imageUrl;

    // var statusarr = ["","处理中","已关闭","已解决","待定"];
    // var types = ["","硬件故障","软件故障","硬件使用障碍","软件使用障碍","优化建议","投诉反馈","其它"];
    // var arrangeList = [];

    var rangetimeStart = "";
    var rangetimeEnd = "";
    laydate.render({
        elem: '#rangetime',
        range: true,
        // min: s2,
        // max: '2080-10-14',
        // format: 'yyyy年MM月dd日',
        // theme: 'molv'
        change: function(value, date, endDate){
            //日期时间被切换后的回调
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
        ,done: function(value, date, endDate){//控件选择完毕后的回调—点击日期、清空、现在、确定均会触发。
            if(value){
                var d = value.split(" - ");
                rangetimeStart = d[0];
                rangetimeEnd = d[1];
            }else{
                rangetimeStart = "";
                rangetimeEnd = "";
            }
            tableRender();
            // console.log(value); //得到日期生成的值，如：2017-08-18
            // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        }
    });




    function tableRender(){

        var search = $("#search").val();
        var revealType = $("#revealType").val();
        var sort = $("#sort").val();
        
        //表格加载渲染
        table.render({
            elem: '#test-table-operate',
            height: 'full-110',//必须留着
            // 暂时用DATA数据
            url: server + "/circle/examine/getExamineContent",
            where:{
                "search":search,
                "revealType":revealType,
                "sort":sort,
                "startTime":rangetimeStart,
                "endTime":rangetimeEnd
            },
            method: 'get',
            xhrFields: {
                withCredentials: true
            }
            // DATA数据
            // ,data:[
            //     {
            //         createtime: "2020-08-02 20:03:06",
            //         describe: "qwerqwer",
            //         feedbacktype: "软件使用障碍",
            //         id: 7,
            //         imgpath: "http://img1.99114.com/group3/M00/44/ED/rBADvVsg22mAB3PxAANeHq0SdqE776.jpg,http://img4.99114.com/group3/M00/1B/6D/rBADu18f9UeAesGwAAIfkhymy_M075.jpg,http://www.99114.com/group3/M00/1A/D9/rBADu18MDt6AasDcAAAuc92Fgoo993.jpg,http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: null,
            //         phone: "222",
            //         qq: "4444",
            //         reason: "dddsdf解决了",
            //         status: "已解决",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:10:54",
            //         wechat: "333",
            //     }
            //     ,{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 6,
            //         imgpath: "http://img.99114.com/group3/M00/44/E9/rBADvFsg24mADgpIAALIvglpQGg430_80_80.jpg,http://img4.99114.com/group3/M00/1B/A7/rBADu18oHxOAAYT3AADF37JrfjY236.jpg,http://www.99114.com/group3/M00/1A/D9/rBADu18MDt6AasDcAAAuc92Fgoo993.jpg,http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg,http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     }
            //     ,{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     },{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     },{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     },{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     },{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     },{
            //         createtime: "2020-08-02 18:45:08",
            //         describe: "123",
            //         feedbacktype: "投诉反馈",
            //         id: 8,
            //         imgpath: "http://www.99114.com/group3/M00/1A/D7/rBADu18L_6SAK7FLAAAuASbSqhQ063.jpg",
            //         jjr: "admin",
            //         phone: "123",
            //         qq: "",
            //         reason: "ffffff",
            //         status: "已关闭",
            //         tjr: "admin",
            //         updatetime: "2020-08-02 20:20:57",
            //         wechat: "123"
            //     }
            // ]
            ,page: {
                layout: ['prev', 'page', 'next', 'count', 'skip']
            },
            cols: [
                [ //表头
                    {
                        field: 'title',
                        width: 90,
                        title: '标题',
                        event: 'row',
                        // toolbar: '#test-table-operate-barDemo-cellA',
                        templet: function(d) {
                            return '<div><img src="' + d.video_image + '" width="80" height="80"/></div>';
                        },
                    },{
                        title: '',
                        toolbar: '#test-table-operate-barDemo-cellB',
                    },{
                        field: '',
                        width: 120,
                        title: '',
                        toolbar: '#test-table-operate-barDemo-cellC',
                    },{
                        field: '',
                        width: 160,
                        title: '',
                        toolbar: '#test-table-operate-barDemo-cellD',
                    },{
                        field: '',
                        title: '',
                        toolbar: '#test-table-operate-barDemo-cellE',
                    },{
                        field: 'status',
                        title: '操作',
                        width: 100,
                        toolbar: '#test-table-operate-barDemo-cellF',
                    }
                ]
            ],
            parseData: function(res){
                // console.log("res----",res)
                if(res.code == 302){
                    top.location.href = setter.loginUrl;
                    return;
                }
                return res;
            },
            
            event: true,
            page: true,
            limit: 15,
            skin: 'line',
            even: true,
            limits: [5, 10, 15],
            done: function(res, curr, count) {
                

                //表格内嵌相册
                // if(res.data.length){
                //     for (i = 0; i < res.data.length; i++) { 
                //         layer.photos({
                //             photos:'.layer-photos-demo'+res.data[i].id,
                //             anim:2
                //         })
                //     }
                // }


                // $('th').hide();//表头隐藏的样式
                // $('.layui-table-page').css('margin-top','40px');//页码部分的高度调整

                // table_data = res.data;
                // layer.closeAll('loading');
                // arrangeList.length = 0;
                // layer.close(layer.index); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
                // layer.close(index);    //返回数据关闭loading
                

            },
        });
    }

    function deleteVideo(id){
        $.Ajax({
            async: false,
            url: server + "/circle/examine/delete",
            dataType: "json",
            method: 'get',
            data:{"id":id},
            success: function(obj) {
                // console.log(obj);
                if(obj.code == 0){
                    layer.msg("删除成功");
                    tableRender();
                }else{
                    layer.msg(obj.msg || "删除成功");
                }

                layer.closeAll();
            }
        });
    }

    function updateIsHide(data){
        layer.load(2);
        $.Ajax({
            async: true,
            url: server + "/circle/examine/updateIsHide",
            dataType: "json",
            method: 'post',
            data:{"circleId":data.id,"ishide":+!data.ishide},
            success: function(obj) {
                // console.log(obj);
                if(obj.code == 0){
                    data.ishide = +!data.ishide;
                    layer.msg("设置成功");
                }else{
                    layer.msg(obj.msg || "设置失败");
                }
                layui.table.reload('test-table-operate');
                layer.closeAll();
            }
        });
    }

    
    $("#search").on({
        keyup : function(e){        
            var flag = e.target.isNeedPrevent;
            if(flag)  return;     
            tableRender();
            e.target.keyEvent = false ;
        },
        keydown : function(e){
            e.target.keyEvent = true ; 
        },
        input : function(e){
            if(!e.target.keyEvent){
                tableRender();
            }
        },
        compositionstart : function(e){
            e.target.isNeedPrevent = true ;
        },
        compositionend : function(e){
            e.target.isNeedPrevent = false;
        }
    });

    form.on('select(component-type)', function(data){
        tableRender();
    });
    form.on('select(component-sort)', function(data){
        tableRender();
    });

    tableRender();

    
    window.onkeyup = function(ev) {
        var key = ev.keyCode || ev.which;
        if (key == 27) { //按下Escape
            layer.closeAll('iframe'); //关闭所有的iframe层
        }
        if (key == 13) { //按下Escape
            // $('#search').click();
        }
    }

    table.on('checkbox(test-table-operate)', function(obj) {
        // console.log(obj.checked); //当前是否选中状态
        // // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        // // console.log(table.checkStatus('test-table-operate').data); // 获取表格中选中行的数据
        
        if (obj.checked && obj.type == 'one') {
            var devi = {};
            devi = obj.data.id;
            arrangeList.push(devi)
        }
        if (!obj.checked && obj.type == 'one') {
            var index = arrangeList.indexOf(obj.data.id);
            if (index > -1) {
                arrangeList.splice(index, 1);
            }
        }
        if (!obj.checked && obj.type == 'all') {
            arrangeList.length = 0;

        }
        if (obj.checked && obj.type == 'all') {
            $.each(table.checkStatus('test-table-operate').data, function(idx, con) {
                var devi = {};
                devi = con.id;

                arrangeList.push(devi)
            });
            arrangeList = Array.from(new Set(arrangeList))
        }
    });

    // table.on('row(test-table-operate)', function(obj){
    //     var data = obj.data || {};
        
    // });
    //监听工具条
    table.on('tool(test-table-operate)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            /**
             * @param {Object} index
             * 编排规则的借口提供之后需要接入删除
             */
            layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
                deleteVideo(data.id);
                // layer.close(index);
            });
        } else if (obj.event === 'edit') {
            window.sessionStorage.setItem("__videodetail",JSON.stringify(data));

            layer.open({
                type: 2,
                title: '编辑资源',
                area: ['100%', '100%'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'select_add_pop.html?id='+data.id,
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        } else if(obj.event == 'row'){
            window.sessionStorage.setItem("__videodetail",JSON.stringify(data));

            layer.open({
                type: 2,
                title: '视频详情',
                area: ['100%', '100%'],
                btn: ['关闭'],
                btnAlign: 'c',
                maxmin: true,
                content: 'select_details_pop.html?id='+data.id,
                yes: function(index, layero) {
                    // var submit = layero.find('iframe').contents().find("#submit");
                    // submit.click();
                }
            });
        } else if(obj.event == 'switch'){
            updateIsHide(data);
            return false;
        }
    });

    var $ = layui.$,
    active = {
        //点击搜索
        search: function() {
            
        },
        //点击添加
        add: function() {
            layer.open({
                type: 2,
                title: '添加资源',
                area: ['100%', '100%'],
                btn: ['保存', '取消'],
                btnAlign: 'c',
                maxmin: true,
                content: 'select_add_pop.html',
                yes: function(index, layero) {
                    var submit = layero.find('iframe').contents().find("#submit");
                    submit.click();
                }
            });
        },
        //点击删除
        del: function() { 
            // if(arrangeList.length == 0 ) {
            //     return layer.msg("请选择再批量删除")
            // }
            // layer.confirm('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除后无法恢复！确定删除吗？&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',{title:'删除提醒',btnAlign:'c'}, function() {
            //     deleteAfterSales(arrangeList.join(','));
            // })
        },
        //刷新
        refresh: function() {
            tableRender();
        },
    };

    //给页面里的layui-dS 绑定事件
    $('.layui-ds').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    /*右侧菜单HOVER显示提示文字*/
    var subtips;
    $('.pop_text button').each(function(){
        var _id = $(this).attr('id');
        var _data = $(this).attr('data');
        $("#" + _id).hover(function() {
            openMsg();
        }, function() {
            if(subtips){
                layer.close(subtips);
            }
        });
        function openMsg() {
            subtips = layer.tips(_data, '#'+_id,{tips:[3,'#666'],time: 30000});
        }
    })
    /*右侧菜单HOVER显示提示文字 end*/

    /* 表格中 鼠标移上 显示更多详细CSS html js*/
    $(document).on("mouseenter",".moreOperate",function(){
        var offsetTop = $(this).offset().top;
        var documentHeihgt=$(document).height();//浏览器当前窗口文档的高度
        var moreOperateAHeihgt=$(this).children(".moreOperateA").height()+30;
        // console.log("offsetTop ,documentHeihgt ,moreOperateAHeihgt===",offsetTop ,documentHeihgt ,moreOperateAHeihgt)
        // console.log("documentHeihgt-offsetTop===",documentHeihgt-offsetTop)
        if((documentHeihgt-offsetTop)<moreOperateAHeihgt){
            // console.log("1111");
            $(this).children(".moreOperateA").css("top",-(moreOperateAHeihgt-54));
            $(this).children(".moreOperateA").children(".moreOperateArr").css({"top":"auto","bottom":"10px"})
        }
        $(".layui-table-cell").css("overflow", "visible");
        $(this).children(".moreOperateA").show();
    })
    $(document).on("mouseleave",".moreOperate",function(){
        $(".layui-table-cell").css("overflow", "hidden");
        $(this).children(".moreOperateA").hide();
    })
    /* 表格中 鼠标移上 显示更多详细CSS html js end*/

    

});
