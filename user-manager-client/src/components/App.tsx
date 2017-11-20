import * as React from 'react';
import './App.css';
import {Header} from "./Header";
import {connect} from "react-redux";

class App extends React.Component<any> {
    render() {
        return (
                <div className="App">
                    <Header  data={this.props.data}
                             history={this.props.history}
                             dispatch={this.props.dispatch}
                             location={this.props.location} />
                    {this.props.children}
                </div>
        );
    }
}
function select(state: any){
    console.log(state);
    return {data: state};
}
export default connect(select)(App)