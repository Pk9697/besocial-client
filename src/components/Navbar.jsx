import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
function Navbar() {
  return (
    <div className='navbar'>
        <div className="navbar__section">
            <h3 className='navbar__header'>BeSocial</h3>
            <input className='navbar__input input' type="text" placeholder='Search...'/>
            <div className='icon navbar__search-icon'>
                <SearchOutlinedIcon/>
            </div>
        </div>
        <div className="navbar__section" id='navbar__section2'>
            <div className='navbar__menu'>
                <p>Name</p>
            </div>
            <div className="icon menu-icon">
                <MenuOutlinedIcon/>
            </div>
            <div className="navbar__items-container">
                <p className='navbar__items item1'>Name</p>
                <p className='navbar__items'>Log Out</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar