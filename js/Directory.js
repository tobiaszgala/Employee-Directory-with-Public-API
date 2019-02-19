class Directory {
    constructor(numOfEmployees, appContainer, galleryContainer) {
        this.url = `https://randomuser.me/api/?results=${numOfEmployees}&inc=name,email,location,dob,cell,picture&nat=US`;
        this.numOfEmployees = numOfEmployees;
        this.appContainer = appContainer;
        this.galleryContainer = galleryContainer;
        this.employees = [];
        this.ready = this.load();
    }

    fetchEmployeesData() {
        return fetch(this.url)
                .then(response => response.json())
                .then(response => response.results)
                .catch((error) => {
                    this.removeLoader();
                    this.showError(`Sorry, there was an error. Error message - ${error}`);
                });
    }

    createEmployees() {
        return this.fetchEmployeesData().then(data => {
            let employee;
            this.employees = [];
            for (let i = 0; i < this.numOfEmployees; i++) {
                employee = data[i];
                this.employees.push(new Employee(employee.name.first, employee.name.last, employee.email,
                                                 employee.location, employee.cell, employee.dob, employee.picture.large))
            }
        })
    }

    drawLoader() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'loader';
        (this.appContainer.lastChild.id !== 'load-btn') ? this.appContainer.appendChild(loader) 
                                                        : this.appContainer.insertBefore(loader, this.appContainer.lastChild);
    }

    drawLoadButton(callback, content) {
        const btnLoad = document.createElement('div');

        content = (content && typeof content === 'string' || content instanceof String) ? content : 'Load more...';
        
        btnLoad.id = 'load-btn';
        btnLoad.className = 'load-btn';
        btnLoad.textContent = content;

        callback(btnLoad);

        this.appContainer.appendChild(btnLoad);
    }

    drawSearchContainer(el, callback) {
        
        if (el && el.nodeType && el.nodeType === 1) {
            const searchHTML = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                </form>`;
            
            el.innerHTML = searchHTML;
            callback(document.getElementById('search-input'));
        }

    }

    drawGallery(employees) {
        const el = this.galleryContainer;
        if (el && el.nodeType && el.nodeType === 1) {
            if (employees.length > 0) {
                this.resetGallery();
                for (let i = 0; i < employees.length; i++) {
                    const cardDiv = document.createElement('div');
                    cardDiv.id = `card-${i}`;
                    cardDiv.className = 'card';

                    const cardHTML = `<div class="card-img-container">
                                            <img class="card-img" src="${employees[i].picture}" alt="profile picture">
                                        </div>
                                        <div class="card-info-container">
                                            <h3 id="name" class="card-name cap">${employees[i].fullName}</h3>
                                            <p class="card-text">${employees[i].email}</p>
                                            <p class="card-text cap">${employees[i].city}, ${employees[i].abbrState}</p>
                                        </div>`;

                    cardDiv.innerHTML = cardHTML;
                    cardDiv.addEventListener('click', () => this.showModal(i, employees));
                    el.appendChild(cardDiv);
                }
            } else {
                el.innerHTML = '<p>No results...</p>';
            }
        }
    }

    showModal(id, employees) {
        this.appendModal(this.appContainer);
        const modal = document.getElementById('modal-container');
        if (modal !== null && typeof id === 'number') {
            if (employees.length > 0) {
                let modalContentHTML = `<div class="modal">
                                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                            <div class="modal-info-container">
                                                <img class="modal-img" src="${employees[id].picture}" alt="profile picture">
                                                <h3 id="name" class="modal-name cap">${employees[id].fullName}</h3>
                                                <p class="modal-text">${employees[id].email}</p>
                                                <p class="modal-text cap">${employees[id].city}</p>
                                                <hr>
                                                <p class="modal-text">${employees[id].cellPhoneNumber}</p>
                                                <p class="modal-text">${employees[id].fullAddress}</p>
                                                <p class="modal-text">Birthday: ${employees[id].birthDay}</p>
                                            </div>
                                        </div>';`;
                if (employees.length > 1) {
                    modalContentHTML += `<div class="modal-btn-container">`;
                    if (id !== 0) {
                        modalContentHTML += `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`;
                    }

                    if (id < employees.length - 1) {
                        modalContentHTML += `<button type="button" id="modal-next" class="modal-next btn">Next</button>`;
                    }
                                                            
                    modalContentHTML += `</div>`;
                }

                modal.innerHTML = modalContentHTML;

                if (modal.innerHTML) {

                    const btnClose =  document.getElementById('modal-close-btn');
                    const btnPrev  =  document.getElementById('modal-prev');
                    const btnNext  =  document.getElementById('modal-next');

                    if (btnClose !== null) btnClose.addEventListener('click', () => this.removeModal());
                    if (btnPrev  !== null) btnPrev.addEventListener('click', () => {
                        this.removeModal();
                        this.showModal(id - 1, employees)
                    });
                    if (btnNext  !== null) btnNext.addEventListener('click', () => {
                        this.removeModal();
                        this.showModal(id + 1, employees)
                    });
                }
            }
        } 

    }

    removeModal() {
        if (this.appContainer.lastChild.id === 'modal-container') {
            this.appContainer.removeChild(this.appContainer.lastChild);
        }
        
    }

    appendModal(el) {
        if (el && el.nodeType && el.nodeType === 1) {
            const modalDiv = document.createElement('div');
            modalDiv.id = 'modal-container';
            modalDiv.className = 'modal-container';
            el.appendChild(modalDiv);
        }
    }

    showError(text) {
        this.galleryContainer.innerHTML = text;
    }

    resetGallery() {
        this.galleryContainer.innerHTML = '';
    }

    removeLoader() {
        const loader = document.getElementById('loader');
        if (loader !== null) loader.parentElement.removeChild(loader);
    }

    load() {
        this.resetGallery();
        this.drawLoader();
        return this.createEmployees()
                .then(() => {
                    this.removeLoader();
                    this.drawGallery(this.employees);
                });
    }
}