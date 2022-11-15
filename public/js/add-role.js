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


