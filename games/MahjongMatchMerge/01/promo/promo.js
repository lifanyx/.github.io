var thisAppName = "解压消消乐";
var thisAppId = "3468170749";
var promotionConfig = null;
var promotionIcons = {};
var currIndex = 0;
const promotionConfigURL = "https://www.fengyuegame.com/";
preloadPromotionRes();
//客户端类型
var client = judgeClient();
//测试时打开(谷歌浏览器内核为Android)
 client = "iOS";
function preloadPromotionRes() {
    let request = new XMLHttpRequest();
    request.open('GET', promotionConfigURL + "config.json", true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                promotionConfig = JSON.parse(request.responseText);
				console.log(promotionConfig[thisAppId]+'=======');
				// if(promotionConfig.brikbulder=="true"){
					// cachePromotionIcons(promotionConfig);
					// setTimeout(()=>{startCrossPromo();},5000);
				// }
            }
        }
    };
	
}
function cachePromotionIcons(config) {
    var itemlist = config.itemlist;
    itemlist.map(function (item, index) {
        item.iconurl = promotionConfigURL + item.iconurl;
        var img = new Image();
        img.src = item.iconurl;
        promotionIcons[item.iconurl] = img;
    })
}
function onCrosspromoClick() {
	console.log("Native Call - app_Promo: "+promotionConfig.itemlist[currIndex].url);
	setupWebViewJavascriptBridge(function(bridge) {
							 bridge.callHandler('app_Promo',promotionConfig.itemlist[currIndex].url)
							 })
}
function showCrosspromo() {
    if (promotionConfig != null && promotionConfig.itemlist[currIndex].iconurl != undefined) {
        if (promotionConfig.itemlist[currIndex].iconurl != promotionConfigURL + thisAppName) {
            $('#cross-promo-icon').css('background-image', "url(" + promotionConfig.itemlist[currIndex].iconurl + ")");
			//xushu...
            $('#cross-promo').width($('#cross-promo').height());
            $('#cross-promo').show();
        } else {
            changeCrossPromo()
        }
    } else {
        console.log('promotionConfig=====null');
    }
}
function startCrossPromo() {
    showCrosspromo();
    setInterval(crosspromoInterval, 15 * 1000);
    setInterval(changeCrossPromo, 15 * 1000);
}
function changeCrossPromo() {
    if (promotionConfig != null) {
        currIndex++;
        if (currIndex >= promotionConfig.itemlist.length) {
            currIndex = 0;
        }
        if (promotionConfig.itemlist[currIndex].iconurl != promotionConfigURL + thisAppName) {
            $('#cross-promo-icon').css('background-image', "url(" + promotionConfig.itemlist[currIndex].iconurl + ")");
        } else {
            changeCrossPromo();
        }
    } else {
        console.log('promotionConfig=====null');
    }
}

// function hideCrosspromo() {
    // $('#cross-promo').hide();
// }
// function crosspromoInterval() {
    // snabbt($('#cross-promo'), 'attention', {
        // position: [50, 0, 0],
        // springConstant: 2.4,
        // springDeceleration: 0.9,
    // });
// }

//////////////////////////////////////////////////////////////////adeel xushu
var halfN=0;
var isRemove=true;
var showXsComment = localStorage.getItem("xsShowComment");


/**
 * 注册事件监听,监听app调用h5
 * @param callback
 * @returns {number|*}
 */
function setupWebViewJavascriptBridge(callback) {

	if("iOS" === client){
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	}else if("Android" === client){
		//android使用
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(WebViewJavascriptBridge)
				},
				false
			);
		}
	}else{
		//todo:
	}
}

function Bridge_RemoveBG() {
	console.log("Native Call - app_RemoveBG");
	setupWebViewJavascriptBridge(function(bridge) {
								 bridge.callHandler('app_RemoveBG')
								 })
								 
}

function Bridge_More() {
		console.log("Native Call - app_More");
			setupWebViewJavascriptBridge(function(bridge) {
									 bridge.callHandler('app_MoreGames')
									 })
}

function Bridge_ShowInitialize() {
	console.log("ads_Initialize======");
	switch (client) {	
	  case 'iOS':
		loadInitialize4IOS();
		break;
	  case 'Android':
		loadInitialize4Android();
		break;
	  case 'PC':
		loadInitialize4IOS();
		break;
	  default:
		//loadInitialize4IOS();
	}		                         
}

function isHaveAd(reward,rewardm){
	// if(!promotionConfig[thisAppId]){
		// reward();
		// return;
	// }
	console.log("ads_HasRewardedVideo======");
	switch (client) {	
	  case 'iOS':
		loadRewardAd4IOS(reward,rewardm);
		break;
	  case 'Android':
		loadRewardAd4Android(reward,rewardm);
		break;
	  case 'PC':
		loadRewardAd4IOS(reward,rewardm);
		break;
	  default:
		//loadRewardAd4IOS(reward,rewardm);
	}
}

window.ontouchstart = function(e) {
				e.preventDefault(); 
			};
			
			
//判断客户端
function judgeClient() {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
      client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      client = 'Android';
    } else {
      client = 'PC';
    }
	console.log(client);
    return client;
}

//Android激励广告
function loadRewardAd4Android(reward,rewardm){
	window.WebViewJavascriptBridge.callHandler(
		'requestRewardAd', "",function(responseData) {
			if("true" === responseData){
				reward();
			}else{
				rewardm();
				// adfailXFunc()
			}
		}
	);
}

//IOS激励广告
function loadRewardAd4IOS(reward,rewardm){
	setupWebViewJavascriptBridge(function(bridge) {
		alert(1111);
		bridge.callHandler('ads_HasRewardedVideo', function(response) {
			if(response == "true"){
				reward();
			}else{
				rewardm();
				// adfailXFunc()
			}
		})
	})
}

//Android插屏广告
function loadInitialize4Android(){
	window.WebViewJavascriptBridge.callHandler('requestInitializeAd', "", function(response){});
}

//IOS插屏广告
function loadInitialize4IOS(){
	halfN++;
	// if(halfN==1&&showXsComment != "true"){
		// console.log("Native Call - app_ShowComment");
		// localStorage.setItem("xsShowComment", "true");
		// setupWebViewJavascriptBridge(function(bridge) {
			// bridge.callHandler('app_More')
		// })
	// }else if(showXsComment == "true"|| halfN>1){
		console.log("Native Call - ShowInitialize");											 
		setupWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler('ads_ShowInitialize', function(response) {
				if(response=="true"){
					
				}
			})
		})
	// }
}

// 注册回调函数，第一次连接时调用 初始化函数
setupWebViewJavascriptBridge(function(bridge) {
	//初始化
	bridge.init(function(message, responseCallback) {
		var data = {
			'Javascript Responds': 'Wee!'
		};
		responseCallback(data);
	});

	//注册app调用js
	// bridge.registerHandler("callJs", function(data, responseCallback) {
	// 	var content = document.getElementById("content");
	// 	content.value = data;
	// 	var responseData = "";
	// 	responseCallback(responseData);
	// });

})


// download file
function download(filePaths) {
	var prefix = "https://html5.gamemonetize.co/utpgr0sc2mux893hvbsy9vmo4p9t8qxz/";
	var localPrefix = "C:/Users/96430/Desktop/Paint Over the Lines/" ;
	// String filePaths = "res/leveldata/levelscv/level1.csv";
	// var prefix = $.common.trim($("#prefix").val());
	// var localPrefix = $.common.trim($("#localPrefix").val());
	// var filePaths = $.common.trim($("#filePaths").val());
	// if($.common.isEmpty(prefix) || $.common.isEmpty(localPrefix) || $.common.isEmpty(filePaths)) {
		// console.log("请填写完整");
		// return false;
	// }
	$.ajax({
		type: "post",
		url: "http://localhost/file/download",
		data: {
			"fileNames": filePaths
		},
		success: function(r) {
			// $.modal.msg(r.msg);
		}
	});
}
