class Directory {
    constructor(numOfEmployees, appContainer, galleryContainer) {
        this.url = `https://randomuser.me/api/?results=${numOfEmployees}&inc=name,email,location,dob,cell,picture&nat=US`;
        this.numOfEmployees = numOfEmployees;
        this.appContainer = appContainer;
        this.galleryContainer = galleryContainer;
        this.employees = [];
        this.ready = this.load();
    }

    get employeesList() {
        return this.employees;
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
        if (this.appContainer.lastChild.id !== 'load-btn') 
            this.appContainer.appendChild(loader);
        else
            this.appContainer.insertBefore(loader, this.appContainer.lastChild);
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
            const searchHTML = 
                `<form action="#" method="get">
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
                    cardDiv.className = 'card';
                    cardDiv.setAttribute('data-employee-id', i);

                    const cardHTML = 
                        `<div class="card-img-container">
                            <img class="card-img" src="${employees[i].picture}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${employees[i].fullName}</h3>
                            <p class="card-text">${employees[i].email}</p>
                            <p class="card-text cap">${employees[i].city}, ${employees[i].abbrState}</p>
                        </div>`;

                    cardDiv.innerHTML = cardHTML;
                    //cardDiv.addEventListener('click', () => this.showModal(i, employees));
                    el.appendChild(cardDiv);
                }
            } else {
                el.innerHTML = '<p>No results...</p>';
            }
        }
    }

    showError(errorMsg) {
        this.galleryContainer.innerHTML = errorMsg;
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
                       app.removeLoader();
                       app.drawGallery(app.employees);
                   });
    }
}