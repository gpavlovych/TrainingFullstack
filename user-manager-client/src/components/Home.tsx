import * as React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import UserProfileItem from "./UserProfileItem";
import {TypeKeys} from "../middleware/actions";
import {Grid, Row, Col} from "react-bootstrap";

class Home extends React.Component<any> {
    componentWillMount(){
        this.props.dispatch({type: TypeKeys.GET_USERS_REQUEST_ACTION});
    }
    render() {
        return (
            <div>
                <Header {...this.props}/>
                    <Grid>
                        <Row>
                            {(this.props.data.users||[]).map((user: any) => <Col xs={12} sm={3}> <UserProfileItem {...user}/></Col>)}
                        </Row>
                    </Grid>
            </div>);
    }
}

function select (state: any) {
    return {
        data: state
    }
}

export default connect(select)(Home);