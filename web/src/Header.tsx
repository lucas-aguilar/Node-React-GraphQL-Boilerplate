import React from 'react';
import { Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' });
  const [logout] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>you are logged as: {data.me.email} </div>;
  } else {
    body = <div>not logged in</div>;
  }
  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      <div>
        <button
          onClick={async () => {
            await logout();
            setAccessToken('');
          }}
        >
          logout
        </button>
      </div>
      {body}
    </header>
  );
};
