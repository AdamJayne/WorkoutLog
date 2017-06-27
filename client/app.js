$(document).ready(function(){
	$("#testAPI").on('click', function(){
		console.log('hey its working')
	});

	var test = $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	})
	// .done() = deferred promise
	.done(function(data){
		console.log(data);
	})

	.fail(function(){
		console.log("Oops, the server is not responding");
	});
});