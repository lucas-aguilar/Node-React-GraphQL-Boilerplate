import React, { useState } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken, getAccessToken } from '../accessToken';

interface LoginProps {}

export const Login: React.FC<RouteComponentProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log('submitted');
        console.log(email, password);
        try {
          const response = await login({
            variables: {
              email,
              password,
            },
          });
          console.log('response:');
          console.log(response);

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <h1>register page</h1>
      <div>
        <input
          type="email"
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
      <button type="submit">Login</button>
    </form>
  );
};
