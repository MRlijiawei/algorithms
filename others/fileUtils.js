// export default FileUtils
/*
*文件的上传、下载总结
*基础下载1.下载base64，将a的href指定为base64即可,download属性是下载的文件名;
*基础下载2.下载blob,window.URL.createObjectURL(blob)转为URL对象（revokeObjectURL释放）或用FileReader.readAsDataURL转base64，两者都可以使用1中的方法下载
*其他下载：url下载如图片，先把url转成base64再下载
*/
class FileUtils {
  constructor({}){}
  /*文件大小，也可用于计算速度*/
  dealWithSize(size) {
    if(size > 1024*1024) {
      return ((size/1024)/1024).toFixed(2)+'MB';
    } else if(!size) {
      return '未知大小';
    } else {
      return (size/1024).toFixed(2)+'KB';
    }
  }
  /*
  *下载base64或URL对象
  */
  base64Down(base64, fileName) {
    let a = document.createElement("a")
    // 兼容--如果不支持，直接打开下载
    if (typeof a.download === 'undefined') {
      window.location = base64
    } else {
      let event = new MouseEvent("click")
      a.download = fileName
      a.href = base64
      a.dispatchEvent(event)
    }
  }
  /*
  *下载blob
  */
  blobDown(blob, fileName, fileType) {
    blob = blob.data// 如果数据是原始blob
    // Blob()的第一个参数必须为数组，即使只有一个字符串也必须用数组装起来
    const _blob = new Blob([blob], { type: fileType })
      // 如果blob可以直接下载，就不需要上边两步
      //  window.navigator.msSaveBlob：以本地方式保存文件（IE支持）
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        // 方法1 URL对象
        const URL = window.URL || window.webkitURL
        const obUrl = URL.createObjectURL(_blob)// 如果blob可以直接下载，就不用上边再转一下blob
        this.base64Down(obUrl, fileName)
        URL.revokeObjectURL(obUrl)// 释放内存
        // 方法2 base64
        /*let fileRd = new FileReader()
        fileRd.onloadend = function(e) {
          let base64 = e.target.result
          this.base64Down(base64, fileName)
        }
        fileRd.readAsDataURL(blob)*/
      }
    }
  /*
  *给定url下载及进度（不知这个url可否直接通过触发点击来下载--TODO）和速度
  *上传下载如果需要进度显示的，见另一个文件的html和css
  */
  urlDown(url) {
    var time = new Date().getTime();
    var size_loaded = 0;
    var filesize
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    
    xhr.addEventListener("progress", function (evt) {
      if(progress) {
        try{ 
          progress.call(evt); 
        }catch(e){
          
        }
      } else {
        filesize = filesize || evt.total;
        if(!filesize) {
          var percent = '未知';
          $("#sc_" + num).find(".precent").text(percent);
        } else {
          var percent = Math.round(evt.loaded/filesize*100);
          
        }
        var _time = new Date().getTime();
        console.log(evt.loaded);
        if (_time - time > 500) {
          $("#sc_" + num).find(".speedLab").html("(" + (((evt.loaded - size_loaded) * 1000 / (_time - time))/1024/1024).toFixed(2) + "Mb/s)");
          time = _time;
        }
        size_loaded = evt.loaded;
      }
    }, false);
    
    xhr.responseType = "blob";
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    
    xhr.onreadystatechange = function () {
      //若原本不知大小，则根据返回信息判定大小
      if($("#sc_" + num).find(".file-size").text() == '未知大小' && xhr.response && xhr.response.size) {
        filesize = xhr.response.size;
        $("#sc_" + num).find(".file-size").text(_self.dealWithSize(xhr.response.size));
      }
      if (xhr.readyState === 4 && xhr.status === 200) {
          // 以下可改成直接使用2来进行--TODO--也可以单独写成一个方法
          if (typeof window.chrome !== 'undefined') {
                // Chrome version
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(xhr.response);
                link.download = filename;
                link.click();
              } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE version
                var blob = new Blob([xhr.response], { type: 'application/force-download' });
                window.navigator.msSaveBlob(blob, filename);
              } else {
                // Firefox version
                var file = new File([xhr.response], filename, { type: 'application/force-download' });
                window.open(URL.createObjectURL(file));
              }
              if(success) {
                try{ 
                  success.call(xhr); 
                }catch(e){
                  
                }
              } else {
                $("#sc_" + num).find(".process").hide();
                $("#sc_" + num).find(".file-status").find(".downloading").hide();
                $("#sc_" + num).find(".file-status").find(".success-download").show();
                
              }
            } else if(xhr.readyState === 4 && xhr.status !== 200) {
              if(filed) {
                $("#sc_" + num).find(".process").hide();
                $("#sc_" + num).find(".file-status").find(".downloading").hide();
                $("#sc_" + num).find(".file-status").find(".failed-download").show();
                try{ 
                  filed.call(xhr); 
                }catch(e){
                  
                }
              } else {
                $("#sc_" + num).find(".process").hide();
                $("#sc_" + num).find(".file-status").find(".downloading").hide();
                $("#sc_" + num).find(".file-status").find(".failed-download").show();
              }
            }
          };

          var paramsStr = '';
    /*if(params) for (var key in params) paramsStr += '&'+key+'='+params[key];
    if(paramsStr) paramsStr = paramsStr.substring(1);*/
    // 如果接口需要参数则做相应处理即可。当然也可以是FormData
    xhr.send(paramsStr)
  }
  /*文件上传和进度 速度*/
  fileUpload(file, num, this_parentId) {
    var time = new Date().getTime();
    var size_loaded = 0;
    const storageId = aliCloud.calculate_object_name(file.name)
    //准备表单
    var new_multipart_params = {
      // key--路径+名称
      'key' : storageId,
      'policy': aliCloud.upParams.policy,
      'OSSAccessKeyId': aliCloud.upParams.OSSAccessKeyId, 
        'success_action_status' : '200' //让服务端返回200,不然，默认会返回204
        ,'signature': aliCloud.upParams.signature,
        //file: new plupload.File(file)
        file
      }
      var fd = new FormData();
      for(var key in new_multipart_params) {
        fd.append(key, new_multipart_params[key])
      }
      var xhr = new XMLHttpRequest();

      xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) { //文件长度是否可计算
      var percent = Math.round(e.loaded * 99 / e.total);
      $("#sc_" + num).find(".precent").text(percent + "%");
      var _time = new Date().getTime();
      console.log(e.loaded);
      if (_time - time > 500) {
        $("#sc_" + num).find(".speedLab").html("(" + dealWithSize((e.loaded - size_loaded) * 1000 / (_time - time)) + "/s)");
        time = _time;
      }
      size_loaded = e.loaded;
      $("#sc_" + num).find(".process").css("width", percent + "%");

    } else {
      console.log("文件长度不可计算");
    }
  }

  $("#sc_" + num).find(".cancel-icon").off().on("click", function () {
    xhr.abort();

    $(this).hide();
    $(this).parent().prev().children('.cancel').css('display', 'block').siblings().css('display', 'none');
  });
  //成功完成事件
  xhr.onload = function (e) {
    if(xhr.status == 200) {
      // 99%
      $("#sc_" + num).find(".precent").text("99%");
      $("#sc_" + num).find(".process").css("width", "99%")
      // 绑定
      aliCloud.successCallback(file).then(res => {
        if (res.code === 1) {
          //将信息写入附件表和云盘资源表
          $.ajax({
            type: 'POST',
            url: "yunfileResourceController/addFile",
            data: JSON.stringify({
              "yunfileId": yunfile.id,
              "parentId": this_parentId,
              "author": userId,
              "fileId": res.data.id,
              "name": file.name
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
              if (result != null && result != "" && result != 0) {
                //更改云盘使用容量
                yunfile.sizeUse = parseInt(file.size) + parseInt(yunfile.sizeUse);
                showPercent_size(yunfile.sizeUse, yunfile.sizeTotal);
                if ($("#_main_nav_aside_box li[data-mod='disk']").hasClass("active")) {
                  getYunfileResourceList();
                }
                $("#sc_" + num).find(".process").css("display", "none");
                $("#sc_" + num).find(".file-status>.uploading").css("display", "none");
                $("#sc_" + num).find(".file-status>.transcoding").css("display", "none");
                $("#sc_" + num).find(".file-status>.success-upload").css("display", "block");
                $("#sc_" + num).find(".file-operate2").css("display", "none");
              } else {
                layer.alert("上传失败,请刷新页面再上传文件!!");
              }
            }
          }).complete(function (XMLHttpRequest, textStatus) {
            var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，
            if (sessionstatus == "timeout") {
              alert("登录超时,请重新登录！");
              //如果超时就处理 ，指定要跳转的页面
              window.location.replace(baseRoot + "userLoginController/loginOut");
            }
          });
        } else {
          layer.alert("上传失败,网盘文件绑定失败!");
        }
      })
    } else {
      //alert("信息写入失败");
      $("#sc_" + num).find(".process").css("display", "none");
      $("#sc_" + num).find(".file-status>.uploading").css("display", "none");
      $("#sc_" + num).find(".file-status>.transcoding").css("display", "none");
      $("#sc_" + num).find(".file-status>.success-upload").css("display", "none");
      $("#sc_" + num).find(".file-status>.fail-upload").css("display", "block");
      $("#sc_" + num).find(".file-operate2").css("display", "none");
      layer.alert(res.msg);
    }

  }
  xhr.ontimeout = function(e) {
   console.log('超时')
 };
  //发生错误
  xhr.onerror = function (e) {
    console.log("发生错误");
  }
  //取消时
  xhr.onabort = function (e) {
    $("#sc_" + num).find(".process").css("display", "none");
  }
  //停止上传时
  xhr.onloadend = function (e) {
    console.log("停止上传");
  }
  //发起ajax请求
  xhr.open("POST", aliCloud.upParams.host, true);
  xhr.send(fd);
}
}