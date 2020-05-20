import React from 'react';
import { Link } from 'react-router-dom';
import { useUsersQuery } from '../generated/graphql';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { data } = useUsersQuery({
    fetchPolicy: 'network-only', // not use the cache
  });
  return (
    <div>
      <h1>Home</h1>
      <div>Users:</div>
      <ul>
        {data?.users.map((x) => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
