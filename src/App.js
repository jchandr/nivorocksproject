import React from 'react';
import './App.css';

import { ResponsiveBump } from '@nivo/bump';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import bestBabyStorller from './jsonData/data.json';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


function processJsonData() {
  var tempMap = new Map()
  bestBabyStorller.data.forEach(dataset => {
    dataset.organic_results.forEach(element => {
      let tempX = dataset.search_metadata.created_at
      // let tempY = element.position
      let tempY = Math.floor(Math.random() * Math.floor(dataset.organic_results.length))
      if (tempMap.get(element.domain) === undefined) {
        tempMap.set(element.domain, [{
          x: tempX,
          y: tempY
        }])
      } else {
        var tempObject = {
          x: tempX,
          y: tempY
        }
        var tempMapValue = tempMap.get(element.domain)
        tempMapValue.push(tempObject)
        tempMap.set(element.domain, tempMapValue)
      }
    });
  })
  var processedJsonData = []
  for (let [key, value] of tempMap.entries()) {
    let tempOutputObject = {}
    tempOutputObject.id = key
    tempOutputObject.data = value
    if(tempOutputObject.id !== undefined) {
      processedJsonData.push(tempOutputObject)
    }
  }
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
    animate={false}
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
