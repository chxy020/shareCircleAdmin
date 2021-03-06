layui.config({
    base: '../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form','jquery','tree','util','upload'], function () {
    var $ = layui.$,
    upload = layui.upload,
    setter = layui.setter,
    form = layui.form,
    layer = layui.layer,
    setter = layui.setter,
    router = layui.router(),
    data = '';

    var server = setter.baseUrl;
    var uri = window.location.search;
    var loginUrl = setter.loginUrl;

    // var uid = "5bea735b8c324eafbfd11b679eb758d01";
    var uid = "";
    var userinfo = window.sessionStorage.getItem("__userinfo") || "";
    if(userinfo){
        userinfo = JSON.parse(userinfo);
        uid = userinfo.uid;
    }else{
        location.href = loginUrl;
        return;
    }
    
    
    // var types = ["","硬件故障","软件故障","硬件使用障碍","软件使用障碍","优化建议","投诉反馈","其它"];
    // var imgpaths = [];

    var id = setter.getUrlParam("id",uri) || "";

    if(id){
        $("#id").val(id);
    }else{
        $("#uid").val(uid);
    }

    // upload.render({
    //     elem: '#test5',
    //     multiple: true,
    //     url: server + "/ADMINM/aftersales/uploadImgFile", //改成您自己的上传接口
    //     accept: 'images', //视频
    //     exts: 'jpg|png|jpeg|gif', //只允许图片
    //     acceptMime:"image/jpg, image/png, image/jpeg, image/gif",
    //     field:"clientFile",
    //     number:9,
    //     before:function(){
    //         layer.load(2);
    //     },
    //     done: function(res){
    //         layer.closeAll();
    //         console.log(res)
    //         if(res.code == 1){
    //             layer.msg('上传成功');
    //             res.IMGPATH = res.IMGPATH.replace(",","");
    //             imgpaths.push(res.IMGPATH);
    //             changeImgPathHtml(res.IMGPATH);
    //         }else{
    //             layer.msg('上传失败');
    //         }

    //         // ID: "81caf154951d4eaab3d5cbe4c2b99792"
    //         // PATH: "/ADMINM/uploadFiles/file/81caf154951d4eaab3d5cbe4c2b99792.mp4"
    //         // code: 1
    //     }
    // });


    if(id){
        var detail = window.sessionStorage.getItem("__videodetail");
        if(detail){
            detail = JSON.parse(detail);

            $("#title").val(detail.title);
            $("#describe").val(detail.describe);
        }
        // console.log(detail)
    }
    
    //监听提交
    form.on('submit(submit)', function(data){
        
        // var condi = {};
        // condi.uid = uid;
        // condi.title = data.field.title;
        // condi.imgfile = data.field.DESCRIBE;
        // condi.file = imgpaths.join(',');
        // condi.describe = data.field.PHONE;



        // saveAfterSales(condi);

        // if(role_ID){
        //     //编辑
        //     editRole(condi);
        // }else{
        //     addRole(condi);
        // }

        saveVideo();
        
        return false;
    });

    function saveVideo(){
        layer.load(2);

        var url = server + "/circle/examine/saveVideo";
        if(id){
            url = server + "/circle/examine/modifyVideo";
        }
        var formdata = new FormData(document.getElementById("form"))
        $.Ajax({
            url: url,
            // dataType: "json",
            method: 'post',
            data:formdata,
            processData:false,   //  告诉jquery不要处理发送的数据
            contentType:false,   // 告诉jquery不要设置content-Type请求头
            success: function(obj) {
                layer.closeAll();

                if(obj.code == 1 || obj.code == 0){
                    if(id){
                        layer.msg("修改成功");
                    }else{
                        layer.msg("添加成功");
                    }

                    
                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "添加失败");
                }
                
            },
            error:function(){
                layer.closeAll();
            }
        });
    }


});