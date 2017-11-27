import * as React from 'react';
import {Button, Form, FormControl, FormGroup, Glyphicon, InputGroup} from "react-bootstrap";
import {ImageUploader} from "../ImageUploader/ImageUploader";

interface ISignUpFormProps {
    submit: (userPhoto: any,
             position: string,
             firstName: string,
             lastName: string,
             email: string,
             password: string) => void;
}

interface ISignUpFormState{
    userPhoto: any;
    position: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    errorMessages: {[id: string]: string;};
}

export class SignUpForm extends React.Component<ISignUpFormProps, ISignUpFormState> {
    validators: { [id: string] : (newValue: any) => string; } = {};
    handleSubmit(event: any): any {
        if (event) {
            event.preventDefault();
        }

        if (Object.keys(this.state.errorMessages).length === 0){
            console.log("sumbit sign up");
            this.props.submit(this.state.userPhoto, this.state.position, this.state.firstName, this.state.lastName, this.state.email, this.state.password);
        }
        else{
            console.log("validation errors");
            console.log(this.state.errorMessages);
        }
    }

    private constructor(props: any) {
        super(props);
        this.state = {
            userPhoto: null,
            position: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorMessages: {}
        };
        this.validators["position"] = (val: any) => (!val) ? "position is required!" : "";
        this.validators["firstName"] = (val: any) => (!val) ? "firstName is required!" : "";
        this.validators["lastName"] = (val: any) => (!val) ? "lastName is required!" : "";
        this.validators["email"] = (val: any) => {
                if (!val){
                    return "email is required!";
                }

                const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailRegex.test(val)){
                    return "email should have valid format!"
                }

                return "";
            };
        this.validators["password"] = (val: any) => (!val) ? "password is required!" : "";
        this.validators["confirmPassword"] = (val: any) =>  {
           if (val !== this.state.password){
                return "password and confirm password should match!"
            }

            return "";
        };
    }
    validate(fieldName: string, newValue: string){
        const errorMessages = this.state.errorMessages;
        const errorMessage = this.validators[fieldName](newValue);
        if (errorMessage){
            errorMessages[fieldName] = errorMessage;
        }
        else{
            delete errorMessages[fieldName]
        }

        this.setState({errorMessages: errorMessages})
    }
    handleChange(event: any){
        const {name, value} = event.target;
        this.validate(name, value);
        this.setState({[name]: value});
    }
    render() {
        return (<Form style={{marginTop: "10px"}}>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>
                        <Glyphicon glyph="camera"/>
                    </InputGroup.Addon>
                    <ImageUploader file={this.state.userPhoto} onChange={(file: any)=>{this.setState({userPhoto: file})}} />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["position"]?"has-error":""} title={this.state.errorMessages["position"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="briefcase"/>
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder="Position" name="position" value={this.state.position} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["firstName"]?"has-error":""} title={this.state.errorMessages["firstName"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="user"/>
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder="First Name" name="firstName" value={this.state.firstName} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["lastName"]?"has-error":""} title={this.state.errorMessages["lastName"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="user"/>
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["email"]?"has-error":""} title={this.state.errorMessages["email"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="envelope"/>
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder="Work Email" name="email" value={this.state.email} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["password"]?"has-error":""} title={this.state.errorMessages["password"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="lock"/>
                    </InputGroup.Addon>
                    <FormControl type="password" placeholder="Your Password" name="password" value={this.state.password} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["confirmPassword"]?"has-error":""} title={this.state.errorMessages["confirmPassword"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="lock"/>
                    </InputGroup.Addon>
                    <FormControl type="password" placeholder="Confirm Password" name="confirmPassword" onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <hr />
            <FormGroup>
                <InputGroup>
                    <Button bsStyle="primary" onClick={event => this.handleSubmit(event)}>Register<Glyphicon
                        glyph="chevron-right"/></Button>
                </InputGroup>
            </FormGroup>
        </Form>);
    }
}