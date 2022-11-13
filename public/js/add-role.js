/* Adding new role */
const newRoleHandler = async (event) => {
	event.preventDefault();

	const role = document.querySelector('#family-role').value.trim();
	const family_name = document.querySelector('#family-name').value.trim();

	if(role && family_name){
		const response = await fetch('/api/family', {
			method: 'POST',
			body: JSON.stringify({ role,family_name }),
			headers: {'Content-Type': 'application/json'},
		});
		
		if (response.ok) {
			//if successful, redirect to /user (user.handlebars)
			document.location.replace('/user');
		} else {
			alert(response.statusText);
		}
	}
}
	
document
	.querySelector('.new-role-form')
	.addEventListener('submit',newRoleHandler)


// const newFormHandler = async (event) => {
// 	event.preventDefault();

// 	const name = document.querySelector('#user-name').value.trim();
// 	const role = document.querySelector('#user-role').value.trim();
// 	// const chores = document.querySelector('#user-chores').value.trim();

// 	if (name && role) {
// 		const response = await fetch(`/api/ChoreRoutes`, {
// 			method: 'POST',
// 			body: JSON.stringify({ name, role }),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});

// 		if (response.ok) {
// 			document.location.replace('/Chore');
// 		} else {
// 			alert('Failed to create chore!');
// 		}
// 	}
// };

// // create new js file for add/create button/delete button

// const delButtonHandler = async (event) => {
// 	if (event.target.hasAttribute('data-id')) {
// 		const id = event.target.getAttribute('data-id');

// 		const response = await fetch(`/api/ChoreRoutes/${id}`, {
// 			method: 'DELETE',
// 		});

// 		if (response.ok) {
// 			document.location.replace('/Chore');
// 		} else {
// 			alert('Failed to delete chore');
// 		}
// 	}
// };

// document
// 	.querySelector('.new-chore-created')
// 	.addEventListener('submit', newFormHandler);

// document
// 	.querySelector('.chore-list')
// 	.addEventListener('click', delButtonHandler);


