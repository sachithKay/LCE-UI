import React, {Component} from "react";
import ParentComponent from './ParentComponent';


export default class HttpListener extends Component {

    constructor(props) {
        super(props);
        this.state = {
            component: this.props.componentProperties
        };
    }

    render() {
        return (
            <ParentComponent avatar={this.state.component.avatar} title={'HTTP Listener'} subheader={this.state.component.name}/>
        );
    }

}