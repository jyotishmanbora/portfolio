// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBaQSTxTQVvgf8jUPsYNV2kFXHXSOEXgp8",
    authDomain: "portfolio-contact-c6769.firebaseapp.com",
    projectId: "portfolio-contact-c6769",
    databaseURL: "https://portfolio-contact-c6769-default-rtdb.firebaseio.com/",
    storageBucket: "portfolio-contact-c6769.appspot.com",
    messagingSenderId: "969609674872",
    appId: "1:969609674872:web:bbe73e440d03ba720e2d8d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  //get input elements
  let nameInput = document.querySelector("#name-input");
  let mailInput = document.querySelector("#mail-input");
  let messageInput = document.querySelector("#message-input");
  let submit = document.querySelector(".submit");

  submit.addEventListener("click", ()=>{
      if(nameInput.value == ''){
          alert("Please fill up your name");
      }else if(mailInput.value == ''){
          alert("Please fill up your email-id");
      }else if(messageInput.value == ''){
          alert("Please write a message");
      }else{
          database.ref('messages').push().set({
              name : nameInput.value,
              email : mailInput.value,
              message: messageInput.value,
              time : Date()
          }).catch((e)=>{
              alert(e);
              submit.style.backgroundColor = "#ff6131";
              submit.innerText = 'Failed';
              submit.style.color = 'white';
          });
          submit.style.backgroundColor = "#4df762";
          submit.innerText = 'Submitted';
          nameInput.value = '';
          mailInput.value = '';
          messageInput.value = '';
      }
  })
