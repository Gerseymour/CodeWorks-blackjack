// console.log("Hello world")
//
//
// function draw {
//   when button hit
//   add random card to hand
// }
// function count {
//   add hand
//   if greater than 21 -> bust
//   if = 21 dealer turn
//   if lower than 21 add hit or stand
// }
// function stand {
//   dealer turn
//   dealer draws until 5+ cards or 21 or bust
// }
// function win {
//   if you stand and the dealer goes bust
// }
//  press play -> .rulesbox to display none


$(".playbtn").on("click", start);
$(".hit").on("click", playerDraw);
$(".replay").on("click", restart);
$(".stand").on("click", dealer);
// $(".player-wins").text(win)
// $(".dealer-wins").text(dealer)
// var win = 0
// var dealer = 0




function restart() {
  $(".facedown").remove();
  $("#dealer").append('<img class="facedown card dhsecond" src="css/images/gray_back.png" alt="card-img">')
  $(".drawn").remove();
  $(".hit").show();
  $(".stand").show();
  $(".replay").hide();
  $(".dealer-score").removeClass("yellow red");
  $(".player-score").removeClass("yellow red");
  $("h1").html("♣<span class='red'>♥♦</span>♠BlackJack♠<span class='red'>♦♥</span>♣")
  start();
}


function start() {
  $(".cover").css("display", "none");

  var playerRanFirst = Math.floor((Math.random() * 52) + 1)
  $(".phfirst").attr({
    alt: playerRanFirst,
    src: "css/deck/" + playerRanFirst + ".png"
  });
  var playerRanSecond = Math.floor((Math.random() * 52) + 1)
  $(".phsecond").attr({
    alt: playerRanSecond,
    src: "css/deck/" + playerRanSecond + ".png"
  });
  var dealerRanFirst = Math.floor((Math.random() * 52) + 1)
  $(".dhfirst").attr({
    alt: dealerRanFirst,
    src: "css/deck/" + dealerRanFirst + ".png"
  });
  playerScore();
  dealerScore();
  }

function dealer() {
  $(".dhsecond").remove()
  $(".stand").hide();
  $(".hit").hide();
  $(".replay").show();
  do {
  var newRan = Math.floor((Math.random() * 52) + 1);
  $("#dealer").append('<img class="dealerhand card drawn" src= "css/deck/' + newRan + '.png" alt=' + newRan + '>')
  dealerScore();
}while (dealerScore() < 17)
  whoWins();
}


function playerDraw() {
  var newRan = Math.floor((Math.random() * 52) + 1);
  $("#player").append('<img class="playerhand card drawn" src= "css/deck/' + newRan + '.png" alt=' + newRan + '>')
  playerScore();
}


function playerScore() {
  var scorePlayer = 0
  for (var i = 0; i < $(".playerhand").length; i++) {
    var cardScore = getScore($(".playerhand").eq(i).attr("alt"), scorePlayer)
    scorePlayer = scorePlayer + cardScore
  }
  var aceScore = aceCheckPlay(scorePlayer);
  bustCheck(aceScore);
  $(".player-score").text(aceScore);

}

function aceCheckPlay(score){
  var scoreAce = score
  for (var j = 0; j < $(".playerhand").length; j++) {
   if (parseInt(($(".playerhand").eq(j).attr("alt")), 10)  <= 4 && scoreAce < 12){
    return (scoreAce + 10);
  }}
    return scoreAce;
}

function dealerScore() {
  var scoreDealer = 0
  for (var i = 0; i < $(".dealerhand").length; i++) {
    var cardScore = getScore($(".dealerhand").eq(i).attr("alt"), scoreDealer)
    scoreDealer = scoreDealer + cardScore
  }
  var aceScoreDeal = aceCheckDeal(scoreDealer);
  $(".dealer-score").text(aceScoreDeal);
  return aceScoreDeal;
}
function aceCheckDeal(score){
  var scoreAceDeal = score
  for (var k = 0; k < $(".dealerhand").length; k++) {
    if (parseInt(($(".dealerhand").eq(k).attr("alt")), 10)  <= 4 && scoreAceDeal < 12){
      return (scoreAceDeal + 10);
  }}
    return scoreAceDeal;
}

function bustCheck(score) {
  if (score > 21) {
    $(".player-score").addClass("red");
    $(".dealer-score").addClass("yellow");
    $(".hit").hide();
    $(".stand").hide()
    $(".replay").show()
    $("h1").text("😭😭BUST😭😭")
  } else if (score == 21) {
    $(".player-score").addClass("yellow")
    $(".hit").hide();
    $("h1").text("🤩🤩21!🤩🤩")
  }
}


function whoWins() {
  var finalPlayerScore = parseInt($(".player-score").text(), 10);
  var finalDealerScore = parseInt($(".dealer-score").text(), 10);

  if(finalDealerScore > 21 || (finalDealerScore < finalPlayerScore && finalPlayerScore <= 21)){
    $("h1").text("🤩🤩Winner!🤩🤩")
    $(".player-score").addClass("yellow")
    $(".dealer-score").addClass("red")
  } else if (finalDealerScore == finalPlayerScore){
    $("h1").text("🙄🙄Draw🙄🙄")
    $(".player-score").addClass("red")
    $(".dealer-score").addClass("red")
  } else if (finalDealerScore > finalPlayerScore && finalDealerScore <= 21){
    $("h1").text("😭😭Loser😭😭")
    $(".player-score").addClass("red")
    $(".dealer-score").addClass("yellow")
  }
}

function getScore(alt, score) {
  var altNum = parseInt(alt, 10);
  if (altNum <= 4) {
    altNum = 1
  } else if (altNum <= 8) {
    altNum = 2
  } else if (altNum <= 12) {
    altNum = 3
  } else if (altNum <= 16) {
    altNum = 4
  } else if (altNum <= 20) {
    altNum = 5
  } else if (altNum <= 24) {
    altNum = 6
  } else if (altNum <= 28) {
    altNum = 7
  } else if (altNum <= 32) {
    altNum = 8
  } else if (altNum <= 36) {
    altNum = 9
  } else if (altNum <= 52) {
    altNum = 10
  }
  return altNum;
}
