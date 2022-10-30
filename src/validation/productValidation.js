const isValidTitle = (val) => {
    return /^[A-Za-z]{1,}[\w\d\s\.\,\+\W\D]{1,}$/.test(val);
}

const isValidDescription = (val) => {
    return /^[A-Za-z]{1,}[\w\d\s\.\W\D]{1,}$/.test(val)
}

const isValidPrice = (val) => {
    return /^[1-9]\d{0,8}(?:\.\d{1,2})?$/.test(val);
}


module.exports = {isValidTitle, isValidDescription, isValidPrice}