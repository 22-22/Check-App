import React from "react";

export default function CreateTaskUpload() {

    function handleFile(file) {
        let reader = new FileReader();
        reader.onload = function(file) {
          // The file's text will be printed in console
          console.log(file.target.result)
        };
        reader.readAsText(file);
    };

    return <input type="file" accept=".json" onChange={e => handleFile(e.target.files[0])}></input>
}
