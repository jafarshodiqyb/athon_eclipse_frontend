import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { MenuItem } from '@material-ui/core';
import * as _ from 'lodash'
import { values } from 'lodash';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
export default function SecurityQuestions() {
    const classes = useStyles();
    const [option, setOption] = React.useState([]);
  
    const handleChange = (event) => {
    //   setOption(event.target.value);
    const { name, value } = event.target;        
      setOption((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    //   
    console.log(option)
      
    };


  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
              {[...Array(3)].map((x,y)=>{
                  return (
                    <FormControl
                      className={classes.formControl}
                      error={false}
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-error-label">
                        {y}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        value={option[x]}
                        onChange={handleChange}
                        renderValue={(value) => `⚠️  - ${value}`}
                        name={y}
                      >
                          {questions.map((value,i)=>{
                              return (
                                <MenuItem value={value.id}>{value.questions}</MenuItem>
                              )
                          })}
                      </Select>
                        {/* <FormHelperText>
                          Error
                        </FormHelperText> */}
                    </FormControl>
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

const questions=[
    {   id : '0',
        questions:'Dimana pertama kali anda bertemu pasangan anda?',
        disable:false,
    },
    {   id : '1',
        questions:'Apa nama hewan peliharaan pertama anda?',
        disable:false,
    },
    {   id : '2',
        questions:'Siapa nama kekasih pertama anda?',
        disable:false,
    },
    {   id : '3',
        questions:'Dimana pertama kali anda bekerja?',
        disable:false,
    },
    {   id : '4',
        questions:'Apa klub olahraga favorit anda?',
        disable:false,
    }
]
