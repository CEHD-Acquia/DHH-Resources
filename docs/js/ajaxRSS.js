/***********************************************
* Loosely based on ....
***********************************************/

// -------------------------------------------------------------------
// RSS Display Box (Ajax invocation)- Created Dec 2nd 2006 | Last updated Dec 18th, 2006
// Author: Dynamic Drive (http://www.dynamicdrive.com)
// -------------------------------------------------------------------


var rootdomain="https://"+window.location.hostname
//specify path to feed parser - must be on the same box
var rssoutputscript=rootdomain+"/attributes/rssParser/RssParser.aspx"
//Spedify HTML to show while feed is being fetched
var loadingHTML='<img src="/attributes/images/rss-loading.gif" /> Loading ...' 

function getRssFeed(divId, sourcefile, stylesheet, CustomErrorMessage){
var myrssdisplaybox = new rssdisplaybox(divId, sourcefile, stylesheet, CustomErrorMessage)
}

////////////No need to edit beyond here//////////////

// -------------------------------------------------------------------
// PUBLIC: rssdisplaybox(RSS_id, cachetime, divId, divClass)
// Main RSS Display Box Object function.
// -------------------------------------------------------------------

function rssdisplaybox(divId,  sourcefile, stylesheet, CustomErrorMessage){
this.loadingHTML=loadingHTML
//this.loadingHTML='<img src="loading.gif" /> Loading...' //Specify HTML to show while feed is being fetched
//this.RSS_id=RSS_id //Array key indicating which RSS feed to display
this.boxid=divId //CSS ID of DIV that will hold the RSS feed items
this.sourcefile=sourcefile //url of RSS Feed
this.stylesheet=stylesheet //XSLT stylesheet that will transform the feed
this.CustomErrorMessage=CustomErrorMessage //Custom error message to display if feed does not respond
//document.write('<div id="'+divId+'-maincontainer"></div>') //Output a master DIV to contain RSS box and pagination div, plus to anchor box's position on the page
this.start()
}


// -------------------------------------------------------------------
// PUBLIC: start()- User initiated start() function, to tell the script to initialize itself.
// -------------------------------------------------------------------

rssdisplaybox.prototype.start=function(){
//var rssboxhtml='<div id="'+this.boxid+'"></div>'
//document.getElementById(this.boxid+'-maincontainer').innerHTML=rssboxhtml
document.write('<div id="'+this.boxid+'"></div>')
this.ajaxobj=createAjaxObj()
this.getAjaxcontent()
}


// -------------------------------------------------------------------
// PRIVATE: getAjaxcontent()- Makes asynchronous GET request to "content.php" with the supplied parameters
// -------------------------------------------------------------------

rssdisplaybox.prototype.getAjaxcontent=function(){
if (this.ajaxobj){
var instanceOfBox=this
//var parameters=""
//var parameters="id="+encodeURIComponent(this.RSS_id)+"&cachetime="+this.cachetime+"&limit="+this.utotalitems+"&template="+this.template+"&bustcache="+new Date().getTime()
var parameters="rssfeed="+encodeURIComponent(this.sourcefile)+"&xslt="+rootdomain+encodeURIComponent(this.stylesheet)+"&bustcache="+new Date().getTime()
document.getElementById(this.boxid).innerHTML=this.loadingHTML
this.loadingHTML=null
this.ajaxobj.onreadystatechange=function(){instanceOfBox.initialize()}
this.ajaxobj.open('GET', rssoutputscript+"?"+parameters, true)
this.ajaxobj.send(null)
}
}

// -------------------------------------------------------------------
// PRIVATE: initialize()- Initialize RSS Display Box method.
// -------------------------------------------------------------------

rssdisplaybox.prototype.initialize=function(){ 
if (this.ajaxobj.readyState == 4){ //if request of file completed
	if (this.ajaxobj.status==200){ //if request was successful
		var rsscontent=this.ajaxobj.responseText
		document.getElementById(this.boxid).innerHTML=rsscontent
	}
	else //if an error has occured
		document.getElementById(this.boxid).innerHTML=this.CustomErrorMessage
		//document.getElementById(this.boxid).innerHTML=this.ajaxobj.responseText
	}
}


////////// END RSSDISPLAYBOX() FUNCTION ////////////////////

//Create Ajax instance function

function createAjaxObj(){
var httprequest=false
if (window.XMLHttpRequest){ // if Mozilla, IE7, Safari etc
httprequest=new XMLHttpRequest()
}
else if (window.ActiveXObject){ // if IE6 or below
try {
httprequest=new ActiveXObject("Msxml2.XMLHTTP");
} 
catch (e){
try{
httprequest=new ActiveXObject("Microsoft.XMLHTTP");
}
catch (e){}
}
}
return httprequest
}

