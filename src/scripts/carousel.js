export function initCarousels() {
    document.querySelectorAll('.relative.group').forEach(carousel => {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const cards = track?.children;

        if (!cards || cards.length === 0) return;

        let currentIndex = 0;
        let cardWidth = 0;

        const visibleCards = () => {
        const screenWidth = window.innerWidth;
        return screenWidth < 768 ? 1 : screenWidth < 1024 ? 2 : 3;
        };

        const updateCarousel = () => {
        cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(track).gap);
        const maxIndex = Math.max(cards.length - visibleCards(), 0);
        
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }
    };


    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

        track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const swipeDifference = touchStartX - touchEndX;

        if (Math.abs(swipeDifference) > swipeThreshold) {
            if (swipeDifference > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    };


    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, cards.length - visibleCards());
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateCarousel();
        });
    }

    const resizeObserver = new ResizeObserver(entries => {
        currentIndex = 0;
        updateCarousel();
    });

        resizeObserver.observe(track);
        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    });
}