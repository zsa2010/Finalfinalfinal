//Replace everything that says BLANK with the correct syntax.
//In line 3 we want to get a reference of the button element from our HTML so we can add an eventlistener
const btn = document.getElementById("button");
  //In line 9 we want to store the inputData in a key value pair, aka in an object so we can turn it into a json string.
	// const submission = {"response" : input.value}

// 	fetch('/submission', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json;charset=utf-8',
// 		},
// 		body: JSON.stringify(submission),
// 	})
//   //lines 18 and 19 are the typical de-jsonifying the response from the servers
// 		.then(function(response){
// 			return response.json()
// 		})
// 		.then(function(data) {
			
// 			console.log(data)
// 		})

//

//Game Code
let counter = 3
let Attempts = document.getElementById('Attempts')
let checker = document.getElementById('checker')
Attempts.innerHTML= counter



fetch('image.json')
.then (function(response){
    return response.json()
})
.then(function (data){
    let answer1 = document.getElementById('Image_1');
	answer1.src = data.IMG_URL;
	btn.addEventListener('click', function () {
		
if(counter > 0){
		//In line 6 we want to get a reference to our input so we can get the users input.
		  const input = document.getElementById("fname"); //assuming Iam referring something here to relate to the JSON data of the user's response 
		  const inputData = input.value
		  console.log(input)

	if(data.Answer == input.value.toLowerCase()) { 
		//how to add here that two users need to have the same answer? I believe it should go here
		console.log("Correct!")
		 checker.innerHTML = "Correct!"
	
	}else{
		//how to add here that if else if the users have different answers, then it needs to be try again?
		console.log("Try Again")
		checker.innerHTML = "Try Again"
	} 
 
		counter--
		Attempts.innerHTML= counter
} 
})
})

//Socket Code

let socket = io();
//Listen for confirmation of connection
socket.on('connect', function () {
	console.log("Connected");
});

/* --- Code to RECEIVE a socket message from the server --- */
let chatBox = document.getElementById('chat-box-msgs');

//Listen for messages named 'msg' from the server
socket.on('msg', function (data) {
	console.log("Message arrived!");
	console.log(data);

	//Create a message string and page element
	let receivedMsg = data.name + ": " + data.msg;
	let msgEl = document.createElement('p');
	msgEl.innerHTML = receivedMsg;

	//Add the element with the message to the page
	chatBox.appendChild(msgEl);
	//Add a bit of auto scroll for the chat box
	chatBox.scrollTop = chatBox.scrollHeight;
});

/* --- Code to SEND a socket message to the Server --- */
let nameInput = document.getElementById('name-input')
let msgInput = document.getElementById('msg-input');
let sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', function () {
	let curName = nameInput.value;
	let curMsg = msgInput.value;
	let msgObj = { "name": curName, "msg": curMsg };

	//Send the message object to the server
	socket.emit('msg', msgObj);
});
