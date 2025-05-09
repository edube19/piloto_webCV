document.addEventListener('DOMContentLoaded', function() {
        fetch('data/data.json')
            .then(response => response.json())
            .then(data => {
                // Header
                document.querySelector('header h1').textContent = data.header.nombre;
                document.querySelector('.tagline').textContent = data.header.titulo;

                // Sobre Mí
                document.querySelector('#about .about-content p').textContent = data.sobre_mi;

                //Perfil
                document.querySelector('#perfil .perfil-content p').textContent = data.perfil;

                // Habilidades
                
                const skillsContainer = document.querySelector('#skills .container');
                for (const [categoria, habilidades] of Object.entries(data.habilidades)) {
                    skillsContainer.innerHTML += `
                        <h3>${categoria}</h3>
                        <ul class="skills-list">
                            ${habilidades.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    `;
                }

                // Experiencia (Timeline)
                const timeline = document.querySelector('.timeline');
                data.experiencia.forEach(trabajo => {
                    timeline.innerHTML += `
                        <div class="timeline-item">
                            <div class="timeline-date">${trabajo.fecha}</div>
                            <div class="timeline-content">
                                <h3>${trabajo.puesto}</h3>
                                <p class="company">${trabajo.empresa}</p>
                                <ul>
                                    ${trabajo.funciones.map(funcion => `<li>${funcion}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                });

                // Contacto
                const contactContainer = document.querySelector('#contact .container');
                contactContainer.innerHTML = `
                    <h2>Contacto</h2>
                    <p><i class="fas fa-envelope"></i> Email: <a href="mailto:${data.contacto.email}">${data.contacto.email}</a></p>
                    <p><i class="fab fa-linkedin"></i> LinkedIn: <a href="${data.contacto.linkedin}" target="_blank">Mi Perfil</a></p>
                    <p><i class="fab fa-github"></i> GitHub: <a href="${data.contacto.github}" target="_blank">${data.contacto.github.split('/').pop()}</a></p>
                `;
                //JS para pantallas pequeñas
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    item.addEventListener('click', function() {
                        if (window.innerWidth <= 768) {
                            this.classList.toggle('active');
                            const content = this.querySelector('.timeline-content');
                            content.style.maxHeight = this.classList.contains('active') 
                                ? content.scrollHeight + 'px' 
                                : '0';
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error:', error);
                // Opcional: Mostrar mensaje de error en la página
                document.body.innerHTML = `<div style="color:red;padding:20px;">Error al cargar los datos: ${error.message}</div>`;
            });
});