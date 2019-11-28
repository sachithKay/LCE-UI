import React, {Component} from 'react';
import ParentView from '../Common/ParentView';
import HttpListener from '../Project-Components/HttpListener';
import ResourceApi from '../API/ResourceAPI';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    componentCanvas: {
        display: 'flex',
    }
});

class DesignerPager extends Component {

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

    // This method will handle all changes made to component
    // id: unique id of the component
    // def: new json definition of the component
    componentChanged(id, def) {
    console.log("change triggred");
    // edit the flow configuration and update the backend

    }


    // This method will render the flow based on the json configuration
    renderFlow() {
        const {classes} = this.props;
        const flow = this.state.flow;
        const components = flow.components;
        if (components) {
            console.log(components);
            return (<div id={"component-canvas"} className={classes.componentCanvas}>
                {
                    components.map((component, index) => {
                        console.log(component);
                        if (component.type === "http-listener") {
                            return <HttpListener componentProperties={component} onChange={this.componentChanged}/>;
                        } else if (component.type === "logger") {
                            return <HttpListener componentProperties={{avatar: 'L', name: 'logger'}}/>;
                        } else if (component.type === "file-writer") {
                            return <HttpListener componentProperties={{avatar: 'L', name: 'writer'}}/>;
                        }

                    })
                }
            </div>);

        }
    }
}

export default withStyles(useStyles)(DesignerPager);

