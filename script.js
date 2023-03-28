window.onload = function () {
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
    "Наш менеджер перезвонит Вам в ближайшее время!",
    "Уточнить детали можно по телефону 123456789",
    "Оставайтесь на связи!",
    "Сегодня прекрасная погода!",
    "С Вами очень приятно общаться!",
  ];
  const hello = "Привет!";
  const bye = "Пока, было приятно пообщаться!";

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
        if (q.toLowerCase().includes("привет")) {
          $("#answers").append(`<div class="bot-answ">${hello}</div>`);
        } else if (
          q.toLowerCase().includes("пока") ||
          q.toLowerCase().includes("до свидания")
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


