import React from 'react'

const userDashboard = () =>
{

    return (


        <div div style={ {
            height: '84vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--bg_color)'
        } } >
            <h2 style={ {
                fontSize: '2rem',
                color: 'var(--main_color)'
            } }
            >
                Welcome  To Dashboard </h2>
            
        </div>
    )
}

export default userDashboard