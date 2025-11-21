const listaUsuarios = document.getElementById("listaUsuarios");

const generarEdad = () => Math.floor(Math.random() * (60 - 18 + 1)) + 18;

const obtenerUsuarios = async () => {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        const usuarios = await respuesta.json();

        const usuariosProcesados = usuarios.map(usuario => {
            const { id, name, username, phone, email, company, address } = usuario;

            const nuevaAddress = `${address.street}, ${address.suite}, ${address.city}`;

            return {
                ...usuario,
                age: generarEdad(),
                img: `./assets/img/${id}.jpeg`,
                address: nuevaAddress
            };
        });

        mostrarUsuarios(usuariosProcesados);

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
};

const mostrarUsuarios = usuarios => {
    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.classList.add("usuario");

        li.innerHTML = `
            <img src="${usuario.img}" alt="${usuario.name}">
            <div class="info">
                <p><strong>Nombre:</strong> ${usuario.name}</p>
                <p><strong>Edad:</strong> ${usuario.age}</p>
                <p><strong>Usuario:</strong> ${usuario.username}</p>
                <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Empresa:</strong> ${usuario.company.name}</p>
                <p><strong>Dirección:</strong> ${usuario.address}</p>
            </div>
        `;

        listaUsuarios.appendChild(li);
    });
};

obtenerUsuarios();
