const isValidName = ( name ) =>
{
    return /^[a-zA-Z]{1,2}[a-z A-Z .]{2,10}$/.test( name.trim() )
}

const isValidEmail = ( email ) =>
{
    return ( /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test( email.trim() ) );
}

const isValidNumber = ( num ) =>
{
    return ( /^[6-9]{1}[0-9]{9}/.test( num.trim() ) )
}

const isValidPassword = ( pass ) =>
{
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/.test( pass.trim() )
}


module.exports = { isValidName, isValidEmail, isValidNumber, isValidPassword }



