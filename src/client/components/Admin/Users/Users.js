import React from 'react';
import {userTable} from "../../../DAL/Admin/UsersTable.DAL";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
// import {useHistory} from "react-router-dom";
import {CSVLink} from "react-csv";
import Select from 'react-select';
import axios from 'axios';

const header = [
    {text: "First Name", obj:  "firstName"},
    {text: "Last Name", obj: "lastName"},
    {text: "passportId", obj: "passportId"},
    {text: "phone", obj: "phone"},
    {text: "bootcamp", obj: "bootcamp"}
]
const questionsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,  11]

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        width: '100%',
    },
    container: {
        maxHeight: '90%',
    },
    tableRow: {
        textAlign: 'center',
        whiteSpace: "nowrap"
    }
});

const Users = () => {
    // const history = useHistory();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([]);
    const [xldata, setXlData] = React.useState([]);
    const [bootcampData, setBootcampData] = React.useState([]);
    const [selectedBootcamp, setSelectedBootcamp] = React.useState(null);


    const csvData = [];
    const csvHeaders = [];
    header.map((h) => {
        csvHeaders.push(h.text)
    })

    questionsArray.map((questionNumber) => {
        csvHeaders.push(`Q-${questionNumber + 1} `)
    })
    csvHeaders.push('Grade')

    const getallBootcamps = async () => {
        await axios.get('/api/admin/bootcamp', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log("res.data :", res.data)
            setBootcampData(res.data);
        })
    }

    React.useEffect(() => {
        userTable().then((req) => {
            setData(req.data);

        })
        getallBootcamps()
    }, [])

    React.useEffect(() => {
        let allUsersList = data.map((user) => {
            let userArray = [user.u.firstName, user.u.lastName, user.u.passportId, user.u.phone, user.u.bootcamp]
            let grade = 0;

            questionsArray.map(q => {
                if (q === 11) {
                    if (user.u.answers[11]) {
                        userArray.push(user.u.answers[11].grade)
                        grade += user.u.answers[11].grade
                    } else {
                        userArray.push(0)
                    }
                    // user.u.answers[11] ?  userArray.push(user.u.answers[11].grade): userArray.push(0);
                    return
                }
                let answer = user.answers.find(ans => ans.questionID == q);
                if (answer) {
                    grade += answer.testsPassed / answer.totalTests;
                    userArray.push(`${answer.testsPassed}/${answer.totalTests} \nclicks: ${answer.clicked}`);
                } else {
                    userArray.push('X');
                }
            })
            userArray.push(grade.toFixed(2))
            csvData.push(userArray)
            // return userArray;
        })
        // console.log("allUsersList :",allUsersList)
        setXlData(csvData)
    }, [data])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const bootcampOptions = [{
        value: 'show all',
        label: 'show all',
    }]

    bootcampData.map(bootcamp => {
        let tempBootcamp = {
            value: bootcamp._id,
            label: bootcamp.bootcamp
        }
        bootcampOptions.push(tempBootcamp);
    })

    const handleChange = (e) => {
        // console.log(e.label)
        setSelectedBootcamp(e.label);
    }
    const getFilteredData = () => {
        if (!data) return
        if (selectedBootcamp === null) return data
        if (selectedBootcamp === 'show all') return data
        const filteredData = data.filter((user) => {
            return user.u.bootcamp?.includes(selectedBootcamp)
        })
        return filteredData
    }
    // console.log(getFilteredData());

    return <Grid item md={10}>

        <Paper className={classes.root}>
            <div style={{position: 'absolute', zIndex: 100, width: '400px', marginTop: '-25px'}}>
                <Select
                    style={{margin: '10px 0', positon: 'absolute'}}
                    placeholder="Select Bootcamp"
                    //    value={bootcampData.find(obj => obj.value === selectedBootcamp)} // set selected value
                    options={bootcampOptions} // set list of the data
                    onChange={handleChange} // assign onChange function
                />

            </div>

            <br/>
            {
                xldata.length > 1 ? (
                    <CSVLink data={xldata} headers={csvHeaders}>DownLoad Excel</CSVLink>
                ) : ""

            }
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                header.map((h, index) => {
                                    return <TableCell className={classes.tableRow} key={index}>
                                        {h.text}
                                    </TableCell>
                                })
                            }
                            {
                                [...Array(12).keys()].map((questionNumber, index) => {
                                    return <TableCell className={classes.tableRow} key={index}>
                                        Q-{questionNumber + 1}
                                    </TableCell>
                                })
                            }
                            {
                                <TableCell className={classes.tableRow}>
                                    Grade
                                </TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            //// filterr the data by bootcamp after assigning bootcamp to all users
                        }
                        {getFilteredData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            let grade = 0;
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {header.map((column, index) => {
                                        const value = row.u[column.obj];
                                        return (
                                            <TableCell className={classes.tableRow} key={index}>
                                                {/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                    {
                                        [...Array(12).keys()].map((questionNumber, index) => {
                                            let question = row.answers.find(q => q.questionID == questionNumber);
                                            if (question) {
                                                if (question.questionType === "assignments") {
                                                    let assignment = row.u.answers[questionNumber];
                                                    if (assignment) {
                                                        // grade += assignment.grade;
                                                        return (
                                                            <TableCell className={classes.tableRow} key={index}>
                                                                <DoneIcon style={{color: "green"}}/><br/>
                                                                <p> assignment : {assignment.grade}</p>
                                                            </TableCell>
                                                        )
                                                    }

                                                } else {
                                                    grade += question.testsPassed / question.totalTests;
                                                    return (
                                                        <TableCell className={classes.tableRow} key={index}>
                                                            {question.testsPassed === question.totalTests ?
                                                                <DoneIcon style={{color: "green"}}/> :
                                                                `${question.testsPassed}/${question.totalTests}`}<br/>
                                                            <p>clicks : {question.clicked}</p>
                                                        </TableCell>
                                                    )
                                                }
                                            } else {
                                                return <TableCell className={classes.tableRow} key={index}>
                                                    <ClearIcon style={{color: 'red'}}/>
                                                </TableCell>
                                            }
                                        })
                                    }
                                    <TableCell key={index}>
                                        {/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
                                        {grade.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />


        </Paper>

    </Grid>
}

export default Users;



