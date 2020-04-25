$(document).ready(function() {
    $("#thanks").hide();
	$('#magazine').turn({
		display: 'double',
		acceleration: true,
		autoCenter: true,
		gradients: !$.isTouch,
		elevation: 50,
		when: {
			turned: function(e, page) {
			/*console.log('Current view: ', $(this).turn('view'));*/
			}
		}
	});
	/*checks if left or right arrow key*/
	$(window).bind('keydown', function(e){
		
		if (e.keyCode==37)
			$('#magazine').turn('previous');
		else if (e.keyCode==39)
			$('#magazine').turn('next');
			
    });
    

    /* hide contact form */
    $("button").click(function() {
        $("#contact").hide("slow");
        $("#thanks").show();
    });

    $("button").click(function(){
		var resName = $("#response-name").val();
		var email = $("#response-email").val();

		//$("#response-area").append(r);
		loadresponse(resName, email);
		$("#response-name").val("");
		$("#response-email").val("");
		console.log("name:" + resName);
    });
    
    function loadresponse(response){
		var responseInput = {
			"text": resName }
		}
		$.ajax({
			url: "https://fapimail.p.rapidapi.com/email/send",
			type: "POST",
			data: JSON.stringify(responseInput),
			contentType: "application/json",
			success: displayResponse
    });
    
    function displayResponse(data)
	{
		console.log("success!"+ data);
		for(key in data){
		//console.log(key+" "+data[key]);
        $("#response-area").append(key+" "+data[key]+"<br>");
        };
    };

    // Email web service 
	var unirest = require("unirest");

	var req = unirest("POST", "https://fapimail.p.rapidapi.com/email/send");

	req.headers({
		"x-rapidapi-host": "fapimail.p.rapidapi.com",
		"x-rapidapi-key": "6ac5c44e24msh53d470de62b95f9p151ceejsn06ab329a114b",
		"content-type": "application/json",
		"accept": "application/json"
	});

	req.type("json");
	req.send({
		"recipient": "ravenRecievedEmail45@gmail.com",
		"sender": "ravenRecievedEmail45@gmail.com",
		"subject": "Subject of Email",
		"message": "Body of Email"
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
    });

    /* Smooth scrolling */
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});
	

	

	
    
   
	