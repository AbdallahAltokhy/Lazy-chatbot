//show the buttons after the title finish typing
setTimeout(function () {
   $(".box").css("visibility", "visible").fadeOut(0.5).fadeIn(4000);
}, 4000);


$("#yes-btn").click(
   function () {
      $(".landing-content").css("display", "none");
      $("#container").css("display", "inline-block");
   }
);


//Chat button on-click
$("#submit-btn").click(chat);

//post the txt after pressing enter
$("#user-txt ").on('keypress', function (key) {
   if (key.which == 13) {
      chat();
   }
});


function chat () {

   //get user reply 
   let userInput = document.getElementById("user-txt").value;

   if (userInput != "" && userInput != " ") {

      //get time 
      let timeElement = '<p class="timePosted"><br>' + moment(new Date()).format('LT') + '</p>';

      //Push user replies
      const $HtmlMsg = $(`
         <div class="chat-text-container  user-text-container">
         <img class="chat-img user-img" src="images/user.png" alt="">
         <p class="chat-msg user-msg">${userInput}</p>
         ${timeElement}
         </div>
      `);
      $('.respond-yes-content').append($HtmlMsg);


      //bot reply
      setTimeout(function () {

         //Check user's answers and reply accordingly 
         let botMsg = "";
         let GreetingRegex = /^hello|hi|Good morning|Good afternoon|Good evening|It’s nice to meet you|hey|It’s good to see you|What’s up|How’s your day|Pleased to meet you|How do you do|nice too meet you/i;
         let myName = /\bwho are you|\bwhat is your name |\byour name|\bur name/gi;
         let myAge = /\how old are you |\bwhat is your age/gi;

         //handle different scenarios
         if (GreetingRegex.test(userInput)) {
            botMsg = 'No time for greetings , just ask your question directly , I wanna go sleep ';
         } else if (myName.test(userInput)) {
            botMsg = ' I am Mr Lazy, and I am running out of time';
         } else if (myAge.test(userInput)) {
            botMsg = ' I am too old for this ****, ask me or leave me alone';
         } else {
            let searchKey = userInput.split(" ").join("+");
            let searchLink = 'href=' + '"http://www.google.com/search?q=' + searchKey;
            botMsg = 'I think this could help  <a  target="_blank" ' + searchLink + '" class="search-direct"> click here  </a> If you have any other questions ask there also';
         }

         //push the bot reply  
         const $botMsg = $(`
         <div class="chat-text-container bot-text-container ">
         <img class="chat-img bot-img " src="images/favicon-96x96.png" alt="">
         <p class="chat-msg bot-msg ">${botMsg}</p>
         ${timeElement}
         </div>
       `);

         $('.respond-yes-content').append($botMsg);
      }, 1500);

   } else {
      alert("you can't send an empty message , please don't waste my time ");
   }

   //clear user input field after submitting the reply
   document.getElementById("user-txt").value = "";

   //auto scroll after submit 
   $(document).scrollTop($(document).height());

}