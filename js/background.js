
// Global Variables
var time = 1000; // millisecond
var i = 0;
var p = 0;
var listedWords;

  // When tldr is clicked, call up a window and call to displayWords
function onClickHandler(info, tab) {
  chrome.extension.getBackgroundPage().console.log(info.selectionText);

  var str = info.selectionText;
  listedWords = str.split(" ");

  var win = window.open("popup.html#", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=500, top="+(screen.height-800)+", left="+(screen.width-840));
    
  $(document).ready(function() {
		displayWords(listedWords, win);
  });
};

// Display words based on the word per minute of i
function displayWords(listedWords, win) {

	var myval = setInterval(function() 
		{
	   if (i == listedWords.length) {
	       console.log('done');
	       win.document.getElementById('div1').innerHTML = 'DONE!!!';
	       i = 0;
	       clearInterval(myval); 
	       return;
	   	} else {
		   	var word = String(listedWords[i]);
		   	console.log(listedWords[i]);
		   	console.log(time);
  			win.document.getElementById('div1').innerHTML = word;

	       i++;
	     }
	   }, time)
}

// Set up contextMenu tldr option when right click on text
chrome.contextMenus.onClicked.addListener(onClickHandler);


// Set up button listeners
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "button0pressed":
            time = 1000;
            console.log('60');
            break;
        case "button6pressed":
            time = 100;
            console.log('600');
            break;
        case "button8pressed":
            time = 75;
            console.log('800');
            break;
        case "button10pressed":
            time = 60;
            console.log('1000');
            break;
        case "button12pressed":
            time = 50;
            console.log('1200');
        	break;
        case "buttonreplaypressed":
        	console.log('replay');
        	var win2 = window.open("popup.html#", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=500, top="+(screen.height-800)+", left="+(screen.width-840));
            $(document).ready(function() {
				displayWords(listedWords, win2);
  			});
        	break;
    }
    //break;
});

// After the window has loaded; set up the onclick of the buttons
window.onload = function() {
	document.getElementById("replay").onclick = function() {
        chrome.extension.sendMessage({
            type: "buttonreplaypressed"
        });
    }
    document.getElementById("button0").onclick = function() {
        chrome.extension.sendMessage({
            type: "button0pressed"
        });
    }
    document.getElementById("button6").onclick = function() {
        chrome.extension.sendMessage({
            type: "button6pressed"
        });
    }
    document.getElementById("button8").onclick = function() {
        chrome.extension.sendMessage({
            type: "button8pressed"
        });
    }
    document.getElementById("button10").onclick = function() {
        chrome.extension.sendMessage({
            type: "button10pressed"
        });
    }
    document.getElementById("button12").onclick = function() {
        chrome.extension.sendMessage({
            type: "button12pressed"
        });
    }
}

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "tldr";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});


