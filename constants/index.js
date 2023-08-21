const CATEGORY = ["to-do", "in-progress", "done"];
const PRIORITY = ["low", "medium", "high"];

// eslint-disable-next-line no-useless-escape
const EMAILREGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Mobile number validation
const MOBILEREGEXP = /^(?:\+380\d{9}|0\d{9}|380\d{9}|38\s\d{3}\s\d{3}\s\d{2}\s\d{2})$/;

// Date validation in format DD/MM/YYYY
const BIRTHDAYREGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;

// Date validation in format HH:MM
const TIMEREGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

module.exports = {
    CATEGORY,
    PRIORITY,
    EMAILREGEXP,
    MOBILEREGEXP,
    BIRTHDAYREGEX,
    TIMEREGEX,
};
