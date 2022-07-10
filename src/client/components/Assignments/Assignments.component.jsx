import React from 'react';
import Editor from '@monaco-editor/react';
import {Paper} from "@material-ui/core";
import QuestionDescription from "../QuestionDescription/QuestionDescription.component";
import CodeEditor from "../CodeEditor/CodeEditor.component";
import {addAnswer} from "../../DAL/Coding.DAL";

const Assignments = ({assignment,setTraffic}) => {
    const editorRef = React.useRef(null);

    React.useEffect(() => {
        console.log("assignment :",assignment);
        // console.log(__dirname)
    }, [])

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const assignmentHandler = () => {
        let convertingCode = editorRef.current.getValue()
        addAnswer({
            questionId: assignment._id,
            lastCodeAnswer: editorRef.current.getValue(),
            testsPassed: 0,
            totalTests: 0
        }).then((req) => {
            if (req.status === 200) {
                setTraffic({
                    questionId: assignment._id,
                    traffic: 2,
                    lastCodeAnswer: editorRef.current.getValue(),
                    testsPassed: 0,
                    totalTests: 0,
                    questionID: assignment._id
                })
            }
        });
    }

    return (
        <div>

            <a style={{textAlign: "center",fontSize:'30px',color:'red'}} href={require(`../../../server/files/${assignment.questionID}.pdf`)} target="_blank">Click Here To Open Instruction Pdf</a>
            <Editor
                value={assignment.answer ? assignment.answer.lastCodeAnswer : assignment.firstCode}
                theme="vs-dark"
                height="60vh"
                width="80vw"
                defaultLanguage="javascript"
                onMount={handleEditorDidMount}
                options={{
                    fontSize: "18px",
                    modules: true,
                }}
            />

            <button className="btn btn-2 btn-2g" onClick={assignmentHandler}>Send To Test</button>
        </div>
    )
}

export default Assignments;
