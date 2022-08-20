import React from 'react'
import styles from '../../styles/TotTasks.module.css'

function TotTasks({ tasks }) {
  return (
    <div className={styles.totTasksContainer}>
      <div className={styles.totTasks}>
        <div>
          Total tasks:
        </div>
        <div>
          {
            (tasks !== null)?tasks.length : 0
          }
        </div>
      </div>
    </div>
  )
}

export default TotTasks