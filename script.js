// Dom Declaration
const userData = {
  userFirstName: document.getElementById("first_name"),
  userLastName: document.getElementById("last_name"),
  userEmail: document.getElementById("email"),
  userPhone: document.getElementById("phone"),
  userPassword: document.getElementById("password"),
  userConfirmPassword: document.getElementById("confirm_password"),
  userAddress: document.getElementById("address"),
  userCountry: document.getElementById("country"),
  userState: document.getElementById("state"),
  userCity: document.getElementById("city"),
  userZip: document.getElementById("zip"),
};

// Restrict for Phone Number & Pin Code
const avoidKey = (event, maxLength, digitsOnly = false) => {
  const value = event.target.value;
  const key = event.key;

  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  // Allow control keys
  if (allowedKeys.includes(key)) {
    return;
  }

  // Block non-digit characters
  if (digitsOnly && !/^\d$/.test(key)) {
    event.preventDefault();
    return;
  }

  // Block if value reaches maxLength
  if (value.length >= maxLength) {
    event.preventDefault();
  }
};

//const Declaration
const errorSpans = document.querySelectorAll(".error");
const signUpButton = document.getElementById("sign_up_button");
const togglePasswordBtn = document.getElementById("togglePassword");
const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

//visible to see password
togglePasswordBtn.addEventListener("click", () => {
  const isHidden = userData?.userPassword?.type === "password";
  userData.userPassword.type = isHidden ? "text" : "password";
  togglePasswordBtn.classList.toggle("fa-eye-slash");
  togglePasswordBtn.classList.toggle("fa-eye");
});
//visible to see confirm password
toggleConfirmPasswordBtn.addEventListener("click", () => {
  const isHidden = userData?.userConfirmPassword?.type === "password";
  userData.userConfirmPassword.type = isHidden ? "text" : "password";
  toggleConfirmPasswordBtn.classList.toggle("fa-eye-slash");
  toggleConfirmPasswordBtn.classList.toggle("fa-eye");
});

//Error Messages
const errorMessages = {
  userFirstName: "Enter a valid FirstName (2-4 characters).",
  userLastName: "Enter a valid LastName ( 2-4 characters).",
  userEmail: "Enter a valid email address.",
  userPhone: "Enter a valid 10 digit number starting with 6, 7, 8, or 9.",
  userPassword: "Enter a strong password.",
  userConfirmPassword: "Passwords do not match.",
  userAddress: "Enter the Address(10 - 12characters). ",
  userCountry: "Enter the Country.",
  userState: "Enter the State.",
  userCity: "Enter the City.",
  userZip: "Enter a valid 6-digit Zip code.",
};
//Form Validation
const validationRules = {
  userFirstName: /^[A-Za-z]{3,20}(\s[A-Za-z]{1,20})?$/, //only space and alphabet
  userLastName: /^[A-Za-z]{3,20}$/,
  userPhone: /^[6-9]\d{9}$/, // phone Number exactly 10 digits
  userEmail: /^\w+@\w+\.\w{2,}$/, //[A-Za-z0-9_] w means metaCharacter
  userZip: /^\d{6}$/,
  userPassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/, // one Capital letter or small letter and one number  6 to 8 range
};

//Alert Messages
const validateForm = () => {
  let isValid = true;

  // errorMessages or userData if the UserData is using that warning is needed
  Object.keys(errorMessages).forEach((key) => {
    const errorField = document.getElementById(`${key}Error`);
    let error = false;
    const value = userData[key]?.value?.trim();

    if (key === "userConfirmPassword") {
      error = value !== userData["userPassword"]?.value;
    } else if (validationRules[key]) {
      error = !validationRules[key]?.test(value) || !value;
    } else {
      error = !value;
    }

    errorField.textContent = error ? errorMessages[key] : "";
    if (error) isValid = false;
  });

  return isValid;
};

Object.values(userData).forEach((element) => {
  if (element) {
    element.addEventListener("change", validateForm);
  }
});

//register data
const handleRegister = () => {
  //error handling
  if (!validateForm()) return;

  // LocalStorage store
  const userInputData = {
    firstName: userData.userFirstName.value.trim(),
    lastName: userData.userLastName.value.trim(),
    email: userData.userEmail.value.trim(),
    phone: userData.userPhone.value.trim(),
    password: userData.userPassword.value.trim(), // confirm password not needed to store in local storage
    address: userData.userAddress.value.trim(),
    country: userData.userCountry.value.trim(),
    state: userData.userState.value.trim(),
    city: userData.userCity.value.trim(),
    zip: userData.userZip.value.trim(),
  };


  localStorage.setItem(
    "userFormDetailsData",
    JSON.stringify([
      ...(JSON.parse(localStorage.getItem("userFormDetailsData")) || []),
      userInputData,
    ])
  );
  
  const toast = document.getElementById("toastMsg");
  toast.classList.remove("hidden");
  toast.classList.add("flex");

  setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 3000);


  // after successfully submitted the form that input will clear
  clearForm();  
};

// after registration clear the data from inputs
const clearForm = () => {
  Object.values(userData).forEach((element) => {
    element.value = "";
  });
};

// handle signup button
signUpButton.addEventListener("click", () => {
  handleRegister();
});
