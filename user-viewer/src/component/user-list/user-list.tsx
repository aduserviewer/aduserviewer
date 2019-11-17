import * as React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

import { UserEntity, SortOptions } from "../../model";
import { getUsers } from "../../api/user";
import "./user-list.scss";

const pageSize = 10;

/**
 * Displays a list of user records using an infinite scroll behavior. Page
 * size of 10. Also provides a capability for sorting on different user
 * attributes.
 * @param clickHandler A function used to emit user selection to the App component
 */
export const UserListComponent = ({ clickHandler }: any) => {
    const [allUsersLoaded, setAllUsersLoaded] = React.useState<boolean>(false);

    const [allUsers, setAllUsers] = React.useState<UserEntity[]>([]);
    const [displayedUsers, setDisplayedUsers] = React.useState<UserEntity[]>(
        []
    );
    const [page, setPage] = React.useState<number>(0);
    const [sortOptions, setSortOptions] = React.useState<SortOptions>({
        attribute: "lastName",
        direction: "asc"
    });

    /**
     * Perform call to user service to load records into user list. Update
     * state accordingly.
     */
    const loadUsers = () => {
        setPage(0);
        setDisplayedUsers([]);
        setAllUsers([]);
        setAllUsersLoaded(false);

        getUsers(sortOptions)
            .then(results => {
                setAllUsers(results);
            })
            .finally(() => {
                setAllUsersLoaded(true);
            });
    };

    /**
     * Appends the next page of users to the displayed users list and
     * updates state.
     */
    const updateDisplayedUsers = () => {
        if (!allUsersLoaded) {
            return;
        }

        const pagedResults = allUsers.slice(
            page * pageSize,
            (page + 1) * pageSize
        );

        const merged = displayedUsers.concat(pagedResults);

        setDisplayedUsers(merged);
    };

    React.useEffect(() => {
        loadUsers();

        // eslint-disable-next-line
    }, [sortOptions]);

    React.useEffect(() => {
        updateDisplayedUsers();

        // eslint-disable-next-line
    }, [allUsersLoaded, page]);

    /**
     * Used by the infinite scroller to update the current page, which
     * in turn triggers an update of displayed user records.
     *
     * @param page The next page to retrieve records for
     */
    const loadFunc = (page: number) => {
        setPage(page);
    };

    /**
     * Event handler for a sort options selection. Updates
     * the sort options state, which triggers a load for new users.
     *
     * @param event The select change event containing the sort options
     * selection
     */
    const sortByChange = (event: any) => {
        const [attribute, direction] = event.target.value.split("_");

        setSortOptions({
            attribute,
            direction
        });
    };

    return (
        <>
            <div className="user-list w-100">
                <Container>
                    <Row>
                        <Col>
                            Viewing {displayedUsers.length} records.{" "}
                            {displayedUsers.length < allUsers.length
                                ? `Scroll for more.`
                                : ``}
                        </Col>
                        <Col className="text-right">
                            Sort by
                            <select className="ml-1" onChange={sortByChange}>
                                <option value="firstName_asc">
                                    First Name ASC
                                </option>
                                <option value="firstName_desc">
                                    First Name DESC
                                </option>
                                <option selected value="lastName_asc">
                                    Last Name ASC
                                </option>
                                <option value="lastName_desc">
                                    Last Name DESC
                                </option>
                                <option value="gender_asc">Gender ASC</option>
                                <option value="gender_desc">Gender DESC</option>
                                <option value="region_asc">Region ASC</option>
                                <option value="region_desc">Region DESC</option>
                            </select>
                        </Col>
                    </Row>

                    <Row className="header-row">
                        <Col className="img-col px-3"></Col>
                        <Col>First</Col>
                        <Col className="col-3">Last</Col>
                        <Col>Gender</Col>
                        <Col className="col-4">Region</Col>
                    </Row>
                    <div className="infinite-scroll">
                        {allUsers.length ? (
                            <InfiniteScroll
                                pageStart={0}
                                initialLoad={false}
                                loadMore={loadFunc}
                                hasMore={
                                    displayedUsers.length < allUsers.length
                                }
                                loader={
                                    <div className="loader text-center" key={0}>
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        ></Spinner>
                                    </div>
                                }
                                useWindow={false}
                            >
                                {displayedUsers.map(user => (
                                    <UserRow
                                        key={user.id}
                                        user={user}
                                        clickHandler={clickHandler}
                                    />
                                ))}
                                {allUsersLoaded &&
                                    displayedUsers.length ===
                                        allUsers.length && (
                                        <Row className="justify-content-md-center pt-5">
                                            <header>
                                                <h1 className="text-muted">
                                                    No more records to display.
                                                </h1>
                                            </header>
                                        </Row>
                                    )}
                                {!allUsersLoaded && (
                                    <Row className="justify-content-md-center pt-5">
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        ></Spinner>
                                    </Row>
                                )}
                            </InfiniteScroll>
                        ) : (
                            <Row className="justify-content-md-center pt-5">
                                <Spinner
                                    animation="border"
                                    role="status"
                                ></Spinner>
                            </Row>
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
};

const UserRow = ({
    user,
    clickHandler
}: {
    user: UserEntity;
    clickHandler: any;
}) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const imgSize = 80;

    return (
        <Card
            body
            className="mt-3"
            onClick={() => {
                clickHandler(user);
            }}
        >
            <Row className="user-row">
                <Col title={fullName} className="px-3 img-col">
                    <img
                        src={user.photoUrl}
                        width={imgSize}
                        height={imgSize}
                        alt={fullName}
                    />
                </Col>
                <Col title={user.firstName}>{user.firstName}</Col>
                <Col className="col-3" title={user.lastName}>
                    {user.lastName}
                </Col>
                <Col title={user.gender}>{user.gender}</Col>
                <Col className="col-4" title={user.region}>
                    {user.region}
                </Col>
            </Row>
        </Card>
    );
};
