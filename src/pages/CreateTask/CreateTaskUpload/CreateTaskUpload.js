import React from "react";
import { message,Button,Tooltip} from 'antd';
import './CreateTaskUpload.scss'
import { DownloadOutlined } from '@ant-design/icons';
const md2json = require('md-2-json')

export default function CreateTaskUpload({setState,state}) {

    function convertToStandart(obj) {
        let result = {
            ...state,
            items:[]
        };
        let count = -1;
        obj.criteria.forEach((e) => {
            if(e.type === 'title'){
                result.items.push({
                    category: e.title,
                    categoryItems:[],
                })
                count += 1
            }else if(e.type === "subtask" || e.type === "penalty"){
                result.items[count].categoryItems.push({
                    description: e.text,
                    minScore: e.max > 0 ? 0 : e.max,
                    maxScore: e.max > 0 ? e.max : 0,
                    checkByMentorOnly: false,
                })
            }
        })
        setState(result)
    }

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
            console.log(file)
            console.log(file.target.result)
            let obj = JSON.parse(file.target.result);
           // let a = String(file.target.result)
           //      .split('**')
           //      .filter((e) => e.length > 10)
           //      .map((e) => e.split('*').filter((e) => e.length > 8).map((el) => {
           //         let [desc, score] =  el.split('+')
           //          return [desc, (score)]
           //      }))
           // console.log(a)
            if (obj.taskName !== undefined){ convertToStandart(obj) }else{  checkObj(obj)}

        };
        reader.readAsText(file);
    };

    return (
        <Tooltip title={'Import'}>
            <Button type="primary" shape="circle" size={'large'} style={{position:"relative"}} icon={<DownloadOutlined  rotate = {180}/>}>
              <input type="file" accept=".json,.md"  className={'upload'} onChange={e => handleFile(e.target.files[0])}/>
            </Button>
        </Tooltip>
    )
}