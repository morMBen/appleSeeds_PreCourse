import React from 'react';
import {Paper, Tab, Tabs, withStyles} from "@material-ui/core";
import {addGrade, getAllUsers, getUserTask} from "../../../DAL/Admin/CodeReview.DAL";
import Editor from '@monaco-editor/react';


const CodeReview = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [lastCode, setLastCode] = React.useState('');
    const [grade, setGrade] = React.useState(0);

    React.useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res.data);
            // console.log("res.data :", res.data)
        })
    }, [])

    React.useEffect(() => {
        if (users.length > 0) {
            getUserTask(users[activeTab]._id)
                .then((res) => {
                    if (res.data) {
                        console.log(" res.data : ", res.data)
                        let assignment = res.data.filter((a) => {
                            return a.questionType === "assignments"
                        })
                        if (assignment.length > 0 && assignment[0].answer) {
                            setLastCode(assignment[0].answer.lastCodeAnswer)
                            if (assignment[0].answer.grade) {
                                setGrade(assignment[0].answer.grade)
                            } else {
                                setGrade(0)
                            }
                        } else {
                            setLastCode('not finish')
                            setGrade(0)

                        }
                    }
                })
        }

    }, [activeTab])

    const tabHandler = (_, active) => {
        // console.log("tab :", active)
        console.log("users[active] :", users[active])
        setActiveTab(active);
    }

    const gradeHandler = () => {
        addGrade(users[activeTab]._id, grade)
            .then((res) => {
                if (res.status !== 200) {
                    //set error
                }
            })
    }


    return (
        <Paper style={{display: 'flex'}}>
            <VerticalTabs
                value={activeTab}
                onChange={tabHandler}
            >
                {
                    users.map((user) => {
                        return <MyTab key={user._id} label={user.firstName}/>
                    })
                }
            </VerticalTabs>
            {activeTab !== -1 && users.length !== 0 && <TabContainer>
                first name : {users[activeTab].firstName}<br/>
                last name : {users[activeTab].lastName}<br/>
                <Editor
                    value={lastCode}
                    theme="vs-dark"
                    height="50vh"
                    width="50vw"
                    defaultLanguage="javascript"
                    // onMount={handleEditorDidMount}

                    options={{
                        readOnly: true,
                        fontSize: "18px",
                        modules: true,
                    }}
                />
                grade : <input type={'number'} value={grade} onChange={(e) => {
                setGrade(e.target.value)
            }} name={'grade'}/>
                <input onClick={gradeHandler} type={'button'} value={'submit'}/>

            </TabContainer>}

        </Paper>
    )
}

const VerticalTabs = withStyles(theme => ({
    flexContainer: {
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'scroll'
    },
    indicator: {
        display: 'none',
    }
}))(Tabs)

const MyTab = withStyles(theme => ({
    selected: {
        color: 'tomato',
        borderBottom: '2px solid tomato'
    }
}))(Tab);

function TabContainer(props) {
    return (
        <Paper style={{padding: 15, width: '100vw'}}>
            {props.children}
        </Paper>
    );
}

export default CodeReview;
