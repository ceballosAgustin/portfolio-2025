function showNotification(mainMessage, subMessage, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.innerHTML = type === 'success' ?
        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>`;

    const text = document.createElement('div');
    text.classList.add('text');

    const mainText = document.createElement('div');
    mainText.classList.add('main');
    mainText.textContent = mainMessage;

    const subText = document.createElement('div');
    subText.classList.add('sub');
    subText.textContent = subMessage;

    text.appendChild(mainText);
    text.appendChild(subText);
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 100);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 6000);
}

export function setupFormHandler() {
    const form = document.getElementById('contacto-form');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch('https://formspree.io/f/xvgkabkb', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showNotification(
                        '¡Mensaje enviado con éxito!',
                        'Muchas gracias por contactarme.',
                        'success'
                    );
                    form.reset();
                } else {
                    showNotification(
                        'Hubo un error al enviar el mensaje.',
                        'Por favor, inténtalo de nuevo.',
                        'error'
                    );
                }
            } catch (error) {
                showNotification(
                    'Hubo un error de conexión.',
                    'Por favor, inténtalo de nuevo.',
                    'error'
                );
            }
        });
    }
}