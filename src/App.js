import React from 'react';
import './App.css';

import { ResponsiveBump } from '@nivo/bump';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import bestBabyStorller from './jsonData/best baby strollers_2020-07-26.json';
import bestBabyStorller1 from './jsonData/best baby strollers_2020-08-09.json';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


function processJsonData() {
  var tempMap = new Map()
  bestBabyStorller.top_products.forEach(element => {
    if(tempMap.get(element.title) === undefined) {
      tempMap.set(element.title, [{
        x: bestBabyStorller.search_metadata.created_at,
        y: element.rating
      }])
    } else {
      var tempObject = {
        x: bestBabyStorller.search_metadata.created_at,
        y: element.rating
      }
      tempMap.set(element.title, tempMap.get(element.title).push(tempObject))
    }
  });
  bestBabyStorller1.top_products.forEach(element => {
    if(tempMap.get(element.title) === undefined) {
      tempMap.set(element.title, [{
        x: bestBabyStorller1.search_metadata.created_at,
        y: element.rating
      }])
    } else {
      var tempObject = {
        x: bestBabyStorller1.search_metadata.created_at,
        y: element.rating
      }
      var tempMapObject = tempMap.get(element.title)
      tempMapObject.push(tempObject)
      tempMap.set(element.title, tempMapObject)
    }
  });
  var processedJsonData = []
  for (let [key, value] of tempMap.entries()) {
    let tempOutputObject = {}
    tempOutputObject.id = key
    tempOutputObject.data = value
    processedJsonData.push(tempOutputObject)
  }
  console.log(processedJsonData)
  return processedJsonData
}


const MyResponsiveBump = ({ data /* see data tab */ }) => (
  <ResponsiveBump
      data={data}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      colors={{ scheme: 'spectral' }}
      lineWidth={3}
      activeLineWidth={6}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: 'serie.color' }}
      axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36
      }}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'ranking',
          legendPosition: 'middle',
          legendOffset: -40
      }}
  />
)

function handleSearchTextChange() {
  
}

function App() {
  return (
    <div className="App">
      <div className="playground">
        <Container>
        <div className="search-bar-wrapper">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" onChange={handleSearchTextChange} placeholder="search for..." />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
          </Form>
        </div>
        <div className="bump-chart-wrapper">
          <MyResponsiveBump data={processJsonData()}></MyResponsiveBump>
        </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
