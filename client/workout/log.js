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
					lis += "<li class='list-group-item'>" + history[i].def +" - " + history[i].result + "<div class='pull-right'>"+"<button id='"+ history[i].id + "' class = 'remove glyphicon glyphicon-trash'>"+ "</li>"
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
					$('#log-description').val("");
					$('#log-result').val("");
					$('a[href="#history"]').tab('show');
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
			},

			getWorkout: function(){
				var thisLog = {id: $(this).attr("id")};
				console.log(thisLog);
				logID= thisLog.id;
				var updateData = {log: thisLog};
				var getLog = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log/" + logID,
					data: JSON.stringify(updateData),
					contentType: "application/json"
				});
				getLog.done(function(data){
					$('a[href=#update-log]').tab("show");
					$('#update-result').val(data.result);
					$('#update-description').val(data.description);
					$('#update-id').val(data.id);
				});
			},

			updateWorkout: function(){
				$("#update").text("Update");
				var updateLog = {
					id: $('#update-id').val(),
					desc: $("#update-description").val(),
					result: $("update-result").val(),
					def: $("#update-definition option:selected").text()
				};
				for(var i = 0; i  < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == updateLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}
				WorkoutLog.log.workouts.push(updateLog);
				var updateLogData = {log: updateLog};
				var updater = $.ajax({
					type: "PUT",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(updateLogData),
					contentType: "applicaiton/json"
				});
				updater.done(function(data){
					console.log(data);
					$("#update-description").val("");
					$("#update-result").val("");
					$('a[href="#history"]').tab("show");
				})
			},

			delete: function(){
				var thisLog = {
					id: $(this).attr("id")
				};

				var deleteData = {log: thisLog};
				var deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});

				$(this).closest("li").remove();
				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == thisLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				};
				deleteLog.fail(function(){
					console.log("The workout was not deleted!");
				});
			}
		}
	})

	$('#log-save').on('click', WorkoutLog.log.create);
	$("#log-update").on('click', WorkoutLog.log.updateWorkout);
	$('#history-list').delegate('.remove', 'click', WorkoutLog.log.delete);
	$('#history-list').delegate('.update', 'click', WorkoutLog.log.getWorkout);
	if (window.localStorage.getItem("sessionToken")){
		WorkoutLog.log.fetchAll()
		// WorkoutLog.definition.fetchAll()
	}
});