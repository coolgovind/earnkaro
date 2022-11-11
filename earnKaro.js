var $ = jQuery;
	var store_name = [];
	$(document).ready(function(){
		$.get("https://cdn.jsdelivr.net/gh/coolgovind/earnkaro@latest/store.json", function(data, status){
	        store_name = data.keywords;
	        convertURL(EarnKaroToken, store_name);
	    });
	});

	function convertURL(EarnKaroToken, store_name)
	{
		$('a').click(function (e){
			var _href = $(this).attr('href');
			var match = _href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
			var host = match[2];
			var number_of_store_items= store_name.length;
			for (store_no = 0; store_no < number_of_store_items; store_no++) {
				var matched_store = store_name[store_no];
				if (host.toLowerCase().indexOf(matched_store) >= 0){
					e.preventDefault();
					var settings = {
					  "url": "http://ekaroconverter-env.eba-psp58nny.ap-south-1.elasticbeanstalk.com/api/convert/ekaro",
					  "method": "POST",
					  "timeout": 0,
					  "headers": {
					    "Authorization": "Bearer " + EarnKaroToken,
					    "Content-Type": "application/json"
					  },
					  "data": JSON.stringify({
					    "url": _href
					  }),
					};

					$.ajax(settings).done(function (response) {
					  window.open(response.data[0].ekaro_url,'_blank');
					});
				}
			}
		});
	}
