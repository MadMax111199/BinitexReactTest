import React from 'react'
import { BsArrowUpDown } from 'react-icons/bs';


export default props => (
    <table className="table table-bordered">
  <thead>
    <tr>
    <th onClick={props.onSort.bind(null,'country')} scope="col"><h6>Ctrana</h6><br></br><BsArrowUpDown /></th>
      <th onClick={props.onSort.bind(null,'cases')} scope="col"><h6>Количество случаев</h6><br></br><BsArrowUpDown /></th>
      <th onClick={props.onSort.bind(null,'deaths')} scope="col"><h6>Количество смертей</h6><br></br><BsArrowUpDown /></th>
      <th onClick={props.onSort.bind(null,'cases_total')} scope="col"><h6>Количество случаев всего</h6><br></br><BsArrowUpDown /></th>
      <th onClick={props.onSort.bind(null,'deaths_total')} scope="col"><h6>Количество смертей всего</h6><br></br><BsArrowUpDown /></th>
      <th onClick={props.onSort.bind(null,'cases_per1000')} scope="col"><h6>Количество случаев на 1000 жителей</h6><br></br><BsArrowUpDown /></th>
      <th onClick={props.onSort.bind(null,'deaths_per1000')} scope="col"><h6>Количество смертей на 1000 жителей</h6><br></br><BsArrowUpDown /></th>
    </tr>
  </thead>
  <tbody>
    {props.data.map(item => (
    <tr key = {item.id}>  
        <td>{item.country}</td>
        <td>{item.cases}</td>
        <td>{item.deaths}</td>
        <td>{item.cases_total}</td>
        <td>{item.deaths_total}</td>
        <td>{item.cases_per1000}</td>
        <td>{item.deaths_per1000}</td>
    </tr>
))}
  </tbody>
</table>
)