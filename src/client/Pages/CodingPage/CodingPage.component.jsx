/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import 'antd/dist/antd.css';
import {Tabs} from 'antd';
import axios from 'axios';
import './CodingPage.styles.css';
import Loader from '../../components/Loader/Loader.component'
import Question from '../../components/Question/Question.component';
import {getUserAnswers} from "../../DAL/Coding.DAL";
import TrafficLight from "../../components/TrafficLightLed/TrafficLight.componnent";
import Navbar from '../../components/NavBar/Navbar.component';
import Footer from '../../components/Footer/Footer.component';
import Assignments from "../../components/Assignments/Assignments.component";

const CodingPage = () => {
        const [mode] = React.useState('left');
        const [currentState, setCurrentState] = React.useState(null);
        const {TabPane} = Tabs;

        const loadData = () => {
            getUserAnswers().then((req) => {
                if (req.status === 200) {
                    setCurrentState(req.data.sort(function (a, b) {
                        return a.questionID - b.questionID
                    }));

                    console.log(req.data.sort(function (a, b) {
                        return a.questionID - b.questionID
                    }))
                    // setCurrentState(req.data.filter(q=>q.questionID === 11).sort(function (a, b) {
                    //     return a.questionID - b.questionID
                    // }));
                }
            })
        }

        React.useEffect(() => {
            loadData();
        }, []);

        const setTraffic = (data) => {
            let oldState = [...currentState];
            let index = oldState.findIndex(x => x._id === data.questionId);

            if (index > -1) {
                let item = {...currentState[index]}

                if (item.answer) {
                    item.answer.trafficLight = data.traffic;
                    oldState[index] = item;
                    setCurrentState(oldState);
                } else {
                    item.answer =
                        {
                            trafficLight: data.traffic,
                            lastCodeAnswer: data.lastCodeAnswer,
                            testsPassed: 2,
                            questionId: data.questionID,
                        }
                    oldState[index] = item;
                    setCurrentState(oldState);
                }
            }
        }

        return (
            <div>
                <Navbar/>
                <div className="mobile-message">please enter the site with larger screen (not mobile phone)</div>
                {currentState ? (
                    <Tabs defaultActiveKey="1" tabPosition={mode}
                        style={{height: 'max-content', marginTop: '5px', background: '#303133', color: 'white'}}>
                        {currentState.map((q) => {
                                if (q.questionType !== "assignments") {
                                    return <TabPane tab={<TrafficLight status={q.answer ? q.answer.trafficLight : 0}
                                                                    text={`Q-${q.questionID + 1}`}/>} key={q._id}>
                                        <Question setTraffic={setTraffic} data={q}/>
                                    </TabPane>
                                } else {
                                    return <TabPane tab={<TrafficLight status={q.answer ? q.answer.trafficLight : 0}
                                                                    text={`Task-${q.questionID - 10}`}/>} key={q._id}>
                                        <Assignments setTraffic={setTraffic} assignment={q}/>
                                    </TabPane>
                                }

                            }
                        )}
                    </Tabs>
                ) : <div><Loader/></div>}

                <Footer/>
            </div>
        );
    }
;

export default CodingPage;
