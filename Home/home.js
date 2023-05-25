///////////////////detect if user upload pdf/////////////////////

const form = document.getElementById('myForm');
const fileUpload = document.getElementById('fileUpload');
const error = document.getElementById('error');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (!validFileType(fileUpload.files)) {
    alert("Error: Only PDF files are allowed.");
  } else {
    form.submit();
  }
});

function validFileType(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileType = file.type;
    if (fileType !== "application/pdf") {
      return false;
    }
  }
  return true;
}

///////////////////display user's file name/////////////////////

// Get the file input element
var fileInput = document.getElementById('fileUpload');

// Get the message element
var messageElement = document.querySelector('p');

// Add a listener for when a file is selected
fileInput.addEventListener('change', function(event) {
  // Get the file(s) that were selected
  var files = event.target.files;

  // If no files were selected, display the default message
  if (files.length === 0) {
    messageElement.innerHTML = 'Drag your files here or click in this area.';
    return;
  }

  // Display the name of the first selected file
  messageElement.innerHTML = files[0].name;
});

