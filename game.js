var topics = ["soccer", "basketball", "tennis", "football", "swimming"];

function displaySport() {
	var sport = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=7dxhegEV1MBawkFEEvtf9NoK7MW7E46y&limit=3";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	$("#sport-view").empty();
    	
    	var data = (response.data);

    	for (var i = 0; i < data.length; i++) {
    		var rating = data[i].rating;
    		var gifStill = data[i].images.original_still.url;
    		var gifAnimated = data[i].images.original.url;

      		var sportDiv = $("<div class='sport'>");
      		var image = $("<img>").attr("src", gifStill);
      		image.attr("data-play", gifAnimated);
      		image.on("click", function(event) {
      			$(this).attr("src", $(this).attr("data-play"));
      		});
      		sportDiv.append(image);
      		var pRating = $("<p>").text("Rating: " + rating);
      		sportDiv.append(pRating);
      		$("#sport-view").append(sportDiv);

    		
			// var pOne = $("<p>").text("Rating: " + rating);
			// sportDiv.append(pOne);
			// $("#sport-view").append(sportDiv);
    	};

    		

		

	

		
    	});

    	
    	
   
}

function renderButtons() {
	$("#buttons-view").empty();
	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("sport");
		newButton.attr("data-name", topics[i]);
      	newButton.text(topics[i]);
      	$("#buttons-view").append(newButton);
      	newButton.on("click", displaySport);
	}
}


$("#add-sport").on("click", function(event) {
    event.preventDefault();
    var sport = $("#sport-input").val().trim();
    $("#sport-input").val('');
    if (sport != "" && topics.indexOf(sport) == -1) {
    	topics.push(sport);
    	renderButtons();	
    }
        
});

renderButtons();
//http://api.giphy.com/v1/gifs/search?q=soccer&api_key=7dxhegEV1MBawkFEEvtf9NoK7MW7E46y&limit=1
// $("#debug").val(response);