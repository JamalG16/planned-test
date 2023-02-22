import React, {useEffect, useState} from "react";
import {getAdults, getKids, getSeniors} from "../../api/users";
import {Col, Container, Row} from 'react-grid-system';
import './UserComponent.css';
import {SearchableTableComponent} from "./SearchableTableComponent/SearchableTableComponent";
import {Input} from "../Input/Input";
import {User} from "../../models/User";


export const UserComponent = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    Promise.all([getKids(), getAdults(), getSeniors()])
      .then(([kids, adults, seniors]) => {
        const users = ([...kids, ...adults, ...seniors]);

        // Sort users
        users.sort((a, b) => {
          const nameComparison = b.name.localeCompare(a.name);
          if (nameComparison === 0) {
            return b.age - a.age;
          }
          return nameComparison;
        });

        // Age filtering
        setUsers(users.filter((user) => {
          return (minAge ? user.age >= minAge : true) && (maxAge ? user.age <= maxAge : true);
        }));
        setLoading(false);
      });
  }

  const handleMaxAge = (e : any) => {
    setMaxAge(e.target.value);
  }

  const handleMinAge = (e : any) => {
    setMinAge(e.target.value);
  }

  return (
    <Container fluid className="container">
      <Row justify="center">
        <Col sm={3} className="left-column">
          <h2>Users</h2>
        </Col>
        <Col sm={6}/>
      </Row>
      <Row justify="center">
        <Col sm={3} className="left-column">
          <div className="component-container input-container">
            <Row className="input-row">
              <Col sm={12}>
                <Input
                  icon="Min"
                  onChange={handleMinAge}
                  value={minAge}
                  type="number"/>
              </Col>
            </Row>
            <Row className="input-row">
              <Col sm={12}>
                <Input
                  icon="Max"
                  onChange={handleMaxAge}
                  value={maxAge}
                  type="number"/>
              </Col>
            </Row>
            <Row className="button-row">
              <Col lg="content">
                <button className="button" type="button" onClick={handleSearch}>Retrieve Users</button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={6}>
          <div className="component-container">
            <SearchableTableComponent users={users} loading={loading}/>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
