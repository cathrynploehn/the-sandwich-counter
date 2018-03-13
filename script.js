$(document).ready(function(){
		$('#howManyContainer').html('<div id="sidebar"><div id="header"><h1>In the past <span id="seconds"></span> seconds,</h1><div id="counter"></div><h1 id="total"><span ></span> </h1><h1>sandwiches<br> have been eaten in the U.S.</h1></div></div><canvas id="overlay"></canvas>')

		var canvas = document.getElementById("overlay");
			canvas.width  = window.innerWidth;
			canvas.height = window.innerHeight;
		var ctx = canvas.getContext("2d");
		var sandwiches = {
			"sandwich" : {
				"rate": 1.356
			}
		};
		var globalID;
		var totalsandwiches = 0; 
		var numsandwiches;
		var startTime = Date.now();

		for(sandwich in sandwiches){
			$('#counter').append('<div class="sandwich counter-' + sandwich + '"><div><span class="number"></span><img id="'+ sandwich +'" src="./' + sandwich + '.png"> '+sandwich+'es </div>');
			sandwiches[sandwich]["drawnsandwiches"] = 0;
			sandwiches[sandwich]["image"] = document.getElementById(sandwich);
		}

		function drawsandwich() {
		 	for(sandwich in sandwiches){
				var timeElapsed = Date.now() - startTime;
				numsandwiches = Math.round(timeElapsed * sandwiches[sandwich]["rate"]+1);
				var numToDraw = numsandwiches - sandwiches[sandwich]["drawnsandwiches"];
				if(numToDraw > 0){
					for(var i =0; i < numToDraw; i++){
						ctx.drawImage(sandwiches[sandwich]["image"], (Math.random() * canvas.width)-9, (Math.random() * canvas.height)-9);
						sandwiches[sandwich]["drawnsandwiches"]++;
						totalsandwiches++;
					}
					var elem = "#counter .counter-" + sandwich + " .number";
					// $(elem).html(sandwiches[sandwich]["drawnsandwiches"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
				}
			}
		  globalID = requestAnimationFrame(drawsandwich);
		  $('#seconds').html(Math.round(timeElapsed / 1000));
		  $('#total').html(totalsandwiches.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		}
		requestAnimationFrame(drawsandwich);

		setInterval(function() {
			// ctx.fillStyle = "rgba(" + 119 + ", " + 27 + ", " + 14 + ", 0.1)";
		 	// ctx.fillRect(0,0,canvas.width, canvas.height);
		}, 1000/30);
	
});
