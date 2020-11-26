/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import PrimaryButton from 'components/primary-button';
import EditUserModal from 'components/edit-user-modal';
import User, { UserEmpty } from 'models/user.model';
import UserCard from 'components/user-card';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports.js';

Amplify.configure(awsconfig);

const listUsers = `
  query list {
    listUsers (limit: 10) {
      items {
        id name address dob description
      }
      nextToken
    }
  }
`

function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editingUser, setEditingUser ] = useState(UserEmpty);
  const [users, setUsers] = useState([])

  const openModal = (user: User) => {
    setEditingUser(user);
    setModalVisibility(true);
  }

  const closeModal = () => {
    setModalVisibility(false);
  }

  const loadUsers = async () => {
    const response: any = await API.graphql(graphqlOperation(listUsers));
    const items = response.data.listUsers.items;
    setUsers(users.concat(items))
  }

  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <div className="pageContent">
      <header className={styles.header}>
        <h1>Users list</h1>
        <input className={styles.searchBar} placeholder="Search..." />
      </header>
      <main className={styles.cardsGrid}>
        {
          users.map((user, index) => 
            <UserCard 
              key={index}
              user={user}
              imgURL={`https://source.unsplash.com/128x128/?face,${index}`}
              onEdit={() => openModal(user)}
            />
          )
        }
      </main>
      <div className={styles.buttonContainer}>
        <PrimaryButton label="Load More" />
      </div>
      <EditUserModal isOpen={modalVisibility} onClose={closeModal} user={editingUser} />
    </div>
  );
}

export default App;
