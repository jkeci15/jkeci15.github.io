
const FileUploader = (props) => {

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file.size > 1000000)
            props.onFileSelectError({ error: "File size cannot exceed more than 4MB" });
        else props.onFileSelectSuccess(file);
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} />
            {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary">Verify upload</button> */}
        </div>
    )
}
export default FileUploader
