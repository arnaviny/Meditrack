const addCasualty = document.getElementById("addCasualty");
addCasualty.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Create an object to hold all form data
  const formData = [];

  console.log("Form Data:", formData);
  if (!localStorage.getItem("form-data")) {
    localStorage.setItem("form-data", JSON.stringify(formData)); //push
  }
  const data = JSON.parse(localStorage.getItem("form-data"));
  //selc on shock sign
});