import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

interface RegisterProps {}

export const Register: React.FC<RouteComponentProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log('submitted');
        console.log(email, password);
        try {
          const response = await register({
            variables: {
              email,
              password,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <h1>register page</h1>
      <div>
        <input
          // type="email"
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
