$(document).ready(function(){
	$.extend(WorkoutLog, {
		log: {
			workouts: [],

			setDefinitions: function(){
				var defs = WorkoutLog.definition.userDefinition;
				var len = defs.length;
				var opts;

				for(var i = 0; i < len; i++){
					opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>";
				}

				$("#log-definition").children().remove();
				$("#log-definition").append(opts);
			},

			setHistory: function(){
				var history = WorkoutLog.log.workouts;
				var len = history.length;
				var lis = "";

				for(var i = 0; i < len; i++){
					lis += "<li class='list-group-item'>" + history[i].def +" - " + history[i].result + "</li>"
				}

				$("#history-list").children().remove();
				$("#history-list").append(lis);
			},

			create: function () {
				// rip the data from the imputs and store it in an object
				var itsLog = {
					description: $('#log-description').val(),
					result: $('#log-result').val(),
					def: $('#log-definition option:selected').val()
				};
				// wrap that object inside of an object so we can POST
				var postData = { log: itsLog }
				// now use ajax to send the request to the log api
				var logger = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(postData),
					contentType: "application/json"
				})

				logger.done(function(data){
					WorkoutLog.log.workouts.push(data);
				})
			},

			fetchAll: function(){
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log",
					headers: {
						"Authorization" : window.localStorage.getItem("sessionToken")
					}
				});

				fetchDefs.done(function(data){
					WorkoutLog.log.workouts = data
				}).fail(function(err){
					console.log("This error happened: "+err);
				});
			}
		}
	})

	$('#log-save').on('click', WorkoutLog.log.create);
	if (window.localStorage.getItem("sessionToken")){
		WorkoutLog.log.fetchAll();
	}
});