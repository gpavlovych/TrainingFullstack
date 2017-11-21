import * as React from "react";

interface IImageUploaderState{
    file: any
}

export interface IImageUploaderProps {
    file: any;
    onChange: (file: any)=>void
}

export class ImageUploader extends React.Component<IImageUploaderProps, IImageUploaderState> {
    constructor(props: IImageUploaderProps){
        super(props);
        this.state = {file: props.file};
    }

    private loadPreview(file: Blob|null) {
        if (file) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                console.log("image preview loaded successfully!");
                this.props.onChange(e.target.result);
                this.setState({file: e.target.result});
            };

            reader.readAsDataURL(file);
        }
        else {
            this.setState({file: null});
        }
    }

    render() {
        return <label className="form form-control" style={{height: 120, width: "100%", textAlign: "center", display: "table", alignContent: "center"}}>
                <div style={{display: "table-cell", verticalAlign: "middle", maxWidth: "100%", maxHeight: "100%"}}>
                    <img src={this.state.file}
                         alt="click here to upload the photo"
                         style={{maxWidth: "100%", maxHeight: "100%"}}/>
                </div>
                <input style={{display: "none"}}
                       accept=".jpg,.png"
                       type="file"
                       onChange={(evt: any) => {
                           let files = evt.target.files;
                           if (files && files[0]) {
                               let file = files[0];
                               this.loadPreview(file);
                           }
                       }}
                />
            </label>;
    }
}