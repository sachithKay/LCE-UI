import IconButton from "@material-ui/core/IconButton";
import ForwardArrowIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = theme => ({
    cardHeader: {
        fontSize: 16,
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});


class AddComponentButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            componentsList: [
                {code: 'logger', label: 'Logger'},
                {code: 'http-listener', label: 'HTTP Listener'},
            ],
            dialogOpen: false,
            component: {
                id: '',
                type: '',
            }
        };
    }

    toggleHover = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.isHovered = !stateCopy.isHovered;
        this.setState(stateCopy);
    };

    handleClickOpen = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.dialogOpen = true;
        this.setState(stateCopy);
    };

    handleClose = () => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.dialogOpen = false;
        this.setState(stateCopy);
    };

    handleNameInput = (event) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.component.id = event.target.value;
        this.setState(stateCopy);
    };

    handleComponentSelect = (event, value) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        if (value !== null || value !== undefined) {
            stateCopy.component.type = value.code;
        }
        this.setState(stateCopy);
    };

    handleSubmit = (event) => {
        if (this.state.component.id !== '' && this.state.component.type !== '') {
            this.props.addComponentHandler(this.state.component);
            event.preventDefault();
            this.handleClose();
        } else if (this.state.component.id === '') {
            alert('Component id should not be empty!');
        } else {
            alert('You should select a component to proceed!');
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    {this.state.isHovered ?
                        <IconButton aria-label="settings" size="small" color="primary" onClick={this.handleClickOpen}>
                            <AddIcon/>
                        </IconButton> :
                        <IconButton aria-label="settings" size="small">
                            <ForwardArrowIcon/>
                        </IconButton>
                    }
                </div>
                <Dialog open={this.state.dialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title"
                        maxWidth={'sm'} fullWidth={true}>
                    <DialogTitle id="form-dialog-title">
                        <CardHeader className={classes.cardHeader}
                                    action={
                                        <div>
                                            <IconButton aria-label="settings" onClick={this.handleClose}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>
                                    }
                                    title={'Select Component'}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth={true} className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Name (Required)</InputLabel>
                            <OutlinedInput
                                id="component-name"
                                value={this.state.component.id}
                                onChange={this.handleNameInput}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={122}
                            />
                        </FormControl>
                        <br/><br/>
                        <Autocomplete
                            id="component-select"
                            fullWidth={true}
                            options={this.state.componentsList}
                            classes={{
                                option: classes.option,
                            }}
                            autoHighlight
                            getOptionLabel={option => option.label}
                            renderOption={option => (
                                <React.Fragment>
                                    {/*<span>{this.countryToFlag(option.code)}</span>*/}
                                    {option.label}
                                </React.Fragment>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Select a Component"
                                    variant="outlined"
                                    fullWidth={true}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'disabled', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                            onChange={(event, value) => this.handleComponentSelect(event, value)}
                        />
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

}

export default withStyles(useStyles)(AddComponentButton);
