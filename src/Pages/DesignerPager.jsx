import React, {Component} from 'react';
import ParentView from '../Common/ParentView';
import HttpListener from '../Project-Components/HttpListener';
import ResourceApi from '../API/ResourceAPI';

export default class designerPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flow: {}
        };
    }

    // Get flow configuration from the backend and initialize the state here
    componentDidMount() {
        new ResourceApi().getflow().then((response) => {
            this.setState({flow: response.data});
        }).catch(error => {
            // Handler errors here
        });
    }

    render() {
        return (<ParentView canvas={this.renderFlow()}/>);
    }


    // This method will render the flow based on the json configuration
    renderFlow() {
        const flow = this.state.flow;
        const components = flow.components;
        if (components != undefined) {
            console.log(components);
            return (<div id={"component-canvas"}>
                {
                    components.map((component, index) => {
                    console.log(component);
                       return <HttpListener componentProperties={{avatar: 'L', name: 'Mocky'}}/>;
                })
                }
            </div>);

        }
    }
}
