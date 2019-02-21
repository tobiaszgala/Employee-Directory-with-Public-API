'use strict';

const NUM_OF_EMPLOYEES = 12;
const appContainer = document.body;
const galleryContainer = document.getElementById('gallery');

// create new dirrectory
const app = new Directory(NUM_OF_EMPLOYEES, appContainer, galleryContainer);

// when app is done initializing 
app.ready.then(() => {
    let employeesList = app.employees;

    // create optional search input
    app.drawSearchContainer(document.getElementById('search-container'), (input) => {
        input.addEventListener('keyup', () => {
            employeesList = app.employees.filter(el => el.fullName.toUpperCase().indexOf(input.value.toUpperCase()) > -1);
            app.drawGallery(employeesList);
        });
    });

    // create optional load button
    app.drawLoadButton((btn) => {
        btn.addEventListener('click', () => {
            app.load().then(() => employeesList = app.employees);
        });
    });

    // event bubbling - listening for click on employee card
    galleryContainer.addEventListener('click', (e) => {
        // get closest element with class .card
        if (e.target.closest('.card')) {
            const employeeID = parseInt(e.target.closest('.card').dataset.employeeId);
            const modal = new Modal(appContainer, employeesList);
            modal.showModal(employeeID);
        }
    });
});
