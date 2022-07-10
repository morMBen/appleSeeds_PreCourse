/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import CodeEditor from '../CodeEditor/CodeEditor.component';
import QuestionDescription from '../QuestionDescription/QuestionDescription.component';
import './Question.styles.css';

const Question = ({data,setTraffic}) => {
    const [q, setQ] = React.useState(data);

    React.useEffect(() => {
        if (data && data.answer) {
            let obj = {
                firstCode: data.answer.lastCodeAnswer,
                parameters: data.parameters,
                question: data.question,
                questionID: data._id,
                tests: data.tests,
                _id: data._id
            }
            setQ(obj);
        } else {
            setQ(data);
        }
    }, [data]);

    return (
        <div>
            <QuestionDescription question={q.question} id={q._id}/>
            <CodeEditor
                setTraffic={setTraffic}
                originalFirstCode={data.firstCode}
                firstCode={q.firstCode}
                tests={q.tests}
                parameters={q.parameters}
                questionID={q._id}
            />
        </div>
    );
};

export default Question;
