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

var d = new Date();
var n = d.getDay();

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
                        "<tr><td align='center' colspan='2'><button class='videoButton' id='" + id + "'>Show Video</button></td></tr>" +
                        "<tr><td align='center' colspan='2'><iframe class='video' id='" + id + "Video' style='height:0px' src='" + video + "' frameborder='0' allowfullscreen></iframe></td></tr>"
                        ;

            }
            document.getElementById('output').innerHTML = output;
			document.getElementById('output').className = "unit whole workout";

            var buttons = document.getElementsByTagName("button");
            var i;
            for (i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    var videoId = this.id + "Video";
                    var buttonId = this.id;

                    var v = document.getElementById(videoId);
                    var b = document.getElementById(buttonId);

                    if (v.style.height == "0px") {
                        v.style.height = "250px";
                        b.className = "videoButtonHide";
                        b.innerHTML = "Hide Video";
                    } else {
                        v.style.height = "0px";
                        b.innerHTML = "Show Video";
                        b.className = "videoButton";
                    }
                };
            }
        }
    }
}

function loadContent(page) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("article").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", page, false);
    xmlhttp.send();
		
	if (page=="workout.txt"){
		if (n==0 || n==3 || n==6){
			document.getElementById('output').innerHTML = "<h1 class='align-center'>No workouts for today "+localStorage.getItem("name")+".</h1>"
		} else {
			getWorkout(n);	
		}
	}
}

function saveLocal() {
    var message = document.getElementById('message').innerHTML;

	var name = document.getElementById('name').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var bmi = document.getElementById('bmi').value;
	
	//Calculate BMI
    var index = weight / Math.pow(height, 2);
    var BMI = document.getElementById('bmi').value = (Math.round(index * 10) / 10);

    if (BMI >= 18.5 && BMI <= 24.99) {
        document.getElementById('bmi').style.color = "Black";
    } else if (BMI >= 25 && BMI <= 29.99 || BMI >= 30 || BMI < 18.5) {
        document.getElementById('bmi').style.color = "Red";
    }
	
	//Recommended Weight
	var minIndex = 18.5 * Math.pow(height, 2);
	var minWeight = document.getElementById('minWeight').value = (Math.round(minIndex * 100) / 100);
	
	var maxIndex = 24.99 * Math.pow(height, 2);
	var maxWeight = document.getElementById('maxWeight').value = (Math.round(maxIndex * 100) / 100);
		
	var recIndex = (((24.99-18.5)/2)+18.5) * Math.pow(height, 2);
	var recWeight = document.getElementById('recommendedWeight').value = (Math.round(recIndex * 100) / 100);
	
	var Goal;
	if (weight > recWeight){
		var goal = weight-parseFloat(recWeight);
		Goal = Math.round(goal*100)/100;
		message = "You need to lose:";
		document.getElementById('goal').value = Goal;
	} else if (weight < recWeight) {
		var goal = parseFloat(recWeight)-weight;
		Goal = Math.round(goal*100)/100;
		message = "You need to gain:";
		document.getElementById('goal').value = Goal;
	}
	
	//Save New Storage
	localStorage.setItem("name",name);
	localStorage.setItem("height",height);
	localStorage.setItem("weight",weight);
	localStorage.setItem("bmi",BMI);
	localStorage.setItem("minWeight",minWeight);
	localStorage.setItem("maxWeight",maxWeight);
	localStorage.setItem("recommendedWeight",recWeight);
	localStorage.setItem("msj",message);
	localStorage.setItem("goal",Goal);
}

function loadStorage() {
	var name = document.getElementById('name').value = localStorage.getItem("name");
    var height = document.getElementById('height').value = localStorage.getItem("height");
    var weight = document.getElementById('weight').value = localStorage.getItem("weight");
    var bmi = document.getElementById('bmi').value = localStorage.getItem("bmi");
    var minWeight = document.getElementById('minWeight').value = localStorage.getItem("minWeight");
    var maxWeight = document.getElementById('maxWeight').value = localStorage.getItem("maxWeight");
    var recWeight = document.getElementById('recommendedWeight').value = localStorage.getItem("recommendedWeight");
    var msj = document.getElementById('message').innerHTML = localStorage.getItem("msj");
    var goal = document.getElementById('goal').value = localStorage.getItem("goal");
}
