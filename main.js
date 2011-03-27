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
