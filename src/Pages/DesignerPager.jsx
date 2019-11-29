import React, {Component} from 'react';
import ParentView from '../Common/ParentView';
import HttpListener from '../Project-Components/HttpListener';
import ResourceApi from '../API/ResourceAPI';
import withStyles from "@material-ui/core/styles/withStyles";
import Logger from "../Project-Components/Logger";

const useStyles = theme => ({
    componentCanvas: {
        display: 'flex',
    }
});

class DesignerPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flow: {
                components: [],
            }
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

    addNewComponent = (component) => {
        if (component !== null || component !== undefined) {
            const currentComp = component.component;
            const nextComp = component.nextComponent;
            let arr = this.state.flow.components;
            console.log(arr);
            let stateCopy = JSON.parse(JSON.stringify(this.state.flow));
            console.log(stateCopy);

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === currentComp.id) {
                    arr.splice(i + 1, 0, nextComp);
                    stateCopy.components = arr;
                    break;
                }
            }
            console.log(stateCopy);
            this.setState({flow:stateCopy}, () => console.log(this.state.flow.components));
        }
    };

    render() {
        return (<ParentView canvas={this.renderFlow()}/>);
    }

    // This method will render the flow based on the json configuration
    renderFlow() {
        const {classes} = this.props;
        if (this.state.flow.components) {
            return (<div id={"component-canvas"} className={classes.componentCanvas}>
                {
                    this.state.flow.components.map((component, index) => {
                        console.log(component);
                        if (component.type === "http-listener") {
                            return <HttpListener key={index} componentProperties={component}
                                                 addNewComponentHandler={this.addNewComponent}/>;
                        } else if (component.type === "logger") {
                            return <Logger key={index} componentProperties={component}
                                           addNewComponentHandler={this.addNewComponent}/>;
                        } else if (component.type === "file-writer") {
                            // return <HttpListener componentProperties={{avatar: 'L', name: 'writer'}}/>;
                        }

                    })
                }
            </div>);

        }
    }
}

export default withStyles(useStyles)(DesignerPager);

