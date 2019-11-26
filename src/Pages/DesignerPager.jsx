import React, {Component} from 'react';
import ParentView from '../Common/ParentView';
import HttpListener from '../Project-Components/HttpListener';

export default class designerPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configuration: {}
        };
    }

    // Get flow configuration from the backend and initialize the state here
    componentDidMount() {
        this.setState({
            configuration: {
                flow: {
                    name: "sample1",
                    id: "01",
                    components: [
                        {
                            type: "http-listener",
                            id: "http-list-01",
                            properties: {
                                method: "get",
                                port: 8000,
                                path: "http://localhost"
                            }
                        },
                        {
                            type: "logger",
                            id: "logger-01",
                            properties: {
                                level: "info"
                            }
                        },
                        {
                            type: "file-writer",
                            id: "file-write-01",
                            properties: {
                                location: "xx",
                                username: "sachith",
                                password: "",
                                filename: "hello.txt"
                            }
                        }
                    ]
                }
            }

        });
    }

    render() {
        return (<ParentView canvas={this.renderFlow()}/>);
    }


    // This method will render the flow based on the json configuration
    renderFlow() {


        return (
            <HttpListener componentProperties={{avatar: 'L', name: 'Mocky'}}/>
        );
    }
}
