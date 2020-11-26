/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import PrimaryButton from 'components/primary-button';
import EditUserModal from 'components/edit-user-modal';
import User, { UserEmpty } from 'models/user.model';
import UserCard from 'components/user-card';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports.js';
import UsersService from 'services/users.service';

Amplify.configure(awsconfig);
const usersService = new UsersService();

function App() {
  const [nextToken, setNextToken ] = useState<string | null>(null);
  const [loadedAllUsers, setLoadedAllUsers ] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [editingUser, setEditingUser ] = useState<number | null>(null);
  const [users, setUsers] = useState<Array<User>>([]);
  const batchLength: number = 6;


  const openModal = (index: number) => {
    setEditingUser(index);
    setModalVisibility(true);
  }

  const closeModal = () => {
    setModalVisibility(false);
  }

  const loadUsers = async (token: string | null) => {
    if(!loadedAllUsers){
      const response = await usersService.getUsersList(batchLength, token)
      setUsers(users.concat(response.items))
  
      if(response.token) {
        setNextToken(response.token);
      } else {
        setLoadedAllUsers(true)
      }
    }
  }

  const handleLoadMoreUsers = () => {
    loadUsers(nextToken);
  }

  useEffect(() => {
    loadUsers(null);
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
              onEdit={() => openModal(index)}
            />
          )
        }
      </main>
      <div className={styles.buttonContainer}>
        {
          loadedAllUsers 
            ? <p>Loaded all users</p>
            : <PrimaryButton label="Load More" onClick={handleLoadMoreUsers}/>
        }
      </div>
      {
        editingUser !== null && <EditUserModal isOpen={modalVisibility} onClose={closeModal} user={users[editingUser!]} />
      }
    </div>
  );
}

export default App;
