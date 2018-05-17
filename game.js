var topics = ["Baseball", "Basketball", "Biking", "Swimming", "Soccer"];

function displaySport() {
	var sport = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=7dxhegEV1MBawkFEEvtf9NoK7MW7E46y&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	$("#sport-view").empty();

    	var data = (response.data);

    	for (var i = 0; i < data.length; i++) {
    		var rating = data[i].rating;
    		var gifStill = data[i].images.fixed_height_still.url;
    		var gifAnimated = data[i].images.fixed_height.url;

      		var sportDiv = $("<div class='sport'>");

      		// <img src="play.gif" data-play="play.gif" data-still="still.gif">
      		var image = $("<img>").attr("src", gifStill);
      		image.attr("data-play", gifAnimated);
      		image.attr("data-still", gifStill);

      		image.on("click", function(event) {
      			if ($(this).attr("src") == $(this).attr("data-play")) {
      				var still = $(this).attr("data-still");
      				$(this).attr("src", still);
      			} else { 
      				var play = $(this).attr("data-play");
      				$(this).attr("src", play);
      			}
      		});
      		sportDiv.append(image);
      		var pRating = $("<p>").text("Rating: " + rating);
      		sportDiv.append(pRating);
      		$("#sport-view").append(sportDiv);
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
