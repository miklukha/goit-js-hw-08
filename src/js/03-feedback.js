import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const feedbackFormRef = document.querySelector('.feedback-form');

feedbackFormRef.addEventListener('input', throttle(onFieldsFormInput, 500));
feedbackFormRef.addEventListener('submit', onSubmitForm);

populateFieldForm();

function onFieldsFormInput(e) {
  formData[e.target.name] = e.target.value;
  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function onSubmitForm(e) {
  e.preventDefault();

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateFieldForm() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);

  if (savedFormData) {
    if (parsedFormData.email) {
      feedbackFormRef.email.value = parsedFormData.email;
    }

    if (parsedFormData.message) {
      feedbackFormRef.message.value = parsedFormData.message;
    }
  }
}
