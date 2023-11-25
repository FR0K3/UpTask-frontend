import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import useProject from '../hooks/useProject'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '40px',
    paddingBottom: '40px',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#8a8888',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#8a8888',
    outline: 'none',
    transition: 'border .3s ease-in-out'
};

const focusedStyle = {
    borderColor: '#0ea5e9'
};

const acceptStyle = {
    borderColor: '#16a34a'
};

const rejectStyle = {
    borderColor: '#dc2626'
};

const Dropzone = () => {
    const { handleProjectImport } = useProject();
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => toast.error("File reading was aborted");
            reader.onerror = () => toast.error("File reading has failed");
            reader.onload = () => {
                const content = reader.result;
                handleProjectImport(JSON.parse(content));
            };

            reader.readAsText(file)
        });
    }, []);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: { 'application/json': [] }, maxFiles: 1, onDrop });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);



    const acceptedFile = acceptedFiles.map(file => (
        <div className="flex items-center gap-3 mt-4 text-gray-500" key={file.path}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#777777" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M12 11v6" />
                <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
            </svg>
            {file.path} - {file.size} bytes
        </div>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop a JSON file here, or click to search the file</p>
            </div>
            {acceptedFile}
        </section>
    )
}

export default Dropzone