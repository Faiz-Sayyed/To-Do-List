import React from 'react'
import styles from '../../styles/Navbar.module.css'

function Navbar({ currentAccount, runConnectWallet }) {
    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>To-Do List</h1>
            <div className={styles.connectButtonArea}>
                {currentAccount ? (
                    <>
                        <button className={styles.connectButton}>
                            Wallet Connected 😃
                        </button>
                    </>
                ) : (
                    <button
                        onClick={runConnectWallet}
                        className={styles.connectButton}
                    >
                        Connect Wallet 😎
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar