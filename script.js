window.onload = function () {
  let menu = document.getElementById("navbar-nav");
  let menuBottom = 100;
  let arrow = document.getElementById("totop");
  window.onscroll = function () {
    if (document.documentElement.scrollTop < menuBottom) {
      arrow.classList.add("fade");
    } else {
      arrow.classList.remove("fade");
    }
  };

  let state = document.readyState;
  document.getElementById("load").style.visibility = "hidden";
  if (state == "interactive") {
    document.getElementById("content").style.visibility = "hidden";
  } else if (state == "complete") {
    setTimeout(function () {
      document.getElementById("load").style.visibility = "hidden";
      document.getElementById("content").style.visibility = "visible";
    }, 2000);
  }

  let count = 0;
  let remain;
  let answer = [];
  const countElement = document.getElementById("count");
  const button = document.getElementById("guess-btn");
  let remainElement = document.getElementById("remain");
  let words = [
    "affordable",
    "innovation",
    "powerful",
    "unbeatable",
    "features",
    "flagship",
    "future",
  ];
  let randomWord = words[Math.floor(Math.random() * words.length)];

  function init() {
    answer[0] = randomWord[0];
    answer[randomWord.length - 1] = randomWord[randomWord.length - 1];
    remain = randomWord.length + 0;

    for (let i = 1; i < randomWord.length - 1; i++) {
      answer[i] = "_";
    }

    let answ = document.getElementById("answ");
    answ.innerHTML = answer.join(" ");
  }

  function check() {
    let guess = prompt("Enter a letter:");

    let correctGuess = false;
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guess) {
        answer[i] = guess;
        remain--;
        remainElement.innerHTML = "Remains " + remain + " attempts";
        correctGuess = true;
      }
    }
    count++;
    countElement.innerHTML = `It was ${count} attempts`;
    answ.innerHTML = answer.join(" ");
    if (answer.join("") === randomWord) {
      remainElement.innerHTML = "You got a discount!";
      button.disabled = true;
    } else if (count >= randomWord.length) {
      remainElement.innerHTML = "You lost :(";
      button.disabled = true;
    }
  }

  button.addEventListener("click", check);

  init();

  function addText(text) {
    let elem = document.getElementById("block");
    let timer;
    let pos = 0;

    function addLetter() {
      pos++;
      elem.innerHTML = text.substring(0, pos);
      if (pos == text.length) {
        clearInterval(timer);
      }
    }
    timer = setInterval(addLetter, 500);
  }

  addText("Top for your money!");
};

function loadXiaomi() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "xiaomi.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let books = JSON.parse(xhttp.responseText);
      insertBooks(books);
    }
  };
}

function loadRedmi() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "redmi.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let books = JSON.parse(xhttp.responseText);
      insertBooks(books);
    }
  };
}

function loadPoco() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "poco.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let books = JSON.parse(xhttp.responseText);
      insertBooks(books);
    }
  };
}

function insertBooks(books) {
  let str = `<div class="wrap">`;
  for (let i = 0; i < books.length; i++) {
    str += `<div class="bookWrap">`;
    str += `<div class="image"><img src="${books[i].imageCover}" /></div>`;
    str += `<h2>${books[i].name}</h2>`;
    str += `<p>${books[i].price}</p>`;
    str += `</div>`;
  }
  str += `</div>`;
  document.getElementById("books").innerHTML = str;
}

let xiaomi = document.getElementById("load-xiaomi");
xiaomi.addEventListener("click", loadXiaomi);

let redmi = document.getElementById("load-redmi");
redmi.addEventListener("click", loadRedmi);

let poco = document.getElementById("load-poco");
poco.addEventListener("click", loadPoco);

$(function () {
  const phrases = [
    "Our manager will call you back as soon as possible!",
    "For details, please call 123456789.",
    "Stay in touch!",
    "Today is beautiful weather!",
    "It is very pleasant to communicate with you!",
  ];
  const hello = "Hello!";
  const bye = "So far, it was nice talking to you!";
  const xiaomi = [
    "Xiaomi's latest flagship phone has a stunning display and amazing camera features!",
    "Xiaomi's latest phone is the Mi 13, have you checked it out?",
    "Xiaomi's MIUI interface is highly customizable and user-friendly.",
    "Xiaomi offers a wide range of accessories to complement your phone, including cases, headphones, and power banks.",
    "Xiaomi's phones come in a variety of sizes and colors, so you can find the perfect one to match your style.",
  ];
  const redmi = [
    "The Redmi Note 12 has just been released, it's a great budget phone!",
    "Redmi's budget-friendly phones offer great value for money and impressive specs.",
    "The Redmi Note series is one of the most popular smartphone lines in the world.",
  ];
  const poco = [
    "Looking for a phone with a long battery life? Poco's got you covered.",
    "Poco's F series phones are perfect for gamers with their powerful processors and high refresh rate displays.",
    "Poco's phones offer fast charging capabilities, so you can quickly power up your phone on the go.",
  ];

  $("#chatbot").click(function () {
    $(this).toggleClass("show");
  });

  $("#answers").append(`<div class="bot-answ">${hello}</div>`);

  $("#answers").click(function () {
    return false;
  });

  $("#ok").click(function () {
    let q = $("#question").val().trim();
    $("#question").val("");
    if (q != "") {
      $("#answers").append(`<div class="hum-answ">${q}</div>`);

      setTimeout(function () {
        if (
          q.toLowerCase().includes("hi") ||
          q.toLowerCase().includes("hello")
        ) {
          $("#answers").append(`<div class="bot-answ">${hello}</div>`);
        } else if (
          q.toLowerCase().includes("bye") ||
          q.toLowerCase().includes("goodbye")
        ) {
          $("#answers").append(`<div class="bot-answ">${bye}</div>`);
        } else if (q.toLowerCase().includes("xiaomi")) {
          const miAnsw = xiaomi[Math.floor(Math.random() * xiaomi.length)];
          $("#answers").append(`<div class="bot-answ">${miAnsw}</div>`);
        } else if (q.toLowerCase().includes("redmi")) {
          const redmiAnsw = redmi[Math.floor(Math.random() * redmi.length)];
          $("#answers").append(`<div class="bot-answ">${redmiAnsw}</div>`);
        } else if (q.toLowerCase().includes("poco")) {
          const pocoAnsw = poco[Math.floor(Math.random() * poco.length)];
          $("#answers").append(`<div class="bot-answ">${pocoAnsw}</div>`);
        } else {
          const random = Math.floor(Math.random() * phrases.length);
          const phrase = phrases[random];
          $("#answers").append(`<div class="bot-answ">${phrase}</div>`);
        }

        const chatbot = document.getElementById("chatbot");
        $("#chatbot").animate(
          { scrollTop: chatbot.scrollHeight - chatbot.clientHeight },
          100
        );
      }, 1000);
    }
    return false;
  });

  $("#question").click(function () {
    return false;
  });

  function enterKey(event) {
    if (event.keyCode == 13) {
      $("#ok").click();
      return false;
    }
  }

  $("#question").keypress("keyup", enterKey);
});

$(document).ready(function () {
  $(window).scroll(function () {
    let winTop = $(window).scrollTop();
    $(".parallax").css(
      "background-position",
      "80px " + (500 - winTop * 2) + "px, " + (200 - winTop * 0.5) + "px"
    );
  });
});
