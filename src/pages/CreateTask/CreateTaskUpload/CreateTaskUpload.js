import React from "react";
import { message,Button,Tooltip} from 'antd';
import './CreateTaskUpload.scss'
import { DownloadOutlined } from '@ant-design/icons';

export default function CreateTaskUpload({setState}) {

    function checkObj(obj) {
        console.log(obj)
        if(obj.items === undefined){
            message.error('required parameter items')
        }else if(!Array.isArray(obj.items)){
            message.error('items must be an array')
        }else {
            setState(obj)
        }
    }

    function handleFile(file) {
        let reader = new FileReader();
        reader.onload = function(file) {
            let obj = JSON.parse(file.target.result);
            checkObj(obj);
            console.log(obj)
        };
        reader.readAsText(file);
    };

    return (
        <Tooltip title={'Import'}>
            <Button type="primary" shape="circle" size={'large'} icon={<DownloadOutlined  rotate = {180}/>}>
              <input type="file" accept=".json"  className={'upload'} onChange={e => handleFile(e.target.files[0])}/>
            </Button>
        </Tooltip>
    )
}