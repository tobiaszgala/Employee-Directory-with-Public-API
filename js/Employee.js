class Employee {
    constructor(firstName, lastName, email, address, cellPhoneNumber, dob, picture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.cellPhoneNumber = cellPhoneNumber;
        this.dob = dob;
        this.picture = picture;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

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
            if (states[i][0] === state.toLowerCase()) return states[i][1];
        }

        return this.capitalize(state);
    };

    get city() {
        return this.capitalize(this.address.city);
    }

    get abbrState() {
        return this.convertStateName(this.address.state);
    }

    get birthDay() {
        const date = this.dob.date;
        const month = date.substring(5, 7);
        const day = date.substring(8, 10);
        const year = date.substring(0, 4)

        return `${month}-${day}-${year}`;
    }

    get fullAddress() {
        const street = this.address.street.split(' ').reduce((acc, value) => {
            return `${acc} ${this.capitalize(value)}`;
        });

        return `${street}, ${this.capitalize(this.address.city)}, 
                ${this.convertStateName(this.address.state)} ${this.address.postcode}`;
    }

    get fullName() {
        return `${this.capitalize(this.firstName)} ${this.capitalize(this.lastName)}`;
    }
}