class Modal {
    /** 
     * Constructor method
     * @param  {HTMLElement} appContainer - HTML element
     * @param  {array} employees - Array of objects with employees data
     */
    constructor(appContainer, employees) {
        this.appContainer = appContainer;
        this.employees = employees;
    }
    /**
     * Method displays modal of selected employee on the page
     * @param  {number} employeeID - ID of an employee
     */
    showModal(employeeID) {
        this.appendModal(this.appContainer);
        const modal = document.getElementById('modal-container');
        if (modal && typeof employeeID === 'number') {
            if (this.employees.length > 0) {
                let modalContentHTML = 
                `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${this.employees[employeeID].picture}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${this.employees[employeeID].fullName}</h3>
                        <p class="modal-text">${this.employees[employeeID].email}</p>
                        <p class="modal-text cap">${this.employees[employeeID].city}</p>
                        <hr>
                        <p class="modal-text">${this.employees[employeeID].cellPhoneNumber}</p>
                        <p class="modal-text">${this.employees[employeeID].fullAddress}</p>
                        <p class="modal-text">Birthday: ${this.employees[employeeID].birthDay}</p>
                    </div>
                </div>';`;
                // if there is more than one employee create container for buttons
                if (this.employees.length > 1) {
                    modalContentHTML += `<div class="modal-btn-container">`;
                    // if employee is not first on the list create prev button
                    if (employeeID !== 0) {
                        modalContentHTML += `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>`;
                    }
                    // if employee is not last on the list create next button
                    if (employeeID < this.employees.length - 1) {
                        modalContentHTML += `<button type="button" id="modal-next" class="modal-next btn">Next</button>`;
                    }

                    modalContentHTML += `</div>`;
                }

                modal.innerHTML = modalContentHTML;
                // if modal is not empty
                if (modal.innerHTML.trim()) {

                    const btnClose = document.getElementById('modal-close-btn');
                    const btnPrev = document.getElementById('modal-prev');
                    const btnNext = document.getElementById('modal-next');

                    // create event listiners for close, prev and next button
                    if (btnClose && btnClose.tagName === 'BUTTON') 
                        btnClose.addEventListener('click', () => this.removeModal());

                    if (btnPrev && btnClose.tagName === 'BUTTON') {
                        btnPrev.addEventListener('click', () => {
                            this.removeModal();
                            this.showModal(employeeID - 1)
                        });
                    }

                    if (btnNext && btnClose.tagName === 'BUTTON') {
                        btnNext.addEventListener('click', () => {
                            this.removeModal();
                            this.showModal(employeeID + 1)
                        });
                    }
                }
            }
        }
    }
    
    /**
     * Method creates and appends modal container on the page
     * @param  {HTMLElement} el - HTML element where modal should be appended to
     */
    appendModal(el) {
        // check if el exists and is type of element
        if (el && el.nodeType === 1) {
            const modalDiv = document.createElement('div');
            modalDiv.id = 'modal-container';
            modalDiv.className = 'modal-container';
            el.appendChild(modalDiv);
        }
    }
    /**
     * Method removes modal container
     */
    removeModal() {
        // check if modal exists
        if (this.appContainer.lastChild.id === 'modal-container')
            // remove modal
            this.appContainer.removeChild(this.appContainer.lastChild);
    }

}