function playAudio(id,button) {
  let audio = document.getElementById(id);
if (audio.paused) {
  audio.play();
  button.textContent = "⏸";
} else {
  audio.pause();
  button.textContent = "▶";
}
}

// function playAudio(id) {
//   let audio = document.getElementById(id);
//   if (audio.paused) {
//       audio.play();
//   } else {
//       audio.pause();
//   }
// }    

const breathText = document.getElementById("breathText");

function startBreathing() {
    setInterval(() => {
        if (breathText.innerText === "Breathe In") {
            breathText.innerText = "Breathe Out";
            breathText.classList.remove("breathing"); // Contract
        } else {
            breathText.innerText = "Breathe In";
            breathText.classList.add("breathing"); // Expand
        }
    }, 4000); // Change every 4 seconds
}

startBreathing();


//profile
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("section__pic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}


// upload document ki style is in the html file itself



// bmi meter

const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
}

function handleSubmit(e) {
  e.preventDefault();

  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const heightInMeters = height / 100; // cm -> m
  const bmi = weight / Math.pow(heightInMeters, 2);
  const desc = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}
