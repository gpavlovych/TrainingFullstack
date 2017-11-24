import * as React from "react";
import {Header} from "./Header";
import {connect, Dispatch} from "react-redux";
import UserProfileItem from "./UserProfileItem";
import {createGetUserRequestAction} from "../middleware/actions";
import {Grid, Row, Col } from "react-bootstrap";
import {RootState} from "../middleware/reducers";

interface IHomeProps {
    currentUserToken: string;
    history?: any;
    users: any[];
    onLoad: (token: string)=>any;
}

class Home extends React.Component<IHomeProps> {
    componentWillMount(){
        this.props.onLoad(this.props.currentUserToken);
    }
    render() {
        let users = this.props.users || [];
        return (
            <div>
                <Header {...this.props} />
                <Grid>
                    <Row>
                        {users.map((user: any) => <Col xs={12} sm={3} key={user._id} > <UserProfileItem {...user}/></Col>)}
                    </Row>
                </Grid>
            </div>);
    }
}

const mapStateToProps = (state: RootState) => ({
    currentUserToken: state.currentUserToken,
    users: state.users
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
   onLoad: (token: string)=>dispatch(createGetUserRequestAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);