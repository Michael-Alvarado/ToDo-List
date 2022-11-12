const deleteRoleHandler = async (event) =>{
    event.preventDefault();

    /* console.log (window.location.toString().split('/')) in google chrome and it returns an array splitted by '/' ['http://localhost:3001/edit/user/:id'] */
    /* array[array.length -1] will return the correct /:id */
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`api/family/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            family_id: id,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok){
        document.location.replace('/user');
    } else {
        alert(response.statusText)
    }
}

document
    .querySelector('.delete-role-btn')
    .addEventListener('click', deleteRoleHandler)