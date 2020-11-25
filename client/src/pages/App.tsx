import React, { useState } from 'react';
import styles from './App.module.css';
import PrimaryButton from 'components/primary-button';
import EditUserModal from 'components/edit-user-modal';
import User, { UserEmpty } from 'models/user.model';
import UserCard from 'components/user-card';


function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [editingUser, setEditingUser ] = useState(UserEmpty);

  const data: Array<User> = [
    {
      "id": "1",               
      "name": "Andres Sanabria",      
      "dob": "23-04-1998",                 
      "address": "Guatemala",         
      "description": "Software developer",
      "createdAt": "24-11-2020",
      "updatedAt": "24-11-2020" 
    },
    {
      "id": "2",               
      "name": "Manuel Castro",      
      "dob": "23-04-1998",                 
      "address": "Guatemala",         
      "description": "Software developer",
      "createdAt": "24-11-2020",
      "updatedAt": "24-11-2020" 
    },
    {
      "id": "1",               
      "name": "Andres Sanabria",      
      "dob": "23-04-1998",                 
      "address": "Guatemala",         
      "description": "Software developer",
      "createdAt": "24-11-2020",
      "updatedAt": "24-11-2020" 
    },
    {
      "id": "1",               
      "name": "Andres Sanabria",      
      "dob": "23-04-1998",                 
      "address": "Guatemala",         
      "description": "Software developer",
      "createdAt": "24-11-2020",
      "updatedAt": "24-11-2020" 
    },
  ]

  const openModal = (user: User) => {
    setEditingUser(user);
    setModalVisibility(true);
  }

  const closeModal = () => {
    setModalVisibility(false);
  }

  return (
    <div className="pageContent">
      <header className={styles.header}>
        <h1>Users list</h1>
        <input className={styles.searchBar} placeholder="Search..." />
      </header>
      <main className={styles.cardsGrid}>
        {
          data.map((element, index) => 
            <UserCard 
              key={index}
              user={element}
              imgURL={`https://source.unsplash.com/128x128/?face,${index}`}
              onEdit={() => openModal(element)}
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
