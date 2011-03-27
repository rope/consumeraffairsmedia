var getGlobal = function(v){
    return (typeof window[v] != 'undefined')?window[v]:null;
}

$(function(){
    reputation_management = getGlobal('reputation_management');
    if (reputation_management){
        var comments = $('.complaint');
        $.ajax({
            url: '/api/responses/' + campaign_id + '/',
            method: 'get',
            dataType: 'json',
            success: function(resp){
                for(r in resp){
                    response = resp[r];
                    respBox = $('<div id="resp-'+response.id+'" />')
                        .html(verified_img + ' ' + response.response);
                    comments.filter('#' + response.id).find('.responseBtn')
                        .data('respBox',respBox)
                        .data('title', company_name +' responds to '+ response.alias);
                }
            }
        });

        $(comments).delegate('.responseBtn', 'click',function(e){
            btn = $(this);
            btn.data('respBox')
                .dialog({
                    modal:true,
                    draggable:false,
                    width:600,
                    height:400,
                    title: btn.data('title')
                });
            e.preventDefault();
        })
    }
});


// jquery plugins
(function($){
    $.fn.insertAfterOffset = function(offset, elements){
        var elements = $(elements);
        var content = this;
        var lastElement = $($('#place_after_test_div').get(0) ||
                $('<div id="place_after_test_div"></div>').insertAfter(elements.last()));
        var elementsBottom = lastElement.offset().top;
        elements.push(lastElement);
        if( elementsBottom > offset ){
            for( i = 0; i < elements.length; i++ ){
                currentElement = elements.eq(i);
                if( currentElement.offset().top > offset ){
                    currentElement.before(content);
                    return content;
                }
            }
        }
    }
})(jQuery);

/*
 * jQuery Message Queuing - v1.0 - 1/5/2010
 * http://benalman.com/projects/jquery-message-queuing-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,b){var a={delay:100,batch:1,queue:[]};$.jqmq=function(c){var l={},j=$.extend(true,{},a,c),f=j.queue,k=j.paused,i=[],g,d,n,m,e;l.add=function(p,o){return n([p],o)};l.addEach=n=function(o,p){if(o){d=false;f=p?o.concat(f):f.concat(o);k||e()}return m()};l.start=e=function(){k=false;if(m()&&!g&&!i.length){(function o(){var q=j.delay,p=j.batch,r=j.complete,s=j.callback;h();if(!m()){d=true;r&&r.call(l);return}i=f.splice(0,p);if(s&&s.call(l,p===1?i[0]:i)===true){f=i.concat(f);i=[]}if(typeof q==="number"&&q>=0){i=[];g=setTimeout(o,q)}})()}};l.next=function(o){var p=j.complete;if(o){f=i.concat(f)}i=[];if(m()){k||e()}else{if(!d){d=true;p&&p.call(l)}}};l.clear=function(){var o=f;h();f=[];d=true;i=[];return o};l.pause=function(){h();k=true};l.update=function(o){$.extend(j,o)};l.size=m=function(){return f.length};l.indexOf=function(o){return $.inArray(o,f)};function h(){g&&clearTimeout(g);g=b}k||e();return l};$.fn.jqmqAdd=function(d,c){d.add(this.get(),c);return this};$.fn.jqmqAddEach=function(d,c){d.addEach(this.get(),c);return this}})(jQuery);

/*
 * jQuery loadAdScript - v1.1 - 7/12/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var c=document,a=c.write,d=c.writeln,b=$.jqmq({delay:-1,callback:function(e){c.write=c.writeln=function(f){e.elems.append(f)};$.getScript(e.url,function(){e.callback&&e.callback.call(e.elems);b.next()})},complete:function(){c.write=a;c.writeln=d}});$.fn.loadAdScript=function(e,f){b.add({elems:this,url:e,callback:f});return this}})(jQuery);

/* Social Buttons */
$(function() {
    $.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
    $.addToCookie = function(cookieName, pageId) {
        var socialLinks = $.cookie(cookieName);
        socLinkValues = (socialLinks) ? socialLinks.split("\t") : [];
        if (socLinkValues.indexOf(pageId) == -1) {
            if (socLinkValues.push(pageId) > 10) {
                socLinkValues.splice(0,1);
            }
            socialLinks = socLinkValues.join("\t");
            $.cookie(cookieName, socialLinks, { expires: 5*365, path: '/', domain: 'consumeraffairs.com'});
        }
    };
    $.facebookLikeButton = function(appId, locale, callback) {
        window.fbAsyncInit = function() {
            if (typeof FB == 'undefined') {
            	return;
            }
            FB.init({appId: appId, status:true, cookie:true, xfbml:true});
            FB.Event.subscribe('edge.create', function(href, widget) {
                if (callback != null) {
                    callback(href, widget);
                }
            });
        };
        $('body:not(:has(#fb-root))').append('<div id="fb-root"></div>');
        $.getScript(document.location.protocol + '//connect.facebook.net/'+ locale + '/all.js#xfbml=1');
        window.fbInitDone = true; 
    };
    $.facebookLikeButton('134324109971745', 'en_US', function(href, widgetObject) {
        $.addToCookie('social_links', 'f:' + pageId);
    });
    // var pageId = "{{page.id}}";
    $.each($('#content').attr('className').split(' '), function(i,classname){
        if (classname.indexOf('id_') === 0){
            var pageId = classname.substring(2);
            return false;
        }
    });
    var twitter_btn_link = $('#twitter-button');
    var twitter_btn_link_href = twitter_btn_link[0].href;
    // var href = decodeURIComponent("{{page.get_prod_url|urlencode}}");
    var href = decodeURIComponent(twitter_btn_link_href.substring(
        twitter_btn_link_href.indexOf('=') + 1,
        twitter_btn_link_href.indexOf('&text='))
        );
    function encodeURITwitter(Y) {
		return encodeURIComponent(Y).replace(/\+/g, "%2B");
	}
    function twitterPop(str) {
    	var Z = 550,
			h = 450;
		var c = screen.height;
		var b = screen.width;
		var a = Math.round((b / 2) - (Z / 2));
		var g = 0;
        var d = window.open(str,
            "twitter_tweet",
            "left="+a+",top="+g+",width="+Z+",height="+h+
            ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
        if (d) {
			d.focus();
		} else {
			window.location.href = str;
		}
    }
    $.getJSON(
        'ht'+'tp://urls.api.twitter.com/1/urls/count.json?url=' + encodeURITwitter(href) + '&callback=?', 
        function(data) {
            twitter_btn_link.after('<div class="hcount show-count">' +
                '<span class="tb-container" id="tweet-button">' + 
                '<span class="tb">' + 
                '<button tabindex="1" id="btn" type="button" aria-describedby="btn-desc">Tweet</button>'+
                '</span>' +
                '<span class="t-count enabled">' + 
                '<button tabindex="2" id="count" type="button" aria-describedby="count-desc">' + 
                data.count + 
                '</button></span></span>' +
                '</div>' +
                '<p id="btn-desc" class="offscreen">Share ' + href + ' on Twitter</p>' +
                '<p id="count-desc" class="offscreen">The URL '+ 
                href +' has been shared ' + data.count + ' times.View these Tweets.</p>');
            twitter_btn_link.remove();
            $("#tweet-button").click(function(event) {
                $.addToCookie('social_links', "t:" + pageId);
                twitterPop(twitter_btn_link_href);
                return false;
            });
        }
    );
});