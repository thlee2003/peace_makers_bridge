import React, { useState } from 'react'

const EncodingBase64 = () => {
    const [selectedFile, setSelectedFile] = useState([])
    const [fileBase64string, setFileBase64string] = useState("")

    const onFileChange = e => {
        setSelectedFile(e.target.files)
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(e.target.files[0].size)
        console.log(e.target.files[0].type)
    }

    const encodeFileBase64 =(file) => {
        var reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var base64 = reader.result
                console.log(base64)
                setFileBase64string(base64)
            }
            reader.onerror = function (error) {
                console.log('error:', error)
            }
        }
    }

    encodeFileBase64(selectedFile[0])

    return (
        <div>
            <input type="file" id="input" onChange={onFileChange} />
            <img src={fileBase64string} alt="" />
        </div>
    )
}

export default EncodingBase64
