import React from 'react';
import { useContext } from 'react';
import { Route,Redirect } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loginUser,setLoginUser]  = useContext(UserContext)
    return (
        <Route
        {...rest}
        render={({ location }) =>
        loginUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;