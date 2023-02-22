import React from 'react';
import {UserComponent} from "./components/UserSearchComponent/UserComponent";
import {HeaderComponent} from "./components/Header/HeaderComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <UserComponent/>
    </div>
  );
}

export default App;
