import React, {Component} from 'react';
import { Tabs,Tab } from 'react-bootstrap';
import Api from './Api';
import ChoseChar from "./ChoseChar";


export default class Placeholder extends React.Component {

  render() {
    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Таблица">
              <Api finishTime ='12/12/2020'startTime ='31/12/2019'/>
            </Tab>
            <Tab eventKey="profile" title="График">
                <ChoseChar finishTime ='12/12/2020'startTime ='31/12/2019'/>
            </Tab>
      </Tabs>
    )
  }
}