import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "./App.scss";
import { UserListComponent, UserDetailsComponent } from "./component";
import { UserEntity } from "./model";

/**
 * App component that houses the application, tracks selected user state,
 * and handles display of User List and User Details components
 */
const App: React.FC = () => {
    const [selectedUser, setSelectedUser] = React.useState<UserEntity | null>(
        null
    );

    /**
     * Used to navigate from the user details screen to user list.
     */
    const goBack = () => {
        setSelectedUser(null);
    };

    return (
        <div className="App">
            <Container className="bg-light">
                <Row className="justify-content-md-center pt-3">
                    {selectedUser && (
                        <UserDetailsComponent
                            user={selectedUser}
                            goBack={goBack}
                        ></UserDetailsComponent>
                    )}
                    {!selectedUser && (
                        <UserListComponent
                            clickHandler={setSelectedUser}
                        ></UserListComponent>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default App;
