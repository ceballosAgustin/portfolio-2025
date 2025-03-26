
export function sanitizeInput(input) {
    return input
        .replace(/&/g, '&amp;')  // &
        .replace(/</g, '&lt;')    // <
        .replace(/>/g, '&gt;')    // >
        .replace(/"/g, '&quot;')  // "
        .replace(/'/g, '&#039;'); // '
}

export function setupFormValidation() {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (event) {
            const name = sanitizeInput(document.getElementById('name').value);
            const email = sanitizeInput(document.getElementById('email').value);
            const message = sanitizeInput(document.getElementById('message').value);

            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇç\s]{2,50}$/.test(name)) {
                alert('El nombre solo puede contener letras y espacios, y debe tener entre 2 y 50 caracteres.');
                event.preventDefault();
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                event.preventDefault();
                return;
            }

            if (message.length < 10 || message.length > 500) {
                alert('El mensaje debe tener entre 10 y 500 caracteres.');
                event.preventDefault();
                return;
            }

            // Asigno los valores sanitizados de vuelta a los campos del form
            document.getElementById('name').value = name;
            document.getElementById('email').value = email;
            document.getElementById('message').value = message;
        });
    }
}