import * as React from 'react';
import {Button, Form, FormControl, FormGroup, Glyphicon, InputGroup} from "react-bootstrap";

interface ISignInFormProps {
    submit: (email: string,
             password: string) => void;
}

interface ISignInFormState{
    email: string;
    password: string;
    errorMessages: {[id: string]: string;};
}

export class SignInForm extends React.Component<ISignInFormProps, ISignInFormState> {
    validators: { [id: string] : (newValue: any) => string; } = {};
    handleSubmit(event: any): any {
        if (event) {
            event.preventDefault();
        }

        if (Object.keys(this.state.errorMessages).length === 0){
            console.log("sumbit sign in");
            this.props.submit(this.state.email, this.state.password);
        }
        else{
            console.log("validation errors");
            console.log(this.state.errorMessages);
        }
    }

    private constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessages: {}
        };
        this.validators["email"] = (val: any) => {
            if (!val){
                return "email is required!";
            }

            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(val)){
                return "email should have valid format!"
            }

            return "";
        };
        this.validators["password"] = (val: any) => (!val) ? "password is required!" : "";
    }
    validate(fieldName: string, newValue: string){
        let errorMessages = this.state.errorMessages;
        let errorMessage = this.validators[fieldName](newValue);
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
    render(){
        return (<Form style={{marginTop: "10px"}}>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["email"]?"has-error":""} title={this.state.errorMessages["email"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="envelope" />
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder="Work Email" name="email" value={this.state.email} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup className={this.state.errorMessages["password"]?"has-error":""} title={this.state.errorMessages["password"]} >
                    <InputGroup.Addon>
                        <Glyphicon glyph="lock" />
                    </InputGroup.Addon>
                    <FormControl type="password" placeholder="Your Password" name="password" value={this.state.password} onChange={e=>this.handleChange(e)}/>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <FormControl.Static>
                    Don't remember your password?
                </FormControl.Static>
            </FormGroup>
            <hr />
            <FormGroup>
                <InputGroup>
                    <Button bsStyle="primary" onClick={event => this.handleSubmit(event)}>Login<Glyphicon
                        glyph="chevron-right" /></Button>
                </InputGroup>
            </FormGroup>
        </Form>);
    }
}