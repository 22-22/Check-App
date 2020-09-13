import React, {useState} from "react";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {func} from "prop-types";

export default function CreateTaskUpload() {
    let [uploadState,setUploadState] = useState({
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
        ],
    });
    
    function handleChange(info) {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        setUploadState({ fileList })
    }


    const props = {
        accept:'.md',
        onChange: handleChange,
        multiple: false,
    };
    console.log(uploadState.fileList)
    return (
        <Upload {...props} fileList={uploadState.fileList}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    )
}