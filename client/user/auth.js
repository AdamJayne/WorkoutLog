$(document).ready(function(){
	$.extend(WorkoutLog, {
		var username = $('#su_username').val();
		var password = $('#su_password').val();

		var user = {
			user: {
				username: username,
				password: password
			}
		};

		var signup = $.ajax({
			type:"POST",
			url: WorkoutLog.API_BASE + "user",
			data: JSON.stringify(user),        // This translates the Javascript object into JSON data
			contentType: "application/json"
		});

		signup.done(function(data){
			WorkoutLog.setAuthHeader(data.sessionToken);

			$('#signup-modal').modal("hide");
			$('.disable').removeClass("disable");
			$('#loginout').text("Logout");
		}).fail(function(){
			$("#su_error").text(("There was a problem with sign up").show()
		)};
		)
	};
	$("#signup").on("click", WorkoutLog.signup);
});