let imgDin = document.getElementById("din");

window.onload = function () {
  if (document.documentElement.scrollTop > 200) {
    if (imgDin.classList.contains("hide")) imgDin.classList.remove("hide");
  }
  if (document.documentElement.scrollTop < 300) {
    imgDin.src = "./images/scroll1.webp";
  }
  if (document.documentElement.scrollTop > 300) {
    imgDin.src = "./images/scroll2.jpg";
  }
  if (document.documentElement.scrollTop > 600) {
    imgDin.src = "./images/scroll3.webp";

  }

  let menu = document.getElementById("menu");
  let menuBottom = 100; // пограничное значения отступа от верхнего края при прокрутке
  let arrow = document.getElementById("up");
  window.onscroll = function () {
    if (document.documentElement.scrollTop < menuBottom) {
      // или document.body.scrollTop > menuBottom
      menu.classList.remove("fixed"); // удаляем класс 'fixed'
    } else {
      menu.classList.add("fixed"); // добавляем класс 'fixed'
    }

    if (document.documentElement.scrollTop < menuBottom) {
      arrow.classList.add("fade");
    } else {
      arrow.classList.remove("fade");
    }
  };

  let state = document.readyState;
  document.getElementById("load").style.visibility = "hidden";
  if (state == "interactive") {
    document.getElementById("contents").style.visibility = "hidden";
  } else if (state == "complete") {
    setTimeout(function () {
      document.getElementById("load").style.visibility = "hidden";
      document.getElementById("contents").style.visibility = "visible";
    }, 2000);
  }

  let word = "innovation";
  let count = 0;
  let remain;
  let answer = []; // що відкрито
  const countElement = document.getElementById("count");
  let remainElement = document.getElementById("remain");

  function init() {
    answer[0] = word[0]; // перша літера буде відкрита
    answer[word.length - 1] = word[word.length - 1]; // остання літера буде відкрита
    remain = word.length + 0;

    for (let i = 1; i < word.length - 1; i++) {
      answer[i] = "_"; // між першою та останньою літерою - знаки підкреслення
    }

    console.log(answer);
    console.log(answer.join(" "));
    let answ = document.getElementById("answ");
    answ.innerHTML = answer.join(" ");
  }
  function check() {
    let guess = prompt("Enter a letter:");

    for (let i = 0; i < word.length; i++) {
      // проходимо рядок word поелементно, як масив
      if (word[i] === guess) {
        // якщо літера рядка збіглася з вгаданою
        answer[i] = guess; // записуємо її до масиву відкритих букв
        remain--; // зменшуємо на 1 кількість спроб, що залишилися.
        remainElement.innerHTML = "Remains " + remain + " attempts";
      }
    }
    count++;
    countElement.innerHTML = `It was ${count} attempts`;
    answ.innerHTML = answer.join(" ");
    if (count == 6) {
      alert("You got a discount!");
    } else if (count > 6) {
      alert("You lost :(");
    }
  }

  const guessButton = document.getElementById("guess");
  guessButton.addEventListener("click", check);

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
    str += `<p>${books[i].author}</p>`;
    str += `</div>`;
    str += `<button class="btn btn-primary add_item" data-id="3">Add to Basket</button>`;
  }
  str += `<br> <button class="btn btn-primary" id="checkout">Checkout</button>`;
  str += `</div>`;
  // str += `<div id="cart_content"></div></div>`;
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
    "For details, please call 123456789",
    "Stay in touch!",
    "Today is beautiful weather!",
    "It is very pleasant to communicate with you!",
  ];
  const hello = "Hello!";
  const bye = "So far, it was nice talking to you!";

  $("#chatbot").click(function () {
    $(this).toggleClass("show");
  });

  $("#answers").append(`<div class="bot-answ">${hello}</div>`);

  $("#answers").click(function () {
    return false; // preventDefault() and stopPropagation()
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
