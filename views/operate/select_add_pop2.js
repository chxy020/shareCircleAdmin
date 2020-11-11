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

    var id = setter.getUrlParam("id",uri) || "";

    // if(id){
    //     $("#id").val(id);
    // }else{
    //     $("#uid").val(uid);
    // }


    if(id){
        var detail = window.sessionStorage.getItem("__videodetail");
        if(detail){
            detail = JSON.parse(detail);

            $("#title").val(detail.title);
            $("#downloadpirce").val(detail.pirce);
            $("#describe").val(detail.describe);
        }
    }
    
    var _token;
    var url = server + "/circle/examine/getQiniuyinToken";
    $.Ajax({
        async: false,
        url: url,
        // dataType: "json",
        method: 'post',
        // data:formdata,
        // processData:false,   //  告诉jquery不要处理发送的数据
        // contentType:false,   // 告诉jquery不要设置content-Type请求头
        success: function(obj) {
            layer.closeAll();
            
            if(obj.code == 0){
                var token = obj.data;
                _token = token;
            }
        },
        error:function(){
            layer.closeAll();
        }
    });


    var videoKey;
    var observer = {
        next(res){
            var total = Math.ceil(res.total.percent);
            $("#uploadbg").show();
            $('#progressbar1').LineProgressbar({
                percentage: total,
                duration:0
            });
        },
        error(err){
            layer.msg("上传视频错误");
            $("#file").val('');
            // console.log("error----",err);
        },
        complete(res){
            $("#uploadbg").hide();
            layer.msg("上传视频成功");
            videoKey = res.key;
        }
    };
    
    
    function uploadFile(files){
        if(_token){
            var putExtra = {};
            var config = {
                // useCdnDomain: true,
                // region: qiniu.region.z2
            };
            var guid = getGuid();
            var observable = qiniu.upload(files,guid, _token, putExtra, config)
            var subscription = observable.subscribe(observer) // 上传开始
            // or
            // var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以
            // subscription.unsubscribe() // 上传取消
        }else{
            layer.msg("没有获取到token");
        }
    }

    var imgKey;
    var observer2 = {
        next(res){
            var total = Math.ceil(res.total.percent);
            $("#uploadbg").show();
            $('#progressbar1').LineProgressbar({
                percentage: total,
                duration:0
            });
        },
        error(err){
            layer.msg("上传封面错误");
            $("#imgfile").val('');
            // console.log("error----",err);
        },
        complete(res){
            $("#uploadbg").hide();
            layer.msg("上传封面成功");
            imgKey = res.key;
        }
    };
    function uploadImamgeFile(files){
        if(_token){
            var putExtra = {};
            var config = {
                // useCdnDomain: true,
                // region: qiniu.region.z2
            };
            var guid = getGuid();
            var observable = qiniu.upload(files,guid, _token, putExtra, config)
            var subscription = observable.subscribe(observer2) // 上传开始
            // or
            // var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以
            // subscription.unsubscribe() // 上传取消
        }else{
            layer.msg("没有获取到token");
        }
    }

	function getGuid(){
		var guid = "";
		for (var i = 1; i <= 32; i++){
			var n = Math.floor(Math.random()*16.0).toString(16);
			guid += n;
			if((i==8)||(i==12)||(i==16)||(i==20)){
				guid += "-";
			}
		}
		return guid;
	};

    $("#file").bind("change",function(obj){
        var files = obj.currentTarget.files;
        uploadFile(files[0]);
    });
    $("#imgfile").bind("change",function(obj){
        var files = obj.currentTarget.files;
        uploadImamgeFile(files[0]);
    });

    //监听提交
    form.on('submit(submit)', function(data){
        
        var condi = {};
        condi.title = data.field.title;
        condi.downloadpirce = data.field.downloadpirce;
        condi.describe = data.field.describe;


        // console.log(condi)

        // saveAfterSales(condi);

        // if(role_ID){
        //     //编辑
        //     editRole(condi);
        // }else{
        //     addRole(condi);
        // }

        saveVideo(condi);
        
        return false;
    });

    function saveVideo(condi){
        

        if(!imgKey && !id){
            layer.msg("请上传封面");
            return;
        }
        condi.imgKey = imgKey;
        if(!videoKey && !id){
            layer.msg("请上传视频");
            return;
        }
        condi.videoKey = videoKey;
        condi.uid = uid;

        var url = server + "/circle/examine/savePathVideo";
        if(id){
            url = server + "/circle/examine/modifyPathVideo";
            condi.id = id;
        }

        layer.load(2);

        $.Ajax({
            async: false,
            url: url,
            dataType: "json",
            method: 'post',
            data:condi,
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



// function uploadWithSDK(token, putExtra, config, domain) {
//     // 切换tab后进行一些css操作
//     controlTabDisplay("sdk");
//     $("#select2").unbind("change").bind("change",function(){
//       var file = this.files[0];
//       // eslint-disable-next-line
//       var finishedAttr = [];
//       // eslint-disable-next-line
//       var compareChunks = [];
//       var observable;
//       if (file) {
//         var key = file.name;
//         // 添加上传dom面板
//         var board = addUploadBoard(file, config, key, "");
//         if (!board) {
//           return;
//         }
//         putExtra.params["x:name"] = key.split(".")[0];
//         board.start = true;
//         var dom_total = $(board)
//           .find("#totalBar")
//           .children("#totalBarColor");
  
//         // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
//         var error = function(err) {
//           board.start = true;
//           $(board).find(".control-upload").text("继续上传");
//           console.log(err);
//           alert("上传出错")
//         };
  
//         var complete = function(res) {
//           $(board)
//             .find("#totalBar")
//             .addClass("hide");
//           $(board)
//             .find(".control-container")
//             .html(
//               "<p><strong>Hash：</strong>" +
//                 res.hash +
//                 "</p>" +
//                 "<p><strong>Bucket：</strong>" +
//                 res.bucket +
//                 "</p>"
//             );
//           if (res.key && res.key.match(/\.(jpg|jpeg|png|gif)$/)) {
//             imageDeal(board, res.key, domain);
//           }
//         };
  
//         var next = function(response) {
//           var chunks = response.chunks||[];
//           var total = response.total;
//           // 这里对每个chunk更新进度，并记录已经更新好的避免重复更新，同时对未开始更新的跳过
//           for (var i = 0; i < chunks.length; i++) {
//             if (chunks[i].percent === 0 || finishedAttr[i]){
//               continue;
//             }
//             if (compareChunks[i].percent === chunks[i].percent){
//               continue;
//             }
//             if (chunks[i].percent === 100){
//               finishedAttr[i] = true;
//             }
//             $(board)
//               .find(".fragment-group li")
//               .eq(i)
//               .find("#childBarColor")
//               .css(
//                 "width",
//                 chunks[i].percent + "%"
//               );
//           }
//           $(board)
//             .find(".speed")
//             .text("进度：" + total.percent + "% ");
//           dom_total.css(
//             "width",
//             total.percent + "%"
//           );
//           compareChunks = chunks;
//         };
  
//         var subObject = { 
//           next: next,
//           error: error,
//           complete: complete
//         };
//         var subscription;
//         // 调用sdk上传接口获得相应的observable，控制上传和暂停
//         observable = qiniu.upload(file, key, token, putExtra, config);
  
//         $(board)
//           .find(".control-upload")
//           .on("click", function() {
//             if(board.start){
//               $(this).text("暂停上传");
//               board.start = false;
//               subscription = observable.subscribe(subObject);
//             }else{
//               board.start = true;
//               $(this).text("继续上传");
//               subscription.unsubscribe();
//             }
//           });
//       }
//     })
//   }
  