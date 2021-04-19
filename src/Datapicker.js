import React, {Fragment, useState} from 'react'
import { KeyboardDatePicker } from "@material-ui/pickers";

export default (props) => {

    const [value1,value2,setValue] = useState('')
    

    const valueChangeHandlerMin = event => {
        setValue(event.target.value1)
    }
    const valueChangeHandlerMax = event => {
        setValue(event.target.value2)
    }

  return (
    <Fragment >
      <KeyboardDatePicker
        placeholder="14/12/2020"
        clearable
        value={"14/12/2020"}
        emptyLabel = 'OT'
        autoOk
        minDate={new Date("2019-12-31")}
        //maxDate={new Date("2020-12-14")}
        onChange={valueChangeHandlerMin} 
        onClick={() => props.handleDateChangeStart(value1)}
        format="MM/dd/yyyy"
      />

      <KeyboardDatePicker
        placeholder="31/12/2019"
        value={value2}
        emptyLabel = 'Do'
        autoOk
        //minDate={new Date("2019-12-31")}
        onChange={valueChangeHandlerMax} 
        maxDate={new Date("2020-12-14")}
        onClick={() => props.handleDateChangeFinish(value2)}
        format="MM/dd/yyyy"
      />
    </Fragment>
  )
}

