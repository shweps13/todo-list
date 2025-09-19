import React from 'react'
import { Link } from 'react-router'
import styles from '../css/NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.notFound}>
      <p>The page you're looking for doesn't exist</p>
      <Link to="/">Go back home</Link>
    </div>
  )
}

export default NotFound;
