import React from 'react'
import styles from '../../styles/LoadingScreen.module.css'
import PuffLoader from 'react-spinners/PuffLoader'

function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.loader} >
        <PuffLoader color={'white'} />
      </div>
    </div>
  );
}

export default LoadingScreen