export function setupFormHandler() {
    const form = document.getElementById('contacto-form');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = sanitizeInput(document.getElementById('name').value);
            const email = sanitizeInput(document.getElementById('email').value);
            const message = sanitizeInput(document.getElementById('message').value);

            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s]{2,50}$/.test(name)) {
                showNotification('Nombre inválido', 'Solo letras y espacios (2-50 caracteres).', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('Email inválido', 'Introduce un correo válido.', 'error');
                return;
            }

            if (message.length < 10 || message.length > 500) {
                showNotification('Mensaje inválido', 'Debe tener entre 10 y 500 caracteres.', 'error');
                return;
            }

            try {
                const response = await fetch('https://formspree.io/f/xvgkabkb', {
                    method: 'POST',
                    body: new URLSearchParams({
                        name: name,
                        email: email,
                        message: message
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showNotification('¡Mensaje enviado!', 'Gracias por contactarme.', 'success');
                    form.reset();
                } else {
                    showNotification('Error', 'Inténtalo de nuevo.', 'error');
                }
            } catch (error) {
                showNotification('Error de conexión', 'Revisa tu internet.', 'error');
            }
        });
    }
}