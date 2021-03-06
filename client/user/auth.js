$(document).ready(function(){
	$.extend(WorkoutLog, {
		signup:function(){     // Signup Modal
			var username = $("#su_username").val();
			var password = $('#su_password').val(); 

			var user = {
				user:{
					username: username,
					password: password
				}
			}

			var signup = $.ajax({
				type:"POST", 
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			})

			signup.done(function(data){
				WorkoutLog.setAuthHeader(data.sessionToken);
				WorkoutLog.definition.fetchAll();
				WorkoutLog.log.fetchAll();

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				$('#su_username').val("");
				$('#su_password').val("");
				$('a[href="#define"]').tab('show');
			}).fail(function(){
				$("#su_error").text("There was a problem with sign up").show();
			});
		},
		login : function(){      // Login Modal
			var username = $("#li_username").val();
			var password = $("#li_password").val();

			var user = {
				user : {
					username: username,
					password: password
				}
			}

			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			login.done(function(data){
				if(data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
				}

				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				$('#li_username').val("");
				$('#li_password').val("");
				$('a[href="#define"]').tab('show');
			}).fail(function(){
				$("#li_error").text("There was a problem while logging in").show();
			});
		},

		logout: function(){
			if(window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
		}
	});
	$("#signup").on("click", WorkoutLog.signup);
	$("#login").on("click", WorkoutLog.login);
	$("#loginout").on("click", WorkoutLog.logout);

	if(window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});
