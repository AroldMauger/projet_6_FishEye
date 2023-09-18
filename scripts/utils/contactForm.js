const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const form = document.querySelector("form")


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


form.addEventListener("submit", validate);

function validate(event) {
    event.preventDefault();
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    const messageValue = message.value;

    console.log("Prénom:", firstNameValue);
    console.log("Nom de famille:", lastNameValue);
    console.log("Email:", emailValue);
    console.log("Message:", messageValue);

    const firstNameIsValid = firstName.value.trim().length >= 2;
    const lastNameIsValid = lastName.value.trim().length >= 2;
    const emailIsValid = email.checkValidity();
  
    if (firstNameIsValid && lastNameIsValid && emailIsValid ) {
  
    closeModal()  
    } else {
      throw new Error("Formulaire non valide");
    }
  }
  
