import React from 'react'
import styles from '../../styles/ListItems.module.css'

function ListItems({ idx, runDeleteTask }) {
  return (
    <div className={styles.listItems}>
      <div className={styles.itemDetails}>
        <div>
          {idx.title}
        </div>
        <div>
          {idx.deadline}
        </div>
      </div>
      <div className={styles.deleteButton}>
        <button onClick={(e) => runDeleteTask(idx.idx)}>Delete ❌</button>
      </div>
    </div>
  )
}

export default ListItems