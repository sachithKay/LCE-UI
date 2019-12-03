import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import AddComponentButton from "../Common/AddComponentButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = theme => ({
    card: {
        maxWidth: 245,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#bfbfbf',
    },
    avatar: {
        backgroundColor: 'blue'
    },
    cardContent: {
        backgroundColor: '#f5f5f5',
        padding: '5px 5px 5px 5px',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#bfbfbf',
    },
    parentDiv: {
        display: 'flex',
        width: 290,
    },
    cardDiv: {
        width: '80%',
    },
    buttonDiv: {
        flexGrow: '1',
    },
    dialog: {},
    tabsDiv: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        height: 400,
    },
    DialogTitle: {
        padding: 0,
    }
});

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


class Logger extends Component {

    constructor(props) {
        super(props);

        let id = this.props.componentProperties.id ? this.props.componentProperties.id : '';
        let type = this.props.componentProperties.type ? this.props.componentProperties.type : '';
        let message = '';
        let level = '';
        if (this.props.componentProperties.properties) {
            message = this.props.componentProperties.properties.message ? this.props.componentProperties.properties.message : '';
            level = this.props.componentProperties.properties.level ? this.props.componentProperties.properties.level : 'info';
        }

        this.state = {
            open: false,
            tabIndex: 0,
            expanded: 'panel1',
            component: {
                id: id,
                type: type,
                properties: {
                    message: message,
                    level: level,
                },
            },
            key: this.props.key,
            nextComponent: {
                id: '',
                type: '',
            }
        };
    }

    handleClickOpen = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.open = true;
        this.setState(stateCopy);
    };

    handleClose = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.open = false;
        this.setState(stateCopy);
    };

    handleChange = (event, newValue) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.tabIndex = newValue;
        this.setState(stateCopy);
    };

    handleExpansionPanelChange = panel => () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.expanded = panel;
        this.setState(stateCopy);
    };

    addNewComponent = (newComponent) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.nextComponent = newComponent;
        this.setState(stateCopy, () => this.props.addNewComponentHandler(this.state));
    };

    componentChanged = (event) => {
        let target = event.target.name;
        let value = event.target.value;
        // set the new value to state and update the component definition.
        let {component} = this.state;
        if (target === "level") {
            component.properties.level = value;
        } else if (target === "message") {
            component.properties.message = value;
        } else {
            // other props
        }
        this.props.componentChanged(this.state.component.id, component.properties);
        this.setState({component});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.parentDiv}>
                <div className={classes.cardDiv}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={this.handleClickOpen}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>L
                                        {/*{this.state.component.avatar}*/}
                                    </Avatar>
                                }
                                title={'Logger'}
                                subheader={this.state.component.id}
                            />
                        </CardActionArea>
                    </Card>
                </div>
                <div className={classes.buttonDiv}>
                    <AddComponentButton addComponentHandler={this.addNewComponent}/>
                </div>
                <Dialog className={classes.dialog} open={this.state.open} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
                    <DialogTitle id="form-dialog-title" className={classes.DialogTitle}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    L
                                </Avatar>
                            }
                            action={
                                <div>
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <IconButton aria-label="settings" onClick={this.handleClose}>
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            }
                            title={'Logger'}
                            subheader={this.state.component.id}
                        />
                        <AppBar position="static" color={"default"}>
                            <Tabs value={this.state.tabIndex} onChange={this.handleChange}
                                  aria-label="simple tabs example" indicatorColor="primary"
                                  textColor="primary" centered>
                                <Tab label="Configuration" {...a11yProps(0)} />
                                <Tab label="Output" {...a11yProps(1)} />
                                <Tab label="Notes" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.tabsDiv}>
                            <TabPanel value={this.state.tabIndex} index={0}>
                                <FormControl fullWidth className={classes.margin} variant="outlined">
                                    <label>Message</label>
                                    <TextField
                                        id="message"
                                        name="message"
                                        value={this.state.component.properties.message}
                                        onChange={this.componentChanged}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <br/><br/>
                                <FormControl fullWidth className={classes.margin} variant="outlined">
                                    <label>Level</label>
                                    <Select
                                        id="outlined-adornment-amount"
                                        name="level"
                                        value={this.state.component.properties.level}
                                        onChange={this.componentChanged}>
                                        <MenuItem value={'error'}>Error</MenuItem>
                                        <MenuItem value={'warn'}>Warn</MenuItem>
                                        <MenuItem value={'info'}>Info</MenuItem>
                                        <MenuItem value={'debug'}>Debug</MenuItem>
                                        <MenuItem value={'trace'}>Trace</MenuItem>
                                    </Select>
                                </FormControl>
                            </TabPanel>
                            <TabPanel value={this.state.tabIndex} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={this.state.tabIndex} index={2}>
                                Item Three
                            </TabPanel>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

}

export default withStyles(useStyles)(Logger);
