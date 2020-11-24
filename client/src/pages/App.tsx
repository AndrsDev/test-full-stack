import React from 'react';
import Card from 'components/card';
import styles from './App.module.css';
import PrimaryButton from 'components/primary_button';
import Avatar from 'components/avatar';

function App() {

  const data = [
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

  return (
    <main className="pageContent">

      <header className={styles.header}>
        <h1>Users list</h1>
        <input className={styles.searchBar} placeholder="Search..." />
      </header>
 

      <main className={styles.cardsGrid}>
        {
          data.map((element, index) => 
            <Card key={index}>
              <div className={styles.cardContent}>
                <Avatar imgURL={`https://source.unsplash.com/128x128/?face,${index}`} alt={element.name}/>
                <div className={styles.cardDetails}>
                  <h2>{element.name}</h2>
                  <p>{element.description}</p>
                </div>
                <button>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.59456 12.7577C4.42905 12.8604 4.29054 13.0137 4.20527 13.2127L2.08395 18.1625C1.72835 18.9922 2.56729 19.8311 3.39701 19.4755L8.34676 17.3542C8.54573 17.2689 8.69909 17.1304 8.8018 16.9649C8.87632 16.9136 8.94724 16.8549 9.0135 16.7886L16.7917 9.01043L18.2059 7.59622L19.9737 5.82845C20.7547 5.0474 20.7547 3.78107 19.9737 3.00002L18.5594 1.58581C17.7784 0.804761 16.5121 0.804761 15.731 1.58581L4.77086 12.546C4.7046 12.6122 4.64583 12.6831 4.59456 12.7577ZM6.53863 13.6066L7.95284 15.0208L15.3775 7.59622L13.9632 6.182L6.53863 13.6066ZM18.5594 4.41424L16.7917 6.182L15.3775 4.76779L17.1452 3.00002L18.5594 4.41424ZM5.46173 15.3582L4.90704 16.6524L6.20131 16.0977L5.46173 15.3582Z" fill="black" fill-opacity="0.4"/>
                  </svg>
                </button>
              </div>
            </Card> 
          )
        }
      </main>
      {/* <PrimaryButton label="Button" />
      <input placeholder="Placeholder" /> */}
    </main>
  );
}

export default App;