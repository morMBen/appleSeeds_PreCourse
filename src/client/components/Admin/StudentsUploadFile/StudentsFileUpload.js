/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
import React from 'react';
import XLSX from 'xlsx';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line camelcase
// eslint-disable-next-line no-unused-vars
import {make_cols} from './MakeColumns';
import Grid from "@material-ui/core/Grid";
import {createNewUser} from "../../../DAL/Admin/UploadUsers.DAL";
import axios from 'axios';
import Select from 'react-select';


const StudentsFileUpload = () => {
    const [studentFile, setStudentFile] = React.useState(null);
    // eslint-disable-next-line no-unused-vars
    const [errorsUsers, setErrorsUsers] = React.useState([]);
    const [studentsData, setStudentsData] = React.useState([]);
    const [bootcampData, setBootcampData] = React.useState([]);
    const [selectedBootcamp, setSelectedBootcamp] = React.useState(null);

    const fileUploadHandler = (e) => {
        const {files} = e.target;
        if (files && files[0]) {
            setStudentFile({file: files[0]});
        }
    };

    const submitFile = () => {
        const reader = new FileReader();
        const rABS = !!reader.readAsArrayBuffer;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array', bookVBA: true});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);



            Promise.all(data.map(async (d) => {
                let obj = {
                    email: Object.values(d)[0],
                    firstName: Object.values(d)[1],
                    lastName: Object.values(d)[2],
                    phone: Object.values(d)[3],
                    passportId: Object.values(d)[4],
                    bootcamp: selectedBootcamp
                }
                return await createNewUser(obj).then((req) => {
                    if (req.status === 200) {
                        return obj;
                    }
                }).catch((err) => {

                })
            })).then((values) => {
                setErrorsUsers(values.filter(z => z));
            })

        };
        if (rABS) reader.readAsBinaryString(studentFile.file);
        else reader.readAsArrayBuffer(studentFile.file);
    };

    const getallBootcamps = async () => {
        await axios.get('api/admin/bootcamp',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            setBootcampData(res.data);
        })
    }
    React.useEffect(()=>{
        getallBootcamps()
    }, [])

    let optionItems = bootcampData.map((item) =>
        <option onSelect={(e)=>console.log(e.target)} key={item._id} value={item._id}>{item.bootcamp}</option>
    );
    const bootcampOptions = []
    
    bootcampData.map(bootcamp =>{
        let tempBootcamp = {
            value : bootcamp._id,
            label : bootcamp.bootcamp
        }
        bootcampOptions.push(tempBootcamp);
    })
    
    const handleChange=(e)=>{
        console.log(e.label)
        setSelectedBootcamp(e.label);
    }


    return (
        <Grid>
            Admin StudentsFileUpload :
            <input type="file" id="input" onChange={fileUploadHandler}/>
            <br/>

            select Bootcamp : 
            <Select
                placeholder="Select Option"
            //    value={bootcampData.find(obj => obj.value === selectedBootcamp)} // set selected value
                options={bootcampOptions} // set list of the data
                onChange={handleChange} // assign onChange function
            />
            {/* <select  onSelect={(e) => handleSelect(e)}  id="bootcamps" name="bootcamps">
                <option onSelect={(e) => handleSelect(e)} key={0} value={0}>select bootcamp</option>
                {optionItems ? optionItems : null}
            </select> */}

            <br/>
            <input
                type="submit"
                value="Process Triggers"
                onClick={submitFile}
            />
            <br/>
            


            errors user :
            <table>
                <thead>
                <tr>
                    {
                        Object.keys(errorsUsers.slice(0, 1)).map((k, index) => {
                            return <th key={index}>{k}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    errorsUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                {Object.values(user).map((k, index) => {
                                    return <th key={index} style={{paddingLeft: 10}}>{k}</th>
                                })}
                            </tr>
                        )


                    })
                }
                </tbody>
            </table>

        </Grid>
    );
};

export default StudentsFileUpload;
