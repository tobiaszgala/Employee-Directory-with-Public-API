class Directory {
    /**
     * Constructor method
     * @param  {number} numOfEmployees - Number of employees to be displayed on the page
     * @param  {HTMLElement} appContainer - HTML element for app container
     * @param  {HTMLElement} galleryContainer - HTML element for app container
     */
    constructor(numOfEmployees, appContainer, galleryContainer) {
        this.url = `https://randomuser.me/api/?results=${numOfEmployees}&inc=name,email,location,dob,cell,picture&nat=US`;
        this.numOfEmployees = numOfEmployees;
        this.appContainer = appContainer;
        this.galleryContainer = galleryContainer;
        this.employees = [];
        this.ready = this.load();
    }
    /**
     * Method is using Fetch API to get data from randomuser API
     * @returns = Promise with json object
     */
    fetchEmployeesData() {
        return fetch(this.url)
                .then(response => response.json())
                .then(response => response.results)
                .catch((error) => {
                    this.removeLoader();
                    this.showError(`Sorry, there was an error. Could not load API data. Details: ${error}`);
                });
    }
    /**
     * Method creates array of new employees and store them in employees property
     * @returns = Promise
     */
    createEmployees() {
        return this.fetchEmployeesData().then(data => {
                let employee;
                this.employees = [];
                for (let i = 0; i < this.numOfEmployees; i++) {
                    employee = data[i];
                    this.employees.push(new Employee(employee.name.first, employee.name.last, employee.email,
                                                     employee.location, employee.cell, employee.dob, employee.picture.large))
                }
            });
    }
    /**
     * Method creates loader on the page
     */
    drawLoader() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'loader';
        // if there is no 'load button' on the page insert loader at the end of app container
        if (this.appContainer.lastChild.id !== 'load-btn') 
            this.appContainer.appendChild(loader);
        else
        // if there is a button insert loader before it
            this.appContainer.insertBefore(loader, this.appContainer.lastChild);
    }
    /**
     * Method creates 'load more' button on the page
     * @param  {function} callback - Callback function after load button is created
     * @param  {string} content - textContent of a load button
     */
    drawLoadButton(callback, content) {
        const btnLoad = document.createElement('div');
        // if content is not a string or if its empty set textContent of load button to default value
        content = (content && typeof content === 'string' || content instanceof String) ? content : 'Load more...';
        
        btnLoad.id = 'load-btn';
        btnLoad.className = 'load-btn';
        btnLoad.textContent = content;

        if (typeof callback === 'function') callback(btnLoad);

        this.appContainer.appendChild(btnLoad);
    }
    /**
     * Method creates search input on the page
     * @param  {HTMLElement} el - Specify container for search input
     * @param  {function} callback - Callback function after search input is generated
     */
    drawSearchContainer(el, callback) {
        // check if el exists and is type of element
        if (el && el.nodeType === 1) {
            const searchHTML = 
                `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                </form>`;
            
            el.innerHTML = searchHTML;
            if (typeof callback === 'function') callback(document.getElementById('search-input'));
        }

    }
    /**
     * Method generates gallery of employees on the page
     * @param  {array} employees - Array of objects with employees data
     */
    drawGallery(employees) {
        const el = this.galleryContainer;

        // check if gallery container exists and its an element
        if (el && el.nodeType === 1) {
            if (employees.length > 0) {
                this.resetGallery();
                for (let i = 0; i < employees.length; i++) {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    // set data attribute with employee id
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
                    el.appendChild(cardDiv);
                }
            } else {
                this.showError('No results...');
            }
        }
    }
    /**
     * Method displays error message inside gallery container
     * @param  {string} errorMsg - Error message
     */
    showError(errorMsg) {
        this.galleryContainer.innerHTML = `<span>${errorMsg}</span>`;
    }
    /**
     * Method resets gallery
     */
    resetGallery() {
        this.galleryContainer.innerHTML = '';
    }
    /**
     * Method removes loader
     */
    removeLoader() {
        const loader = document.getElementById('loader');
        // check if loader exists on the page
        if (loader && loader.nodeType === 1) loader.parentElement.removeChild(loader);
    }
    /**
     * Methods loads app and sets ready state
     * @returns Promise
     */
    load() {
        this.resetGallery();
        this.drawLoader();
        return this.createEmployees().then(() => {
                                        app.removeLoader();
                                        app.drawGallery(this.employees);
                                   });
    }
}