document.addEventListener('DOMContentLoaded', function() {
    const eyes = document.querySelectorAll('.glaz');
    const pupils = document.querySelectorAll('.zrach');
    const maxOffset = (eyes[0].offsetWidth - pupils[0].offsetWidth) / 2;

    function movePupils(e) {
        // Проверяем, находится ли курсор внутри любого из глаз
        let isCursorOnEyes = false;
        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const distance = Math.sqrt(
                Math.pow(e.clientX - eyeCenterX, 2) + 
                Math.pow(e.clientY - eyeCenterY, 2)
            );
            // Если курсор внутри глаза (расстояние меньше радиуса глаза)
            if (distance < eyeRect.width / 2) {
                isCursorOnEyes = true;
            }
        });

        // Если курсор на любом глазу - центрируем оба зрачка
        if (isCursorOnEyes) {
            pupils.forEach(pupil => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
            return;
        }

        // Иначе - обычное слежение
        eyes.forEach((eye, index) => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(
                Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)),
                maxOffset
            );
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            pupils[index].style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        });
    }

    document.addEventListener('mousemove', movePupils);
});