/* login */
const loginFormHandler = async (event) => {
	// Stop the browser from submitting the form so we can do so with JavaScript
	event.preventDefault();

	// Gather the data from the form elements on the page
	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		// Send [{ email, password }]to the server
		const response = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			//if logged in, redirect the browser to /user user.handlebars
			document.location.replace('/user');
		} else {
			alert('Failed to log in');
		}
	}
};

/* sign up */
const signupFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#name-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (name && email && password) {
		/* POST [{name, email, password}] to localhost:3001/api/user */
		const response = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			//if signed up, redirect the browser to /user (user.handlebars)
			document.location.replace('/user');
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);
