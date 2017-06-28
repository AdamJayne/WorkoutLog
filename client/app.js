$(document).ready(function(){
	var WorkoutLog = (function($, undefined){
		var API_BASE = "http://localhost:3000/api/";
		var userDefinitions = [];
		var setAuthHeader = function(sessionToken){
			window.localStorage.setItem("sessionToken", sessionToken);
			$.ajaxSetup({
				"headers":{
					"Authorization": sessionToken,
				}
			})
		}

		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		}
	})(jQuery);

	$(".nav-tabs a[data-toggle]='tab'").on("Click", function(e){
		var token = window.localStorage.getItem("sessionToken");
		if($(this).hasClass("disabled") && ! token){
			e.preventDefault();
			return false;
		}
	})
});