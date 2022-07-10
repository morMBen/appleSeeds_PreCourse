import React from 'react';
import axios from "axios";


const Assignments = () => {
    const [file, setFile] = React.useState(null);

    const fileHandler = (event) => {
        setFile(event.target.files[0])
    }

    const fileUpload = () => {
        // console.log("file.selectedFile :",file,file.name);
        const fd = new FormData();
        fd.append('image', file, file.name);
        axios.post('http://localhost:8080/api/admin/uploadAssignment', fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }).then((req) => {
            console.log("req :", req);
        })
    }

    const handleUploadImage = (ev) => {
        ev.preventDefault();

        // console.log("this.uploadInput :",this.uploadInput)
        const data = new FormData();
        data.append('file', file,file.name);
        const config = {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        };

        axios.post('http://localhost:8080/api/admin/uploadAssignment', data,config)
            .then((req) => {
            console.log("req :", req);
        })

    }

    return (
        <form onSubmit={handleUploadImage}>
            <div>
                <input type="file" name={'file'} onChange={fileHandler}/>
            </div>
            <div>
                <input type="text" placeholder="Enter the desired name of file"/>
            </div>
            <br/>
            <div>
                <button>Upload</button>
            </div>
            {/*<img src={this.state.imageURL} alt="img"/>*/}
        </form>
    )
}
export default Assignments;
