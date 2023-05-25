let socket1 = new WebSocket('ws://54.146.233.26:3005');


let data = localStorage.getItem("data");
data = JSON.parse(data);
const form = document.getElementById('msgForm');
form.addEventListener('submit', sendMsg);
let listElement = document.getElementById('msgs');

function addLeadingZero(number) {
  return number < 10 ? "0" + number : number;
}

function scrollToBottom() {
  listElement.scrollTop = listElement.scrollHeight;
}

function sendMsg(event) {
  if (data.name != undefined) {
    event.preventDefault();
    let message = document.getElementById('messageInput1').value.trim();
    document.getElementById('messageInput1').value = "";
    var currentTime = new Date();
    // listElement.style.textAlign = "right";

    let from = document.createElement('li');
    let msg = document.createElement('li');
    let timestamp = document.createElement('li');
    let emptySpace = document.createElement('li');

    from.style.background = NaN;
    from.style.fontWeight = "bold";
    from.textContent = data.name;
    msg.textContent = message;
    timestamp.textContent = currentTime.getDate() + ", " + currentTime.toLocaleString('default', { month: 'long' }) + " " + currentTime.getFullYear() + ", " + addLeadingZero(currentTime.getHours()) + ":" + addLeadingZero(currentTime.getMinutes()) + ":" + addLeadingZero(currentTime.getSeconds());
    emptySpace.textContent = "";

    listElement.appendChild(from);
    listElement.appendChild(msg);
    listElement.appendChild(timestamp);
    listElement.appendChild(emptySpace);

    scrollToBottom();

    let di = {
      client: data.name,
      message: message,
    };
    socket1.send(JSON.stringify(di));
  }else{
    alert("login again");
  }
}


socket1.onmessage = (event) => {
  console.log(JSON.parse(event.data));
  let d = JSON.parse(event.data);
  c1receivedMsg(d['message'], d['client']);
};


function c1receivedMsg(message, client) {
  var currentTime = new Date();
  let from = document.createElement('li');
  let msg = document.createElement('li');
  let timestamp = document.createElement('li');
  let emptySpace = document.createElement('li');

  from.style.background = NaN;
  from.style.fontWeight = "bold";
  from.textContent = client;
  msg.textContent = message;
  timestamp.textContent = currentTime.getDate() + ", " + currentTime.toLocaleString('default', { month: 'long' }) + " " + currentTime.getFullYear() + ", " + addLeadingZero(currentTime.getHours()) + ":" + addLeadingZero(currentTime.getMinutes()) + ":" + addLeadingZero(currentTime.getSeconds());
  emptySpace.textContent = "";

  listElement.appendChild(from);
  listElement.appendChild(msg);
  listElement.appendChild(timestamp);
  listElement.appendChild(emptySpace);

  scrollToBottom();
}



