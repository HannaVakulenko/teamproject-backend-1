const CATEGORY = ["to-do", "in-progress", "done"];
const PRIORITY = ["low", "medium", "high"];

// eslint-disable-next-line no-useless-escape
const EMAILREGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Mobile number validation in the format 3801111111
const MOBILEREGEXP = /^\d{11}/;

// Date validation in format DD/MM/YYYY
const BIRTHDAYREGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;


module.exports = {
    CATEGORY,
    PRIORITY,
    EMAILREGEXP,
    MOBILEREGEXP,
    BIRTHDAYREGEX,
};