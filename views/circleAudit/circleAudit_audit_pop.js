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
    // var server = setter.baseUrl;

    var server = setter.baseUrl;
    var uri = window.location.search;
    
    var server = setter.baseUrl;
    var imageUrl = setter.imageUrl;
    var uri = window.location.search;
    
    // var types = ["","硬件故障","软件故障","硬件使用障碍","软件使用障碍","优化建议","投诉反馈","其它"];
    // var imgpaths = [];

    // var role_ID = setter.getUrlParam("role_ID",uri) || "";

    var id = setter.getUrlParam("id",uri) || "";
    var apiType = setter.getUrlParam("apiType",uri) || "";

    if(id){
        var detail = window.sessionStorage.getItem("__videodetail");
        if(detail){
            detail = JSON.parse(detail);

            var info1 = [];
            info1.push('<div class="rightbt">来源：' + detail.username + '的私密圈</div>');
            info1.push('<h3>' + detail.title + '</h3>');
            info1.push('<div class="size"><span>' + detail.title + detail.video_type + '</span>' + detail.video_size + '<s>' + detail.create_time + '</s></div>');
            
            $("#info1").html(info1.join(''));

            var info2 = [];
            info2.push('<p>' + detail.describe+ '</p>');
            info2.push('<video height="450px" poster="' + detail.video_image + '"  src="' + detail.video_path + '" type="video/mp4" width="100%" playsinline  height="100%" controls  ></video>');
           
            $("#info2").html(info2.join(''));

            var info3 = [];
            info3.push('<div class="borderF"><img src="../images/icona.png" width="24" />' +detail.title+ '</div>');
            info3.push('<div class="borderF infoxx"><img src="../images/headImg.png" width="24" />' + detail.username + '<span class="a">' + detail.resourceNum + '</span><span class="b">资源</span></div>');
            
            $("#info3").html(info3.join(''));

            var info4 = [];
            info4.push('<div class="jinbix">所需金币：<span>' +detail.pirce+ '</span>金币</div>');
            info4.push('<div class="zinfo"><span>分享：' +detail.share_num+ '</span><span>下载：' +detail.download+ '</span></div>');
            
            $("#info4").html(info4.join(''));
        }
        // console.log(detail)
    }
    
    //监听提交
    form.on('submit(submit)', function(data){
        
        examinePublish("",1);
        return false;
    });
    form.on('submit(submit2)', function(data){
        var refusal_cause = data.field.refusal_cause;
        if(!refusal_cause){
            layer.msg("请输入拒绝原因");
            return false;
        }
        
        examinePublish(refusal_cause,2);
        return false;
    });

    function examinePublish(refusal_cause,status){
        var condi = {};
        condi.uid = detail.publishUid;
        condi.circleId = detail.id;
        condi.refusal_cause = refusal_cause;
        condi.status = status;

        $.Ajax({
            async: false,
            url: server + "/circle/examine/examinePublish",
            dataType: "json",
            method: 'post',
            data:condi,
            success: function(obj) {
                if(obj.code == 0){
                    layer.msg("审核成功");

                    setTimeout(function(){
                        //刷新父页面
                        window.parent.location.reload();
                        var index = parent.layer.getFrameIndex(window.name);
               		    parent.layer.close(index);
                    },1500);
                }else{
                    layer.msg(obj.msg || "审核失败");
                }
            }
        });
    }
    

});