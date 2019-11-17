import * as React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./user-details.scss";
import { UserEntity } from "../../model";

/**
 * Displays a details view for a selected user record. A provided 'Back' button
 * will clear the selected user and trigger a navigation back to the users list.
 */
export const UserDetailsComponent = ({
    user,
    goBack
}: {
    user: UserEntity;
    goBack: any;
}) => {
    const imgSize = 300;

    return (
        <>
            <Container className="user-details mt-2 mx-3">
                <div></div>
                <Row>
                    <Col>
                        <h1>{`${user.lastName}, ${user.firstName}`}</h1>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={goBack}>Back</Button>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Card body className="mx-3 p-3 col">
                        <Container>
                            <Row>
                                <Col className="col-4 pl-0">
                                    <img
                                        src={user.photoUrl}
                                        width={imgSize}
                                        height={imgSize}
                                        alt={`${user.firstName} ${user.lastName}`}
                                    />
                                </Col>
                                <Col className="col-8">
                                    <Container className="attributes">
                                        <Row>
                                            <Col className="col-3">
                                                <label>Gender:</label>
                                            </Col>
                                            <Col className="col-9 val">
                                                <label>{`${user.gender}`}</label>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="col-3">
                                                <label>Region:</label>
                                            </Col>
                                            <Col className="col-9 val">
                                                <label>{`${user.region}`}</label>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="col-3">
                                                <label>Phone:</label>
                                            </Col>
                                            <Col className="col-9 val">
                                                <label>{`${user.phone}`}</label>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="col-3">
                                                <label>E-mail:</label>
                                            </Col>
                                            <Col className="col-9 val">
                                                <label>{`${user.email}`}</label>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Row>
            </Container>
        </>
    );
};
