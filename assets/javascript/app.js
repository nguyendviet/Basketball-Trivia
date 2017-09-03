$(document).ready(function() {
	var pool = [];
	var gif = ["assets/images/miss.gif", "assets/images/dunk.gif", "assets/images/block.gif"];
	var currentQuest;
	var currentAnswer;
	var timer;
	var seconds;
	var timeout;
	var correctAnswer = 0;
	var wrongAnswer = 0;
	var unanswer = 0;
	var round = 0;

/*==================================================================FUNCTIONS*/
	function resetGame() {
		pool = [
			{id: 0, question: "Who is the tallest player in NBA history?", options: ["Manute Bol", "Slavko Vranes", "Yao Ming", "Shawn Bradley"], answer: 0},
			{id: 1,	question: "Who is the shortest player in NBA history?", options: ["Earl Boykins", "Muggsy Bogues", "Mel Hirsch", "Greg Grant"], answer: 1},
			{id: 2, question: "Who is the Olympic medal male leader?", options: ["Gennadi Volnov", "LeBron James", "Carmelo Anthony", "Pau Gasol"], answer: 2},
			{id: 3, question: "Apart from the US, what country has won the most FIBA Basketball Wold Cup?", options: ["Soviet Union", "Spain", "Argentina", "Yugoslavia"], answer: 3},
			{id: 4, question: "Who is the top scorer in all FIBA World Cup tournaments?", options: ["Nikos Galis, Greece", "Oscar Schmidt, Brazil", "Shin Dong-pa, South Korea", "Dirk Nowitzki, Germany"], answer: 0},
			{id: 5, question: "Who is the Olympic medal female leader?", options: ["Sue Bird", "Teresa Edwards", "	Lauren Jackson", "Seimone Augustus"], answer: 1},
			{id: 6, question: "Who is the top scorer in a single NBA game?", options: ["Kobe Bryant", "David Thompson", "Wilt Chamberlain", "Michael Jordan"], answer: 2},
			{id: 7, question: "Who is the 3-point field goals leader in NBA history?", options: ["Jason Richardson", "Dennis Scott", "Ray Allen", "Stephen Curry"], answer: 3},
			{id: 8, question: "Who is the NBA's worst free throw shooter of all time?", options: ["Ben Wallace", "Wilt Chamberlain", "Shaquille O'Neal", "DeAndre Jordan"], answer: 0},
			{id: 9, question: "Who is the NBA's best free throw shooter of all time?", options: ["Stephen Curry", "Mark Price", "Rick Barry", "Steve Nash"], answer: 3},
			{id: 10, question: "What NBA team won the highest-scoring playoff game of all time?", options: ["Boston Celtics", "Portland Trail Blazers", "San Antonio Spurs", "Dallas Mavericks"], answer: 1},
			{id: 11, question: "What NBA team won the highest-scoring regular season game of all time?", options: ["San Antonio Spurs", "Golden State Warriors", "Detroit Pistons", "Denver Nuggets"], answer: 2},
			{id: 12, question: "What NBA team lost the highest-scoring regular season game of all time?", options: ["San Antonio Spurs", "New York Knicks", "Denver Nuggets", "Milwaukee Bucks"], answer: 2},
			{id: 13, question: "What country has the second most foreign players in the NBA?", options: ["France", "Canada", "Serbia", "Australia"], answer: 0},
			{id: 14, question: "How long is a FIBA court?", options: ["94ft/28.65m", "84ft/25.6m", "74ft/22.56m", "91.86ft/28m"], answer: 3},
			{id: 15, question: "How wide is a WNBA court?", options: ["50ft/15.24m", "42ft/12.8m", "51ft/15.54m", "49.21ft/15m"], answer: 0},
			{id: 16, question: "What is the distance from 3-point line to the basket of a WNBA court?", options: ["23.75ft/7.24m", "20.75ft/6.32m", "22.15ft/6.75m", "19.75ft/6.01m"], answer: 2},
			{id: 17, question: "What NBA team has the largest capacity arena?", options: ["Detroit Pistons", "Chicago Bulls", "Cleveland Cavaliers", "Washington Wizards"], answer: 0},
			{id: 18, question: "What NBA team has the smallest capacity arena?", options: ["Sacramento Kings", "Indiana Pacers", "New Orleans Pelicans", "Brooklyn Nets"], answer: 2},
			{id: 19, question: "Who is the NBA player with most championships?", options: ["Sam Jones", "Bill Russell", "Kareem Abdul-Jabbar", "Magic Johnson"], answer: 1},
		];
		
		$(".question").html("");
		clearBoard();
		$(".start").show();
		$(".restart").hide();
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswer = 0;
		round = 0;
	}
	
	//generate random question from pool
	function randomQuest(obj) {
		var keys = Object.keys(obj);
		return obj[keys[Math.floor(Math.random() * keys.length)]];
	}
	
	function startTimer() {
		seconds = 25; //x seconds = user sees x - 1 seconds
		timer = setInterval(countDown, 1000);
		clearBoard();
		nextQuest();
		round++;
		
		//end game, round > x = user has x rounds
		if (round > 4) {
			endGame();
		}
	}
	
	function stopTimer() {
		clearInterval(timer);
	}
	
	function wait() {
		timeout = setTimeout(startTimer, 1000 * 5); //wait 5 seconds
	}
	
	function countDown() {
		seconds--;
		if (seconds < 10 && seconds > 0) {
			seconds = "0" + seconds;
		}
		
		$(".timer").css("background-color", "black");
		$(".timer").html(seconds);
		
		if (seconds === 0) {
			$(".timer").html("00");
			stopTimer();
			outOfTime();
			wait();
		}
	}
	
	function checkAnswer() {
		stopTimer();
		wait();
		currentAnswer = currentQuest.options[currentQuest.answer];
		
		if ($(this).html() === currentAnswer) {
			correctAnswer++;
			$(".notice").attr("class", "notice green");
			$(".notice").html("Yes, you've scored!" + "<div><img src='" + gif[1] + "'><div>");
			showAnswer();
		}
		else {
			wrongAnswer++;
			$(".notice").attr("class", "notice red");
			$(".notice").html("Sorry, you've missed!" + "<div><img src='" + gif[0] + "'><div>");
			showAnswer();
		}
	}
	
	function showAnswer() {
		$(".options").html("<h4>Answer: " + currentAnswer + "</h4>");
	}
	
	function clearBoard() {
		$(".notice").html("");
		$(".options").html("");
	}
	
	function outOfTime() {
		unanswer++;
		currentAnswer = currentQuest.options[currentQuest.answer];
		$(".notice").attr("class", "notice orange");
		$(".notice").html("Oh no! You've run out of time!" + "<div><img src='" + gif[2] + "'><div>");
		showAnswer();
	}
	
	function endGame() {
		stopTimer();
		$(".timer").html("00");
		clearBoard();
		$(".question").html("<p>Game over! Here's your stats:</p>" + "<p>Scored basket(s): " + correctAnswer + "</p>" + "<p>Missed basket(s): " + wrongAnswer + "</p>" + "<p>Turnover(s): " + unanswer + "</p>");
		$(".restart").show();
		$(".restart").on("click", resetGame);
	}
	
	function nextQuest() {
		currentQuest = randomQuest(pool);
		$(".question").html("<h4>" + currentQuest.question + "</h4>");
		clearBoard();
		
		//print out options
		for (var i = 0; i < 4; i++) {
			$(".options").append("<div class='option'>" + currentQuest.options[i] + "</div>");
		}
		
		$(".option").on("click", checkAnswer);
		
		//filter used question
		pool = pool.filter(function(q) {
			return q.id !== currentQuest.id;
		});
	}
	
	function startGame() {
		resetGame();
		startTimer();
		$(".button").hide();
	}
	
/*==================================================================GAME OPREATION*/
	resetGame();
	$(".start").on("click", startGame);
});