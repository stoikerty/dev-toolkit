How to stop using jQuery for simple DOM Tasks
=============================================
Bruce    : [Hello. My name is Bruce.](http://www.youtube.com/watch?v=1x9W70LJKVw)  
Everyone : Hello, Bruce.  
Bruce    : It has been three weeks since my last jquery.  
Everyone : You're an inspiration to us all!  
Bruce    : Whew. Glad I got that off my chest.  

> These examples are loosely taken from [a javascript fanboy](http://lab.victorcoulon.fr/javascript/vanilla-javascript-FTW.html)

---

< Document Ready >
------------------
jquery:

	$(document).ready(function() {
		// code
	});

vanilla JS:

	document.addEventListener("DOMContentLoaded", function() {
		// code
	});


< Searching elements >
----------------------
jquery:

	var oneImage = $("img").filter(":first");
	var divs     = $("div");

vanilla javascript:

	var oneImage = document.querySelector("img");
	var divs     = document.querySelectorAll("div");


< Creating elements >
---------------------
jquery:

	var newDiv = $("<div/>");

vanilla javascript:

	var newDiv = document.createElement("div");

---

Using ClassList
===============
Use it with [the classList Polyfill for IE8 & IE9 Support](https://github.com/eligrey/classList.js)  
Or even better, use [the "aight" minimal-polyfill-collection](https://github.com/shawnbot/aight)

< Adding a class >
------------------
jquery:

	newDiv.addClass("foo");

vanilla javascript:

	newDiv.classList.add("foo");


< Removing a class >
--------------------
jquery:

	newDiv.removeClass("foo");

vanilla javascript:

	newDiv.classList.remove("foo");


< Toggling a class >
--------------------
jquery:

	newDiv.toggleClass("foo");

vanilla javascript:

	newDiv.classList.toggle("foo");

---

< Adding a click event >
------------------------
Use the [aight polyfill for IE8 Support](https://github.com/shawnbot/aight)  
Detailed explanation of [how .forEach.call works](http://www.rqgg.net/topic/mzikq-what-does-foreach-call-does-in-javascript.html)

jquery

	$("a").click(function(e) {
		e.stopPropagation();
	  // code…
	})

vanilla javascript:

	[].forEach.call(document.querySelectorAll("a"), function(el) {
	  el.addEventListener("click", function(e) {
	  	// stop Propagation work too!
	  	e.stopPropagation();
	    // code…
	  });
	});


< adding an element into another >
----------------------------------
jquery:

	$("body").append($("<p/>"));

vanilla javascript:

	document.body.appendChild(document.createElement("p"));


< Changing an attribute >
-------------------------
jquery:

	$("img").filter(":first").attr("alt", "My image");

vanilla javascript:

	document.querySelector("img").setAttribute("alt", "My image");


< Retrieve parent element >
---------------------------
jquery:

	var parent = $("#about").parent();

vanilla javascript:

	var parent = document.getElementById("about").parentNode;


< Clone an element >
--------------------
jquery:

	var clonedElement = $("#about").clone();

vanilla javascript:

	var clonedElement = document.getElementById("about").cloneNode(true);


< Empty an element >
--------------------
jquery:

	$("#wrap").empty();

vanilla javascript:

	var wrap = document.getElementById("wrap");
	while(wrap.firstChild) wrap.removeChild(wrap.firstChild);


< Get element next to current one >
-----------------------------------
jquery:

	var nextElement = $("#wrap").next();`

vanilla javascript:

	var nextElement = document.getElementById("wrap").nextSibling;



---
[for nicer viewing, copy and paste everything into](http://markdownviewer.com)