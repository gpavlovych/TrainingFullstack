import * as React from 'react';
import { Button, Form, FormControl, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';

interface SignInFormProps {
    submit: (email: string,
             password: string) => void;
}

interface SignInFormState {
    email: string;
    password: string;
    errorMessages: { [id: string]: string; };
}

export class SignInForm extends React.Component<SignInFormProps, SignInFormState> {
    validators: { [id: string]: (newValue: string) => string; } = {};

    constructor (props: SignInFormProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessages: {}
        };
        this.validators.email = (val: string) => {
            if (!val) {
                return 'email is required!';
            }

            // tslint:disable-next-line
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(val)) {
                return 'email should have valid format!';
            }

            return '';
        };
        this.validators.password = (val: string) => (!val) ? 'password is required!' : '';
    }

    validate(fieldName: string, newValue: string) {
        const errorMessages = this.state.errorMessages;
        const errorMessage = this.validators[fieldName](newValue);
        if (errorMessage) {
            errorMessages[fieldName] = errorMessage;
        } else {
            delete errorMessages[fieldName];
        }

        this.setState({errorMessages: errorMessages});
    }

    // tslint:disable-next-line
    handleSubmit(event: any) {
        if (event) {
            event.preventDefault();
        }

        if (Object.keys(this.state.errorMessages).length === 0) {
            this.props.submit(this.state.email, this.state.password);
        }
    }

    // tslint:disable-next-line
    handleChange(event: any) {
        const {name, value} = event.target;
        this.validate(name, value);
        this.setState({[name]: value});
    }

    render() {
        return (
            <Form style={{marginTop: '10px'}} >
                <FormGroup>
                    <InputGroup
                        className={this.state.errorMessages.email ? 'has-error' : ''}
                        title={this.state.errorMessages.email}
                    >
                        <InputGroup.Addon>
                            <Glyphicon glyph="envelope" />
                        </InputGroup.Addon>
                        <FormControl
                            type="text"
                            placeholder="Work Email"
                            name="email"
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup
                        className={this.state.errorMessages.password ? 'has-error' : ''}
                        title={this.state.errorMessages.password}
                    >
                        <InputGroup.Addon>
                            <Glyphicon glyph="lock" />
                        </InputGroup.Addon>
                        <FormControl
                            type="password"
                            placeholder="Your Password"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                        />
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
                        <Button bsStyle="primary" onClick={event => this.handleSubmit(event)}>
                            Login
                            <Glyphicon glyph="chevron-right" />
                        </Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
}