const editRoleHandler = async (event) => {
    event.preventDefault();

    const role = document.querySelector('#edit-family-role').value.trim();
    const family_name = document.querySelector('#edit-family-name').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 
    ]

    const response = await fetch(`/api/family/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ family_id: id, role, family_name }),
        headers: {'Content-Type': 'application/json'},
    });

    if(response.ok){
        document.location.replace('/user');
    } else {
        alert(response.statusText)
    }

}

document
    .querySelector('.edit-role-form')
    .addEventListener('submit', editRoleHandler)

