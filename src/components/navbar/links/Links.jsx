'use client'

import React, { useState } from 'react'
import styles from  './links.module.css'
import NavLink from './navLink/navLink'
import Image from 'next/image'

const links = [
  {
      title: "Homepage",
      path: "/"
  },
  {
      title: "About",
      path: "/about"
  },
  {
      title: "Contact",
      path: "/contact"
  },
  {
      title: "Blog",
      path: "/blog"
  }
]

const Links = () => {

    const [open, setOpen] = useState(false);

    
      
    // temporary
       const session = false
       const admin = false
  return (
    <div className={styles.container}>
    <div className={styles.links}>
        {links.map((link) => (
            <NavLink key={link.title} item={link} />
        ))}{
          session ? (
            <>
            {admin && <NavLink item={{title: "Admin", path: "/admin"}} />} 
                
                <button className={styles.logout}>Logout</button>
                
            </>
          ) : (
            <NavLink item={{title: "Login", path: "/login"}} />
          )
        }
    </div>
    <Image className={styles.menuButton} src="/menu.png" alt='' width={30} height={30} onClick={() => setOpen((prev) => !prev)} />
    {
      open && <div className={styles.mobileLinks}>
        {links.map((link) => (
          <NavLink key={link.title} item={link} />
        ))}
      </div>
    }
    </div>
  )
}

export default Links