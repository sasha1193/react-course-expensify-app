//HOC - HIGHER ORDER COMPONENT - A component that renders another component

import React from 'react';
import ReactDOM from 'react-dom';
//another component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

//HOCs
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please dont share</p>}
            <WrappedComponent {...props} />
        </div>
    )
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuth ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please, login</p>
            )}
        </div>
    )
};


const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="This are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuth={false} info="This are the details" />, document.getElementById('app'));