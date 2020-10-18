//https://question-app-5b6d4.firebaseio.com/
export class Question {
    static create(question) {
        return fetch('https://question-app-5b6d4.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            }).then(addToLocalStorage)
            .then(Question.renderList);
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage();
        const html = questions.length ?
            questions.map(toCard).join('')
            : `<div class="mui--text-headline">You do not have any questions yet.. Please submit a new question.</div>`;
        const list = document.getElementById('list');
        list.innerHTML = html;

    }
    static listToHtml(questions) {
        return questions.length
        ? `<ol>${questions.map(question => `<li>${question.text}</li>`).join('')}</ol>` : 'No questions yet...'
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">You do not have a token!</p>');
        }
        return fetch(`https://question-app-5b6d4.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${response}</p>`;
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `;
}
