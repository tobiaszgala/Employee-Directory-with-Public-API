class Employee {
    /**
     * Constructor method
     * @param  {string} firstName
     * @param  {string} lastName
     * @param  {string} email
     * @param  {string} address
     * @param  {string} cellPhoneNumber - Pre-formatted phone number
     * @param  {object} dob - Object containing date of birth
     * @param  {string} picture
     */
    constructor(firstName, lastName, email, address, cellPhoneNumber, dob, picture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.cellPhoneNumber = cellPhoneNumber;
        this.dob = dob;
        this.picture = picture;
    }
    /**
     * Get formatted city name
     */
    get city() {
        return this.capitalize(this.address.city);
    }
    /**
     * Get state abbreviation
     */
    get abbrState() {
        return this.convertStateName(this.address.state);
    }
    /**
     * Get formatted birthday
     */
    get birthDay() {
        const date = this.dob.date;
        const month = date.substring(5, 7);
        const day = date.substring(8, 10);
        const year = date.substring(0, 4)

        return `${month}/${day}/${year}`;
    }
    /**
     * Get formatted address
     */
    get fullAddress() {
        const street = this.address.street.split(' ').reduce((acc, value) => {
            return `${acc} ${this.capitalize(value)}`;
        });

        return `${street}, ${this.capitalize(this.address.city)}, 
                ${this.convertStateName(this.address.state)} ${this.address.postcode}`;
    }
    /**
     * Get full name of an employee
     */
    get fullName() {
        return `${this.capitalize(this.firstName)} ${this.capitalize(this.lastName)}`;
    }
    /**
     * Method capitalize first letter of a word
     * @param  {string} string - Word to capitalize
     */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    /**
     * Method convert state name to abbreviation
     * @param  {string} state - Full state name
     */
    convertStateName(state) {
        const states = [
            ['alabama', 'AL'],
            ['alaska', 'AK'],
            ['arizona', 'AZ'],
            ['arkansas', 'AR'],
            ['california', 'CA'],
            ['colorado', 'CO'],
            ['connecticut', 'CT'],
            ['delaware', 'DE'],
            ['florida', 'FL'],
            ['georgia', 'GA'],
            ['hawaii', 'HI'],
            ['idaho', 'ID'],
            ['illinois', 'IL'],
            ['indiana', 'IN'],
            ['iowa', 'IA'],
            ['kansas', 'KS'],
            ['kentucky', 'KY'],
            ['louisiana', 'LA'],
            ['maine', 'ME'],
            ['maryland', 'MD'],
            ['massachusetts', 'MA'],
            ['michigan', 'MI'],
            ['minnesota', 'MN'],
            ['mississippi', 'MS'],
            ['missouri', 'MO'],
            ['montana', 'MT'],
            ['nebraska', 'NE'],
            ['nevada', 'NV'],
            ['new hampshire', 'NH'],
            ['new jersey', 'NJ'],
            ['new mexico', 'NM'],
            ['new york', 'NY'],
            ['north carolina', 'NC'],
            ['north dakota', 'ND'],
            ['ohio', 'OH'],
            ['oklahoma', 'OK'],
            ['oregon', 'OR'],
            ['pennsylvania', 'PA'],
            ['rhode island', 'RI'],
            ['south carolina', 'SC'],
            ['south dakota', 'SD'],
            ['tennessee', 'TN'],
            ['texas', 'TX'],
            ['utah', 'UT'],
            ['vermont', 'VT'],
            ['virginia', 'VA'],
            ['washington', 'WA'],
            ['west virginia', 'WV'],
            ['wisconsin', 'WI'],
            ['wyoming', 'WY']
        ];
        
        for (let i = 0; i < states.length; i++) {
            // if there is a match return short name
            if (states[i][0] === state.toLowerCase()) return states[i][1];
        }
        // if there is no match return capitalized state name 
        return this.capitalize(state.toLowerCase());
    };

}