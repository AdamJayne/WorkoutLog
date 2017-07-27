$(document).ready(function(){
	$.extend(WorkoutLog, {
		definition: {
			userDefinition: [],

			create: function(){
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				}

				var postData = { definition: def };

				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				define.done(function(data){
					WorkoutLog.definition.userDefinition.push(data.definition);
					$("#def-description").val("");
					$("#def-logtype").val("");
					$('a[href="#log"]').tab("show");
				});

				define.fail(function(err){
					console.log(err);
				});
			},

			fetchAll: function(){
				if( window.localStorage.getItem("sessionToken")){
					$.ajax({
						type: "GET",
						url: WorkoutLog.API_BASE + "definition",
						headers: {
							"Authorization" : window.localStorage.getItem("sessionToken")
						}
					 }) .done(function(data){
					// 	console.log(data);
					// 	WorkoutLog.definition.userDefinition.push(data.description);
					// });
					WorkoutLog.definition.userDefinition
					})
				}
			}
		}
	});
	
	$('#def-save').on('click', WorkoutLog.definition.create)

})
