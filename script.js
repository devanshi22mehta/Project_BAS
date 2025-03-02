function playAudio(id) {
    let audio = document.getElementById(id);
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}



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

// take 1
// const fileInput = document.getElementById('fileInput');
// const fileList = document.getElementById('fileList');

// fileInput.addEventListener('change', function () {
//     fileList.innerHTML = ''; // Clear previous list
//     Array.from(fileInput.files).forEach(file => {
//         const listItem = document.createElement('li');
//         listItem.classList.add('file-item');

//         const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert size to MB

//         listItem.innerHTML = `
//             <div>
//                 <strong>${file.name}</strong>
//                 <div class="file-size">${fileSize} MB</div>
//                 ${fileSize > 10 ? '<div class="file-error">File size exceeds 10 MB limit</div>' : ''}
//             </div>
//             <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove();">✖</button>
//         `;
//         fileList.appendChild(listItem);
//     });
// });

// take 2

// function uploadFiles() {
//     alert('Files uploaded successfully! (Mock function)');
// }

// async function uploadFile() {
//     let formData = new FormData();           
//     formData.append("file", fileupload.files[0]);
//     await fetch('/upload.php', {
//       method: "POST", 
//       body: formData
//     });    
//     alert('The file has been uploaded successfully.');
// }
// take 3
document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const uploadBtn = document.getElementById("upload-btn");
    const uploadedFilesContainer = document.getElementById("uploaded-files");
    const showMoreBtn = document.getElementById("show-more-btn");

    let files = [];
    
    // Drag & Drop Events
    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("active");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("active");
        files.push(...e.dataTransfer.files);
        updateFileList();
    });

    // Click to Upload
    dropArea.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
        files.push(...e.target.files);
        updateFileList();
    });

    // Upload Confirmation
    uploadBtn.addEventListener("click", () => {
        if (files.length === 0) {
            alert("No files selected.");
            return;
        }

        if (confirm("Are you sure you want to upload these files?")) {
            uploadFiles();
        }
    });

    // Upload Files
    function uploadFiles() {
        const formData = new FormData();
        files.forEach((file) => formData.append("files[]", file));

        fetch("upload.php", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.text())
        .then((data) => {
            alert("Files uploaded successfully!");
            files = [];
            fetchFiles();
        })
        .catch((error) => console.error("Error:", error));
    }

    // Fetch & Display Uploaded Files
    function fetchFiles() {
        fetch("fetch_files.php")
            .then(response => response.json())
            .then(data => {
                uploadedFilesContainer.innerHTML = "";
                data.forEach((file, index) => {
                    const fileDiv = document.createElement("div");
                    fileDiv.className = "uploaded-file";
                    fileDiv.innerHTML = `
                        <a href="uploads/${file}" target="_blank">${file}</a>
                        <button class="delete-btn" onclick="deleteFile('${file}')">×</button>
                    `;
                    uploadedFilesContainer.appendChild(fileDiv);
                });

                if (data.length > 5) {
                    uploadedFilesContainer.style.maxHeight = "150px";
                    showMoreBtn.classList.remove("hidden");
                } else {
                    uploadedFilesContainer.style.maxHeight = "none";
                    showMoreBtn.classList.add("hidden");
                }
            });
    }

    window.deleteFile = function(fileName) {
        if (confirm("Are you sure you want to delete this file?")) {
            fetch("delete_file.php?file=" + fileName)
                .then(() => fetchFiles());
        }
    };

    showMoreBtn.addEventListener("click", () => {
        uploadedFilesContainer.style.maxHeight = "none";
        showMoreBtn.classList.add("hidden");
    });

    fetchFiles();
});



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
