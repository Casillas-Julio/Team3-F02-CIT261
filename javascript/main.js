//display acording to action
//toggle change weight menu
function toggle_visibility(id) {
    var e = document.getElementById(id);
    e.style.display = ((e.style.display != 'none') ? 'none' : 'block');

}

//toggle menu
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls))
        ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

//Add event from js the keep the markup clean
function init() {
    document.getElementById("menu-toggle").addEventListener("click", toggleMenu);
}

//The actual fuction
function toggleMenu() {
    var ele = document.getElementsByTagName('body')[0];
    if (!hasClass(ele, "open")) {
        addClass(ele, "open");
    } else {
        removeClass(ele, "open");
    }
}

//Prevent the function to run before the document is loaded
document.addEventListener('readystatechange', function () {
    if (document.readyState === "complete") {
        init();
    }
});


function getWorkout(codeDay) {
    xmlhttp = new XMLHttpRequest();
    var myArr = "";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myArr = JSON.parse(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", "json/workout.json", false);
    xmlhttp.send();
    loadData(codeDay, myArr);
}
var vid;
function loadData(codeDay, obj) {
    //if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
    //	var theTXT = xmlhttp.responseText;
    //	var obj = JSON.parse(theTXT);
    var output = "";

    for (var x = 0; x < obj.workout.length; x++) {
        if (codeDay == x) {
            var day = obj.workout[x].day;
            output += "<tr><td align='center' colspan='2'><h1>" + day + "</h1></td></tr>";

            for (var i = 0; i < obj.workout[x].exercise.length; i++) {
                var exercise = obj.workout[x].exercise[i];
                var reps = obj.workout[x].reps[i];
                var url = obj.workout[x].url[i];
                var video = obj.workout[x].video[i];

                var id = obj.workout[x].id[i];

                output += "<tr><td><hr></td></tr>" +
                        "<tr><td align='center'><h2>" + exercise + "</h2></td></tr>" +
                        "<tr><td align='center'>" + reps + "</td></tr>" +
                        "<tr><td colspan='2' align='center'><img class='workoutImg' src='" + url + "'></td></tr>" +
                        "<tr><td align='center' colspan='2'><button id='" + id + "'>Show/Hide Video</button></td></tr>" +
                        "<tr><td align='center' colspan='2'><iframe id='" + id + "Video' style='display:none' src='" + video + "' frameborder='0' allowfullscreen></iframe></td></tr>"
                        ;

            }
            document.getElementById('output').innerHTML = output;

            var buttons = document.getElementsByTagName("button");
            var i;
            for (i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    var nid = this.id + "Video";
                    var x = document.getElementById(nid);
                    if (x.style.display == "none") {
                        x.style.display = "block";
                    } else {
                        x.style.display = "none";
                    }
                };
            }
        }
    }
    //}
}
