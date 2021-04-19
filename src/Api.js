import React, { Component } from 'react';
import Table from './Table';
import App from "./Datapicker";
import Search from "./Search";
import ReactPaginate from 'react-paginate';
import _ from 'lodash'
import Datapicker from "./Datapicker";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";



export default class Api extends React.Component {
    state = {
        isLoading: true,
        date: [],
        sort: 'asc',
        sortField: 'country',
        startTime: "31/12/2019",  
        finishTime: "14/12/2020",
        lenght: 0,
        currentPage: 0,
        search: ''
    }


  async componentDidMount() {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/'
    const response = await fetch(proxyUrl + targetUrl)
    const data = await response.json()
    const newdata = []
    console.log(data)
    console.log(newdata)
    var key, count = 0;
    for(key in data.records) {
      if(data.records.hasOwnProperty(key)) {       
        count++;
      }
    }

    for(let i=0;i<count;i++){
      if(data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year == this.props.finishTime){
            var countryVar =  data.records[i].countriesAndTerritories
            var casesVar = data.records[i].cases
            var deathsVar = data.records[i].deaths
            var cases_totalVar = data.records[i].cases
            var deaths_totalVar = data.records[i].deaths
            var cases_per1000Var = 0
            var deaths_per1000Var = 0
      }
      if(data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year != this.props.finishTime && data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year == this.props.startTime){
            casesVar = data.records[i].cases + casesVar
            deathsVar = data.records[i].deaths + deathsVar
            cases_totalVar = data.records[i].cases + casesVar
            deaths_totalVar = data.records[i].deaths + deathsVar
            cases_per1000Var = 0
            deaths_per1000Var = 0
      }
      if(data.records[i].day+'/'+data.records[i].month+'/'+data.records[i].year == this.props.startTime){
        newdata.push({
          country: countryVar,
          cases: data.records[i].cases + casesVar,
          deaths: data.records[i].deaths + deathsVar,
          cases_total: data.records[i].cases + casesVar,
          deaths_total: data.records[i].deaths + deathsVar,
          cases_per1000: 0,
          deaths_per1000: 0
      })
      }
      }
    this.setState({
        isLoading: false,
        data: newdata,
        lenght: count
    })
  }

  onSort = sortField => {
    const cloaneData = this.state.data.concat()
    const sortType = this.state.sort === 'asc' ? 'desc' :'asc'
    const orderedData = _.orderBy(cloaneData, sortField, sortType)
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField: sortField
  })
  }

  handleDateChangeStart = date => {
    console.log(date)
  }
  handleDateChangeFinish = date => {
    console.log(date)
  }
  handleChangeHandler = ({selected}) => {
    this.setState({currentPage: selected})
  }

searchHandler = search => {
  this.setState({search,currentPage: 0})
}

getFilteredData(){
  const {data,search} = this.state

  if (!search){
    return data
  }

  return data.filter(item => {
    return item['country'].toLowerCase().includes(search.toLowerCase())
  })
}

  render() {
    const pageSize = 5

    const filtereData = this.getFilteredData()
    var key, count = 0;
    for(key in filtereData) {
      if(filtereData.hasOwnProperty(key)) {       
        count++;
      }
    }

    const pageCount = Math.ceil(count/pageSize)

    const displayData = _.chunk(filtereData,pageSize)
    [this.state.currentPage]

    return (
      <div className="container">
        {
          this.state.isLoading 
          ? <h1>Loading</h1> 
          : <React.Fragment>
            <div className='picker'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Datapicker handleDateChangeStart={this.handleDateChangeStart} handleDateChangeFinish={this.searchHandler}/>
              </MuiPickersUtilsProvider>
            </div>
            <Search onSearch={this.searchHandler}/>
            <Table data={displayData} onSort={this.onSort} />
          </React.Fragment> 
          
      }

      {
        this.state.lenght > pageSize 
        ? <ReactPaginate
        previousLabel={'<<'}
        ClassName={'paginator'}
        nextLabel={'>>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handleChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        
        pageClassName="page-item"
        pageLinkClassName='page-link'
        previousClassName='page-item'
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}

        />
        : null
      }
      </div>
    )
  }
}

