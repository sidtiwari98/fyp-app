import React from "react";
import TopBar from '../../components/TopBar/TopBar'

export default function DefaultLayout(props) {  
    return (
      <div>
        <div className = "header_container">
          <TopBar/>
        </div>
          {props.children}
      </div>
    );
  }