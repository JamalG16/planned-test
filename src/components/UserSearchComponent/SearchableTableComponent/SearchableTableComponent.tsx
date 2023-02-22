import {Col, Row} from "react-grid-system";
import MagnifyingGlass from "../../../assets/magnifying_glass.svg";
import SortArrows from "../../../assets/sort-arrows.svg";
import React, {useState} from "react";
import './SearchableTableComponent.css';
import {Input} from "../../Input/Input";
import {Oval} from "react-loader-spinner";
import {User} from "../../../models/User";

export const SearchableTableComponent = (props: { users: User[]; loading: boolean }) => {

  const[users, setUsers] = useState(props.users);

  React.useEffect(() => {
    setUsers(props.users);
  }, [props.users])

  const handleQuery = (e : any) => {
    if (e.target.value.length === 0) {
      setUsers(props.users);
    }
    setUsers(props.users.filter((u) => {
      return (u.name).toLowerCase().includes(e.target.value.toLowerCase());
    }));
  }

  return (
    <>
      <Row className='search-bar-row table-row'>
        <Col sm={12}>
          <Input
            icon={<img src={MagnifyingGlass} alt={"magnifying glass"}/>}
            placeholder="Search Users"
            onChange={handleQuery}
            type="text"/>
        </Col>
      </Row>
      <Row className="table-headers-row">
        <Col sm={1}/>
        <Col sm={7}>
          <b>Name</b> &nbsp;
          <img src={SortArrows} alt="Sort Arrows"/>
        </Col>
        <Col sm={4}>
          <b>Age</b> &nbsp;
          <img src={SortArrows} alt="Sort Arrows"/>
        </Col>
      </Row>
      {
        !props.loading ? users.map( (user : any) =>
          <Row className="table-row">
            <Col sm={1}>
              <input type="checkbox"/>
            </Col>
            <Col sm={7}>
              {user.name}
            </Col>
            <Col sm={4}>
              {user.age }
            </Col>
          </Row>
        ) :
          <div className="spinner">
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
      }
    </>
  )
}
