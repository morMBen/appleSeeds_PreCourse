/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable no-new-func */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable prefer-spread */
/* eslint-disable react/prop-types */
import React, {useRef, useState} from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.styles.css';
import AlertComponent from "../Alert/Alert.component";
import {addAnswer} from "../../DAL/Coding.DAL";


const CodeEditor = ({firstCode, tests, questionID, parameters, originalFirstCode, setTraffic}) => {
    const editorRef = useRef(null);
    const [errors, setErrors] = useState([]);


    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const checkTest = (index, value, result, func) => {
        const testParams = Object.values(value).map(k => k);

        if (func.apply(null, testParams) === result) {
            return {
                type: "success",
                text: `test ${index} success with value : ${JSON.stringify(value)}`
            };

        } else {
            return {
                type: "error",
                text: `test ${index} failed with value : ${JSON.stringify(value)}`
            };
        }
    };

    const getLastIndexOfMainFunction = () => {
        let originalCode = editorRef.current.getValue();
        let getLastIndex = 1;
        let index = -1;
        for (let i = originalCode.indexOf('{') + 1; i < originalCode.length; i++) {
            if (originalCode[i] === '{') {
                getLastIndex++;
            } else if (originalCode[i] === '}') {
                getLastIndex--;
            }

            if (getLastIndex === 0 && index === -1) {
                index = i;
            }
        }
        return index;
    };

    const testFunction = async () => {
        try {
            let lastIndex = getLastIndexOfMainFunction();
            let convertingCode = editorRef.current.getValue().slice(0, lastIndex + 1);
            let allFunction = editorRef.current.getValue().slice(lastIndex + 2, editorRef.current.getValue().length);
            let finish = `${convertingCode.slice(0, convertingCode.indexOf('{') + 1) + allFunction}\n${convertingCode.slice(convertingCode.indexOf('{') + 2)}`;
            let codeForTest = finish.slice(finish.indexOf('{') + 1, finish.lastIndexOf('}') - 1);

            const testCode = new Function(
                `${parameters}`,
                codeForTest
            );


            let results = tests.map((test, i) => {
                    return checkTest(i + 1, test.value, test.result, testCode)
                }
            )

            let success = results.reduce((a, b) => a + (b.type === "success"), 0);
            let traffic = success === results.length ? 2 : 1;

            addAnswer({
                questionId: questionID,
                lastCodeAnswer: editorRef.current.getValue(),
                testsPassed: success,
                totalTests: results.length
            }).then((req) => {
                if (req.status === 200) {
                    setTraffic({
                        questionId: questionID,
                        traffic: traffic,
                        lastCodeAnswer: editorRef.current.getValue(),
                        testsPassed: success,
                        totalTests: results.length,
                        questionID: questionID
                    })
                }
            });

            setErrors(results);
        } catch (e) {

            setErrors([{
                type: "error",
                text: e.message
            }])

            console.log('oh noooo', e.message);
        }
    };

    return (
        <>
            <div className="editor-container">
                <div className="editor-container-left">
                    <Editor
                        value={firstCode}
                        theme="vs-dark"
                        height="50vh"
                        width="50vw"
                        defaultLanguage="javascript"
                        onMount={handleEditorDidMount}
                        options={{
                            fontSize: "18px",
                            modules: true,
                        }}
                    />
                    <button className="btn btn-2 btn-2g" onClick={testFunction}>RUN TESTS 💻</button>
                </div>
                <div className="editor-container-right">
                    <div className="test-results">
                        <p className="test-result-title"> Test Results: </p>
                        <div className="error"><AlertComponent items={errors}/></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CodeEditor;
