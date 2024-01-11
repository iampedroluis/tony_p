async function obtenerToken() {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: 'admin@admin.com', password: 'admin' })
        });

        if (response.ok) {
            const data = await response.json();
            return data.token; // Asegúrate de que la respuesta incluya el token en esta propiedad
        } else {
            console.error('Error en la obtención del token:', response.statusText);
            alert('Error al obtener el token');
            return null;
        }
    } catch (error) {
        console.error('Error en la captura:', error);
        alert('Error al obtener el token');
        return null;
    }
}



document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const token = await obtenerToken();
    if (!token) {
        alert('No se pudo obtener el token');
        return;
    }

    const formData = new FormData();
    formData.append('rol_id', document.getElementById('rol_id').value);
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('imagen', document.getElementById('imagen').files[0]);
    formData.append('archivo', document.getElementById('archivo').files[0]);
    console.log(formData)
    // Suponiendo que tienes un ID para actualizar
    var idParaActualizar = document.getElementById('idParaActualizar').value;

    try {
        const response = await fetch(`http://localhost:3000/informacion/${idParaActualizar}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });

        if (response.status === 200) {
            console.log('Información actualizada con éxito');
            alert('Información actualizada con éxito');
        } else {
            console.error('Error en la actualización:', response.statusText);
            alert('Error en la actualización');
        }
    } catch (error) {
        console.error('Error en la captura:', error);
        alert('Error en la actualización');
    }
});
