import * as React from 'react';

interface ImageUploaderState {
    // tslint:disable-next-line
    preview: any;
}

export interface ImageUploaderProps {
    file: Blob;
    onChange: (file: Blob) => void;
}

export class ImageUploader extends React.Component<ImageUploaderProps, ImageUploaderState> {
    constructor(props: ImageUploaderProps) {
        super(props);
        this.state = {preview: props.file};
    }

    componentWillReceiveProps() {
        this.loadPreview(this.props.file);
    }

    render() {
        return (
            <label
                className="form form-control"
                style={{height: 120, width: '100%', textAlign: 'center', display: 'table', alignContent: 'center'}}
            >
                <div style={{display: 'table-cell', verticalAlign: 'middle', maxWidth: '100%', maxHeight: '100%'}}>
                    <img
                        src={this.state.preview}
                        alt="click here to upload the photo"
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                    />
                </div>
                <input
                    style={{display: 'none'}}
                    accept=".jpg,.png"
                    type="file"
                    onChange={(evt) => {
                       let files = evt.target.files;
                       if (files && files[0]) {
                           let file = files[0];
                           this.props.onChange(file);
                           this.loadPreview(file);
                       }
                    }}
                />
            </label>
        );
    }

    private loadPreview(file: Blob|null) {
        if (file) {
            const reader = new FileReader();

            // tslint:disable-next-line
            reader.onload = (e: any) => this.setState({preview: e.target.result});

            reader.readAsDataURL(file);
        } else {
            this.setState({preview: null});
        }
    }
}