'use strict';

const appContainer = document.body;
const galleryContainer = document.getElementById('gallery');
const app = new Directory(12, appContainer, galleryContainer);

app.ready.then(() => {

    app.drawSearchContainer(document.getElementById('search-container'), (input) => {
        input.addEventListener('keyup', () => {
            const search = app.employees.filter(el => el.fullName.toUpperCase().indexOf(input.value.toUpperCase()) > -1);
            app.drawGallery(search);
        });
    });

    app.drawLoadButton((btn) => {
        btn.addEventListener('click', () => {
            app.load();
        });
    });
});

galleryContainer.addEventListener('click', (e) => {
    console.log(e.target.closest('.card'))
});