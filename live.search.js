/****
@since 1.2.0
***/
jQuery( document ).ready(function( $ ) {
	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		}
	})();
	var searchRequest = false,
		enterActive = true;
	$('input[name="s"]').on("input", function() {
		var s = this.value;
		delay(function(){
		if( s.length <= 2 ) {
			$(dtGonza.area).hide();
			$(dtGonza.button).find('span').removeClass('icons-spinner9').removeClass('animate-loader');
			return;
		}
		if(!searchRequest) {
	    	searchRequest = true;
			$(dtGonza.button).find('span').addClass('icons-spinner9').addClass('animate-loader');
			$(dtGonza.area).find('ul').addClass('process').addClass('noselect');
			$.ajax({
		      type:'GET',
		      url: dtGonza.api,
		      data: 'keyword=' + s + '&nonce=' + dtGonza.nonce,
		      dataType: "json",
		      success: function(data){
				if( data['error'] ) {
					$(dtGonza.area).hide();
					return;
				}
				$(dtGonza.area).show();
					var res = '<span class="icon-search-1">' + s + '</span>',
						moreReplace = dtGonza.more.replace('%s', res),
						moreText = '<li class="ss-bottom" style="padding: 0; border-bottom: none;"><a class="more" href="javascript:;" onclick="document.getElementById(\'searchform\').submit();">View all</a></li>';
						moreText2 = '<li class="ss-bottom" style="padding: 0; border-bottom: none;"><a class="more" href="javascript:;" onclick="document.getElementById(\'searchform\').submit();">View all</a></li>';
					var items = [];
					$.each( data, function( key, val ) {
					  	name = '';
					  	date = '';
					  	imdb = '';
						kat = '';
					  	if( val['extra']['date'] !== false )
					  		date = "<span class='release'>(" + val['extra']['date'] + ")</span>";

					  	if( val['extra']['names'] !== false )
					  		name = val['extra']['names'];

					  	if( val['extra']['imdb'] !== false )
					  		imdb = "<span class='quality'>Imdb  " + val['extra']['imdb'] + "</span>";

					   	items.push("<li><a style=\"background-image: url(" + val['img'] + ")\" class=\"thumb\" href=\"" + val['url'] + "\"></a><div class=\"ss-info\"><a href=\"" + val['url'] + "\" class=\"ss-title\">" + val['title'] + "</a><p>" + imdb + "</p><p>"  + val['kat'] +  "</p><div class=\"clearfix\"></div></li>");
					});
					$(dtGonza.area).html('<ul>' + items.join("") + moreText + moreText2 +'</ul>');
				},
				complete: function() {
			      	searchRequest = false;
			      	enterActive = false;
					$(dtGonza.button).find('span').removeClass('icons-spinner9').removeClass('animate-loader');
					$(dtGonza.area).find('ul').removeClass('process').removeClass('noselect');
				}
		   	});
		}	 
		}, 500 ); 
	});
	$(document).on("keypress", "#search-form", function(event) { 
		if( enterActive ) {
			return event.keyCode != 13;
		}
	});
	$(document).click(function() {
		var target = $(event.target);
		if ($(event.target).closest('input[name="s"]').length == 0) {
			$(dtGonza.area).hide();
		} else {
			$(dtGonza.area).show();
		}
	});
});
