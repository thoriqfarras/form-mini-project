const name = document.getElementById('name');
const email = document.getElementById('email');
const country = document.getElementById('country');
const postcode = document.getElementById('postcode');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const submitBtn = document.querySelector('button');

const isValidUKPostcode = function isValidUKPostcode(string) {
  return /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i.test(string);
};

const isValidIndonesianPostcode = function isValidIndonesianPostcode(string) {
  return /^^([1-9])[0-9]{4}$$/i.test(string);
};

const formIsValid = function formIsValid() {
  return (
    name.validity.valid &&
    email.validity.valid &&
    postcode.validity.valid &&
    password.validity.valid &&
    confirmPassword.validity.valid
  );
};

name.addEventListener('input', () => {
  const error = document.getElementById('name-error');
  if (name.validity.valueMissing) {
    error.innerText = 'Name cannot be blank';
    error.className = 'error active';
  } else {
    error.innerText = '';
    error.className = 'error';
  }
});

email.addEventListener('input', () => {
  const error = document.getElementById('email-error');
  if (email.validity.valueMissing) {
    error.innerText = 'Email cannot be blank';
    error.className = 'error active';
  } else if (!email.validity.valid) {
    error.innerText = 'Email must be a valid email';
    error.className = 'error active';
  } else {
    error.innerText = '';
    error.className = 'error';
  }
});

postcode.addEventListener('input', () => {
  const error = document.getElementById('postcode-error');
  if (postcode.validity.valueMissing) {
    error.innerText = 'Postcode cannot be blank';
    error.className = 'error active';
  } else if (country.value === 'uk') {
    if (!isValidUKPostcode(postcode.value)) {
      error.innerText =
        'UK postcodes must follow the following pattern: SW1A 2AA';
      error.className = 'error active';
    } else {
      error.innerText = '';
      error.className = 'error';
    }
  } else if (country.value === 'indonesia') {
    if (!isValidIndonesianPostcode(postcode.value)) {
      error.innerText =
        'Indonesian postcode must contain 5 digits and the first digit cannot be zero.';
      error.className = 'error active';
    } else {
      error.innerText = '';
      error.className = 'error';
    }
  }
});

password.addEventListener('input', () => {
  const error = document.getElementById('password-error');
  const blankError = document.getElementById('blank-error');
  const lengthError = document.getElementById('length-error');
  const numberError = document.getElementById('number-error');
  const capitalError = document.getElementById('capital-error');
  const symbolError = document.getElementById('symbol-error');
  if (password.validity.valueMissing) {
    blankError.innerText = 'Password cannot be blank';
    blankError.className = 'active';
    error.className = 'error active';
  } else {
    blankError.innerText = '';
    blankError.className = '';
    error.className = 'error';
  }

  if (password.validity.tooShort) {
    lengthError.innerText = 'Minimum 8 characters';
    lengthError.className = 'active';
    error.className = 'error active';
  } else {
    lengthError.innerText = '';
    lengthError.className = '';
  }

  if (!/[0-9]/.test(password.value)) {
    numberError.innerText = 'Minimum 1 number';
    numberError.className = 'active';
    error.className = 'error active';
  } else {
    numberError.innerText = '';
    numberError.className = '';
  }

  if (!/[A-Z]/.test(password.value)) {
    capitalError.innerText = 'Minimum 1 capital letter';
    capitalError.className = 'active';
    error.className = 'error active';
  } else {
    capitalError.innerText = '';
    capitalError.className = '';
  }

  if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password.value)) {
    symbolError.innerText = 'Minimum 1 symbol';
    symbolError.className = 'active';
    error.className = 'error active';
  } else {
    symbolError.innerText = '';
    symbolError.className = '';
  }
});

confirmPassword.addEventListener('input', () => {
  const error = document.getElementById('confirm-password-error');
  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Password doesn't match!");
    error.innerText = "Password doesn't match";
    error.className = 'error active';
  } else {
    error.innerText = '';
    error.className = 'error';
    confirmPassword.setCustomValidity('');
  }
});

submitBtn.addEventListener('click', (e) => {
  if (formIsValid()) {
    e.preventDefault();
    submitBtn.innerText = 'Thank you!';
  } else {
    submitBtn.innerText = 'Submit';
  }
});
