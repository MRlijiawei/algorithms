var client = function(){
  var engine = {
      // 呈现引擎
      ie: 0,
      gecko:0,
      webkit: 0,
      khtml:0,
      opera:0,
      //其他版本号
      ver: null
  };
  var browser = {
      // 浏览器
      ie: 0,
      firefox:0,
      safari:0,
      konq:0,
      opera:0,
      chrome:0,
      // 其他的版本
      ver: null
  };
  var system = {
      win: false,
      mac: false,
      xll: false,
      // 移动设备
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android:false,

      nokiaN: false,
      winMobile: false,

      // 游戏系统
      wii: false,
      ps: false
   };
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/opr\/([\d\.]+)/) || window.opera) {
      var result = ua.match(/opr\/([\d\.]+)/);
      engine.ver = browser.ver = result[1];
      engine.opera = browser.opera = parseFloat(engine.ver);
      if(window.opera) {
           engine.ver = browser.ver = window.opera.version();
           engine.opera = browser.opera = parseFloat(engine.ver);
       }
  }else if(/applewebkit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.webkit = parseFloat(engine.ver);
      // 确定是chrome还是safari
      /*
       * chrome用户代理字符串
       * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) 
       * Chrome/42.0.2311.152 Safari/537.36
       */
       if(/chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
       }else if(/version\/(\S+)/.test(ua)) {
            /*
             * safari用户代理字符串
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) 
             * Version/5.1.7 Safari/534.57.2
             */
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
       }else {
            //近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100){
                safariVersion = 1;
            } else if (engine.webkit < 312){
                safariVersion = 1.2;
            } else if (engine.webkit < 412){
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
  }else if (/khtml\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq =  parseFloat(engine.ver);

  }else if(/rv:([^\)]+)\) gecko\/\d{8}/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        /*
         * firefox的用户代理的字符串
         * Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) 
         * Gecko/20100101 Firefox/38.0
         */
        // 确定是不是firefox
        if(/firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
   }else if (/msie ([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
   }
   // 检测平台
   var platform = navigator.platform;
   system.win = platform.indexOf("Win") == 0;
   system.mac = platform.indexOf("Mac") == 0;
   system.x11 = (platform.indexOf("X11") == 0) || (platform.indexOf("Linux") == 0);
   // 检测windows操作系统
   if (system.win) {
    if (/win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp["$1"] == 'nt') {
        switch(RegExp["$2"]) {
          case '5.0':
            system.win = '2000'
            break
          case '5.1':
            system.win = 'xp'
            break
          case '6.0':
            system.win = 'vista'
            break
          case '6.1':
            system.win = '7'
            break
          case '10.0':
            system.win = '10'
            break
          default:
            system.win = 'nt'
            break
        }
      } else if (RegExp["$1"] == 'nt') {
        system.win = 'me'
      } else {
        system.win = RegExp["$1"]
      }
    }
   }
      
   // 移动设备
   system.iphone = ua.indexOf("iphone") > -1;
   system.ipod = ua.indexOf("ipod") > -1;
   system.ipad = ua.indexOf("ipad") > -1;
   system.nokiaN = ua.indexOf('nokian') > -1

   // windows mobile
   if (system.win == 'ce') {
    system.winMobile = system.win
   } else if (system.win == 'ph') {
    if (/windows phone os (\d+.\d+)/.test(ua)) {
      system.win = 'phone'
      system.winMobile = parseFloat(RegExp['$1'])
    }
   }

   //检测iOS 版本
   if (system.mac && ua.indexOf("mobile") > -1){
      if (/cpu (?:iphone )?os (\d+_\d+)/.test(ua)){
          system.ios = parseFloat(RegExp.$1.replace("_", "."));
      } else {
          system.ios = 2; //不能真正检测出来，所以只能猜测
      }
  }
  //检测Android 版本
  if (/android (\d+\.\d+)/.test(ua)){
      system.android = parseFloat(RegExp.$1);
  }
  system.wii = ua.indexOf('wii') > -1
  system.ps = /playstation/i.test(ua)
   // 在此检测呈现引擎，平台和设备
   return {
       engine: engine,
       browser: browser,
       system: system
   };
}();