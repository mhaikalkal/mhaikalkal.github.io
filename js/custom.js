window.onload = function () {
    navbarToggle();
    window.onresize = function () {
        navbarToggle();
    };

    window.onscroll = function () {
        scrollInd();
        navbarToggle();
    };
};

// Scroll Indicator
function scrollInd() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-bar").style.width = scrolled + "%";
}
// End Scroll Indicator

// Navbar Toggle
function navbarToggle() {
    const nav = document.getElementsByTagName("nav")[0];
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const arrow = document.querySelector(".arrow");
    const aboutRand = document.querySelector("#aboutRand");

    if (width < 768) {
        nav.classList.add("bg-dark");
        arrow.style.visibility = "hidden";
        aboutRand.classList.add("p-4");
    } else {
        arrow.style.visibility = "visible";
        aboutRand.classList.remove("p-4");
    }
    if (width > 767) return document.documentElement.scrollTop > 60 ? nav.classList.add("bg-dark") : nav.classList.remove("bg-dark");
}
// End Navbar Toggle

// Click Link di Navbar
// document.getElementById("linkabout", "linkprojects", "linkcontact").addEventListener("click", slide);
// function slide() {
//     const sec = document.getElementsByTagName("section");

//     for (let i = 0; i < sec.length; i++) {
//         sec[i].style.paddingTop = "3.8rem";
//     }
// }
// End Slide when Click

// Rotate Text
var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".
var textArray = ["A Story about me.", "About Me!", "Interesting facts about myself.", "Get to know me."];

// Speed (in milliseconds) of typing.
var speedForward = 100, // Typing Speed
    speedWait = 1500, // Wait between typing and backspacing
    speedBetweenLines = 1000, // Wait between first and second lines
    speedBackspace = 40; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
    var element = $("#" + id),
        aString = ar[a],
        eHeader = element.children("h1"), //Header element
        eParagraph = element.children("p"); //Subheader element

    // Determine if animation should be typing or backspacing
    if (!isBackspacing) {
        // If full string hasn't yet been typed out, continue typing
        if (i < aString.length) {
            // If character about to be typed is a pipe, switch to second line and continue.
            if (aString.charAt(i) == "|") {
                isParagraph = true;
                eHeader.removeClass("cursor");
                eParagraph.addClass("cursor");
                i++;
                setTimeout(function () {
                    typeWriter(id, ar);
                }, speedBetweenLines);

                // If character isn't a pipe, continue typing.
            } else {
                // Type header or subheader depending on whether pipe has been detected
                if (!isParagraph) {
                    eHeader.text(eHeader.text() + aString.charAt(i));
                } else {
                    eParagraph.text(eParagraph.text() + aString.charAt(i));
                }
                i++;
                setTimeout(function () {
                    typeWriter(id, ar);
                }, speedForward);
            }

            // If full string has been typed, switch to backspace mode.
        } else if (i == aString.length) {
            isBackspacing = true;
            setTimeout(function () {
                typeWriter(id, ar);
            }, speedWait);
        }

        // If backspacing is enabled
    } else {
        // If either the header or the paragraph still has text, continue backspacing
        if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
            // If paragraph still has text, continue erasing, otherwise switch to the header.
            if (eParagraph.text().length > 0) {
                eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
            } else if (eHeader.text().length > 0) {
                eParagraph.removeClass("cursor");
                eHeader.addClass("cursor");
                eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
            }
            setTimeout(function () {
                typeWriter(id, ar);
            }, speedBackspace);

            // If neither head or paragraph still has text, switch to next quote in array and start typing.
        } else {
            isBackspacing = false;
            i = 0;
            isParagraph = false;
            a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
            setTimeout(function () {
                typeWriter(id, ar);
            }, 50);
        }
    }
}

// Scroll 400px kebawah pas click 3
// const arrow = document.querySelector("section#scrollbot");

// arrow.addEventListener("click", function () {
//     window.scrollBy(0, 400);
// });
