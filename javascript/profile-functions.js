//Current Weight
var btnSave = document.getElementById("save");
var inputWeight = document.getElementById("weight");
var divDisplay = document.getElementById("display");

            showWeight();
            

            btnSave.addEventListener("click", function() {
                localStorage.weight = inputWeight.value;
                showWeight();
                showLost();
            });

            function showWeight() {
                var displayWeight = localStorage.weight || 0;
                divDisplay.textContent = displayWeight;

            }

//Target Weight
var btnSave2 = document.getElementById("save2");
            var inputWeight2 = document.getElementById("weight2");
            var divDisplay2 = document.getElementById("display2");
var divDisplayLost = document.getElementById("lost");

            showWeight2();
            showLost();

            btnSave2.addEventListener("click", function() {
                localStorage.weight2 = inputWeight2.value;
                showWeight2();
                showLost();
            });
            
            function showWeight2() {
                var displayWeight2 = localStorage.weight2 || 0;
                divDisplay2.textContent = displayWeight2;

            }

function showLost() {
  
	var displayLostWeight = localStorage.weight - localStorage.weight2 || 0;
  
if (displayLostWeight > 0){ 
  divDisplayLost.textContent = "Only " + displayLostWeight + " lbs" + " to Go!";
}  else if (displayLostWeight < 0){
	
  divDisplayLost.textContent = "Congrats You Reached Your Goal"
  divDisplayLost.textContent = "your are " + displayLostWeight + " lbs" + " under your goal! Great Job try changing your target weight and set a new Goal!";
} else {
  divDisplayLost.textContent = "Congrats You Reached Your Goal"
}          

            };
 
