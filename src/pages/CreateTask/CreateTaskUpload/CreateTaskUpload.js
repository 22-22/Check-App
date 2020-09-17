import React from "react";
import { message} from 'antd';
export default function CreateTaskUpload({setState}) {

    function checkObj(obj) {
        console.log(obj)
        if(obj.items === undefined){
            message.error('обязательный парамет items')
        }else if(!Array.isArray(obj.items)){
            message.error('items должен быть массивом')
        }else {
            setState(obj)
        }
    }

    function handleFile(file) {
        let reader = new FileReader();
        reader.onload = function(file) {
            // The file's text will be printed in console
            let obj = JSON.parse(file.target.result);
            checkObj(obj);
            console.log(obj)
            // localStorage.setItem('file',file.target.result)
        };
        reader.readAsText(file);
    };

    return (<input type="file" accept=".json" onChange={e => handleFile(e.target.files[0])} />)
}