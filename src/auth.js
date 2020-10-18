export function getAuthForm() {
    return `
     <form class="mui-form" id="auth-form">
                <div class="mui-textfield">
                    <input type="email" id="email" required>
                    <label for="email">Email</label>
                </div>
                <div class="mui-textfield">
                    <input type="password" id="password" required>
                    <label for="password">Password</label>
                </div>
                <button type="submit" class="mui-btn mui-btn--primary">Login</button>
            </form>
    `;
}

export function authWithEmailAndPassword(email, password) {
    const API_KEY = 'AIzaSyC7Rv5bLNSMLN8JcJ08TTn6lxqQ8ndU9OE';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(response => response.json())
        .then(data => data.idToken)
}
