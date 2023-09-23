const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const form = document.querySelector("form");
const buttonHeader = document.querySelector(".button-header");
const closeButton = document.querySelector(".close-form-modal");
const submitButton = document.querySelector(".contact_button");
const modal = document.getElementById("contact_modal");

function displayModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  closeButton.focus();

}

buttonHeader.addEventListener("click", displayModal);

buttonHeader.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    displayModal();
  }
});

submitButton.addEventListener("keydown", function (e) {
  if (e.key === "Tab" && !e.shiftKey) {
    e.preventDefault(); 
    closeButton.focus();
  } if (e.key === "Tab" && e.shiftKey) {
    e.preventDefault(); 
    message.focus();
  }
});



closeButton.addEventListener("keydown", function (event) {
  if (event.key === "Tab" && event.shiftKey) {
    event.preventDefault(); 
    submitButton.focus();
  } else if (event.key === "Enter") {
    closeModal()
  }
});

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute('aria-modal');

}

// On ferme la lightbox quand on appuie sur la touche Escape
window.addEventListener('keydown', function(e){ 
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e)
  }
}) 


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
  
