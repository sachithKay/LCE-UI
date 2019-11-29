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
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddComponentButton from "../Common/AddComponentButton";

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
});

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

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

        this.state = {
            open: false,
            tabIndex: 0,
            expanded: 'panel1',
            component: {
                id: id,
                type: type,
            },
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
        this.setState(stateCopy, () => console.log(this.state));
    };

    addNewComponent = (newComponent) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.nextComponent = newComponent;
        this.setState(stateCopy, () => this.props.addNewComponentHandler(this.state));
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
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon/>
                                //     </IconButton>
                                // }
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
                    <DialogTitle id="form-dialog-title">
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {this.state.component.avatar}
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
                            title={'HTTP Listener'}
                            subheader={this.state.component.id}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.tabsDiv}>
                            <AppBar position="static" color={"default"}>
                                <Tabs value={this.state.tabIndex} onChange={this.handleChange}
                                      aria-label="simple tabs example" indicatorColor="primary"
                                      textColor="primary" centered>
                                    <Tab label="Configuration" {...a11yProps(0)} />
                                    <Tab label="Output" {...a11yProps(1)} />
                                    <Tab label="Notes" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.tabIndex} index={0}>
                                <ExpansionPanel square expanded={this.state.expanded === 'panel1'}
                                                onChange={this.handleExpansionPanelChange('panel1')}>
                                    <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Typography>General</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <FormControl fullWidth className={classes.margin} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-amount">Path (Required)</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={this.state.component.properties}
                                                // onChange={handleChange('amount')}
                                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                                labelWidth={120}
                                            />
                                        </FormControl>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel square expanded={this.state.expanded === 'panel2'}
                                                onChange={this.handleExpansionPanelChange('panel2')}>
                                    <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                                        <Typography>Redelivery</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex,
                                            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                                            adipiscing
                                            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel square expanded={this.state.expanded === 'panel3'}
                                                onChange={this.handleExpansionPanelChange('panel3')}>
                                    <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                                        <Typography>Response</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex,
                                            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                                            adipiscing
                                            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel square expanded={this.state.expanded === 'panel4'}
                                                onChange={this.handleExpansionPanelChange('panel4')}>
                                    <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
                                        <Typography>Advanced</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            malesuada lacus ex,
                                            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                                            adipiscing
                                            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
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
