import './styles.css';
import {createModal, isValid} from "./utils";
import {Question} from "./question";
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', Question.renderList);


form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true;

        Question.create(question).then(response => {
            console.log('question: ', JSON.stringify(question));
            input.value = '';
            input.classList = '';
            submitBtn.disabled = false;
        })
    }
}

function openModal() {
    createModal('Login', getAuthForm())
    const authForm = document.getElementById('auth-form');
    authForm.addEventListener('submit', authFormHandler, {once: true})
}


function authFormHandler(event) {
    event.preventDefault();
    let button = event.target.querySelector('button');
    button.disabled = true;
    let email = event.target.querySelector('#email').value;
    let password = event.target.querySelector('#password').value;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => button.disabled = false);
}

function renderModalAfterAuth(content){
    if (typeof content === 'string') {
     createModal('Error', content)
    } else {
        createModal('List of questions', Question.listToHtml(content))
    }
}
