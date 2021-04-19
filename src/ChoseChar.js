import React, { PureComponent } from 'react';
import Api from './Api';
import {  PieChart, Pie, Tooltip } from 'recharts';



export default class Placeholder extends React.Component {
    state = {
        isLoading: true,
        date: [],
        sortField: 'country',
        lenght: 0,
    }

      async componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/'
        const response = await fetch(proxyUrl + targetUrl)
        const data = await response.json()

        const newdata = []
        var key, count = 0;
        for(key in data.records) {
          if(data.records.hasOwnProperty(key)) {       
            count++;
          }
        }

        for(let i=0;i<count;i++){
          if(data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year == this.props.finishTime){
                var name =  data.records[i].countriesAndTerritories
                var value = data.records[i].cases
          }
          if(data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year != this.props.finishTime && data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year == this.props.startTime){
                value = data.records[i].cases + value
          }
          if(data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year == this.props.startTime){
            newdata.push({
              name: name,
              value: data.records[i].cases + value,
          })
          }
          }
          console.log(newdata)
        this.setState({
            isLoading: false,
            data: newdata,
            lenght: count
        })
      }


    render() {
        const data = this.state.data
        console.log(data)
        return (
        <div>
            <h2 className="main_title">Круговая диаграмма</h2>
            <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#242354"
                label
            />
            <Tooltip />
            </PieChart>
        </div>
        );
    }
}
