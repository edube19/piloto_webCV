document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            this.classList.toggle('active');
            const content = this.querySelector('.timeline-content');
            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        }
    });
});