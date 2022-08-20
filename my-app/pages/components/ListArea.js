import React from 'react'
import { useState } from 'react'
import ListItem from './ListItems.js'
import styles from '../../styles/ListArea.module.css'

function ListArea({ tasks, addTask, deleteTask }) {
  const [name, setName] = useState();
  const [deadline, setDeadline] = useState();

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDeadline(e) {
    const date = e.target.value.split("-");

    let day = date[2];
    let month = date[1];
    let year = date[0];
    let newDeadline = day + "/" + month + "/" + year;

    setDeadline(newDeadline);
    console.log(deadline);
  }

  function runAddTask() {
    let nameInput = document.getElementById('name');
    nameInput.value = '';
    let deadlineInput = document.getElementById('deadline');
    deadlineInput.value = '';

    addTask(name, deadline);
  }

  function runDeleteTask(idx) {
    console.log(idx);
    deleteTask(idx);
  }

  return (
    <div className={styles.body}>
      <div className={styles.inputArea}>
        <div>
          <label htmlFor="name">Enter Task Name</label>
          <input type="text" id="name" placeholder="Task Name" autoComplete="off" onChange={e => changeName(e)} />
        </div>

        <div>
          <label htmlFor="deadline">Enter Task Deadline</label>
          <input type="date" id="deadline" placeholder="Task Deadline" onChange={e => changeDeadline(e)} />
        </div>

        <div>
          <button type='submit' className={styles.submitButton} onClick={runAddTask}>Submit</button>
        </div>
      </div>
      <div className={styles.listAreaContainer}>
        <div className={styles.listArea}>
          <div className={styles.title}>
            <div>Name</div>
            <div>Deadline</div>
          </div>
          <hr className={styles.titleHr} />
          <div>
            <ul>
              {
                (tasks.length === 0) ? (
                  <div className={styles.emptyList}>
                    Yay! No due tasks 🤩
                  </div>
                ) : (
                  tasks.map((idx, k) =>
                    <li key={`${idx}+${k}`}>
                      <ListItem idx={idx} runDeleteTask={runDeleteTask} />
                      <hr className={styles.hr} />
                    </li>
                  )
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListArea