import { Grid, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'

const FileUploader = () => {
    const [file,setFile] = useState<File | undefined>();
    const [error,setError] = useState<string>("");
    const [fileType,setFileType] = useState<"pdf" | "doc" | undefined>()
    const [fileName,setFileName] = useState<string>("")
    const [isUploaded,setIsUploaded] = useState<boolean>(false)
    const [isButtonEnabled,setIsButtonEnabled] = useState<boolean>(false)

    const saveFile = (e:ChangeEvent<HTMLInputElement>) =>{
        const selectedFile  = e.target.files?.[0]
        if(!selectedFile){
            return;
        }
        let nameString:string[] = selectedFile.name.split('.');
        let type = nameString[nameString.length-1]
        if(type === "pdf" || type === "doc"){ 
            if(selectedFile.size >= 10*1024*1024){ // checking file size
                setIsButtonEnabled(false)
                setError("File Size should not exceed 10mB")
                setFile(undefined)
                setFileName("")
                setFileType(undefined)
            }else{
                setFile(selectedFile)
                setFileName(selectedFile.name)
                setFileType(type)
                setError("")
                setIsButtonEnabled(true)
            }
        }else{
            setIsButtonEnabled(false)
            setFile(undefined)
            setFileName("")
            setFileType(undefined)
            setError("File type is not pdf or doc!")
        }
        setIsUploaded(false)
    }

    const uploadFile = async(e:React.MouseEvent<HTMLButtonElement>) => {
        setIsUploaded(true);   
    }
  return (
    <Grid>
        {error && <Typography color={'error'}>{error}</Typography>}
        <input type={"file"} onChange={saveFile} placeholder="Add file Here"/>
        <button onClick={uploadFile} disabled={!isButtonEnabled}>Upload</button>
        {fileName && isUploaded && 
        <Grid>
            <Typography color={fileType==="pdf"? 'red': 'blue'}>{fileName}</Typography>  
        </Grid>}
    </Grid>
  )
}

export default FileUploader;