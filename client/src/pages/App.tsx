/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import PrimaryButton from 'components/primary-button';
import EditUserModal from 'components/edit-user-modal';
import User from 'models/user.model';
import UserCard from 'components/user-card';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports.js';
import UsersService from 'services/users.service';

Amplify.configure(awsconfig);
const usersService = new UsersService();


function useFetchUsers(batchLength: number){
  const [users, setUsers] = useState<Array<User>>([]);
  const [nextToken, setNextToken ] = useState<string | null>(null);
  const [loadedAll, setLoadedAllUsers ] = useState<boolean>(false);

  const loadUsers = async () => {
    if(!loadedAll){
      const response = await usersService.getUsersList(batchLength, nextToken)
      setUsers(users.concat(response.items))
  
      if(response.token) {
        setNextToken(response.token);
      } else {
        setLoadedAllUsers(true)
      }
    }
  }

  return { users, loadedAll, loadUsers }
}

function useFilterUsers(users: Array<User>) {
  const [searchString, setSearchString] = useState<string>("");
  const [filteredUsers, setFilteredUsers ] = useState<Array<User>>(users);

  useMemo(() => {
    const result = users.filter(user => user.name.toLowerCase().includes(searchString.toLowerCase()));
    setFilteredUsers(result);
  }, [users, searchString])

  return { searchString, setSearchString, filteredUsers }
}

function App() {
  const { users, loadedAll, loadUsers } = useFetchUsers(6);
  const { searchString, setSearchString, filteredUsers } = useFilterUsers(users);
  const [ editingUser, setEditingUser ] = useState<User | null>(null);

  const openModal = (user: User) => {
    setEditingUser(user);
  }

  const closeModal = () => {
    setEditingUser(null);
  }

  const handleLoadMoreUsers = () => {
    setSearchString("");
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <div className="pageContent">
      <header className={styles.header}>
        <h1>Users list</h1>
        <input data-testid="searchBar" className={styles.searchBar} placeholder="Search..." value={searchString} onChange={e => setSearchString(e.target.value)}/>
      </header>
      <main data-testid="cardsGrid" className={styles.cardsGrid}>
        {
          filteredUsers.map((user, index) => 
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
        {
          loadedAll
            ? <p>Loaded all users</p>
            : <PrimaryButton data-testid="loadMoreBtn" label="Load More" onClick={handleLoadMoreUsers}/>
        }
      </div>
      {
        editingUser && <EditUserModal onClose={closeModal} user={editingUser} />
      }
    </div>
  );
}

export default App;
