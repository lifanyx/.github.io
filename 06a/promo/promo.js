//xushu...
var thisAppName = "brikbulder.png";
var promotionConfig = null;
var promotionIcons = {};
var currIndex = 0;
const promotionConfigURL = "https://www.xsfungames.com/promovision1/";
//preloadPromotionRes();
function preloadPromotionRes() {
    let request = new XMLHttpRequest();
    request.open('GET', promotionConfigURL + "promoxsfung.json", true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                promotionConfig = JSON.parse(request.responseText);
				console.log(promotionConfig.brikbulder+'=======');
				if(promotionConfig.brikbulder=="true"){
					cachePromotionIcons(promotionConfig);
					setTimeout(()=>{startCrossPromo();},5000);
				}
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

function hideCrosspromo() {
    $('#cross-promo').hide();
}
function crosspromoInterval() {
    snabbt($('#cross-promo'), 'attention', {
        position: [50, 0, 0],
        springConstant: 2.4,
        springDeceleration: 0.9,
    });
}

//////////////////////////////////////////////////////////////////adeel xushu
var halfN=0;
var isRemove=true;
var showXsComment = localStorage.getItem("xsShowComment");
function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
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
		halfN++;
		if(halfN==1&&showXsComment != "true"){
			console.log("Native Call - app_ShowComment");
			localStorage.setItem("xsShowComment", "true");
			setupWebViewJavascriptBridge(function(bridge) {
									 bridge.callHandler('app_More')
									 })
			
		}else if(showXsComment == "true"|| halfN>1){
			console.log("Native Call - ShowInitialize");											 
			setupWebViewJavascriptBridge(function(bridge) {
								bridge.callHandler('ads_ShowInitialize', function(response) {
									if(response=="true"){
										
									}
					 })
				 })
		}                          
	}
function isHaveAd(reward,rewardm){
	console.log("ads_HasRewardedVideo======");
	setupWebViewJavascriptBridge(function(bridge) {
								bridge.callHandler('ads_HasRewardedVideo', function(response) {
									if(response=="true"){
										reward();
									}else{
										rewardm();
										adfailXFunc()
									}
					 })
				 })
}


window.ontouchstart = function(e) {
				e.preventDefault(); 
			};
			
function printLog(s) {
		console.log(s);
	}