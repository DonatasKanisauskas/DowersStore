import React from 'react';

const Layout =({children}) =>{
    return(
        <>
            <p>Header</p>
            <main>{children}</main>
            <p>Footer</p>
        </>
    )
}

export default Layout;