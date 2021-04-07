import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';
import { v4 as uuidv4 } from 'uuid';

const UsersList = ({items}) => {
  
  if (items.length === 0) {
    return (
      <div className="center"> 
          <h2>No users found.</h2>     
      </div>
    );
  }

  return (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem
          key={uuidv4()}
          image={user.picture.thumbnail}
          firstName={user.firstName}
          lastName={user.lastName}
          gender={user.gender}
          email={user.email}
          backgroundColor={user.backgroundColor}
        />
      ))}
    </ul>
  );
};

export default UsersList;
