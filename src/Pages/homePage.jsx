import React, {Component} from 'react';
import ParentView from '../Common/ParentView';
import HttpListener from '../Project-Components/HttpListener';
import Form from "react-jsonschema-form";


const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Title", default: "A new task"},
        done: {type: "boolean", title: "Done?", default: false}
    }
};

export default class homePage extends Component {

    render() {
        return (<ParentView canvas={this.renderCanvas()}/>);
    }

    renderCanvas() {
        return(
            <HttpListener componentProperties={{avatar: 'L', name:'Mocky'}}/>
        );
    }
    renderFormFromSchema() {
        return (<Form schema={schema}
                      onChange={log("changed")}
                      onSubmit={log("submitted")}
                      onError={log("errors")}/>);
    }
}

const log = (type) => console.log.bind(console, type);