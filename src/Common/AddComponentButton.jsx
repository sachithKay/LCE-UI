import IconButton from "@material-ui/core/IconButton";
import ForwardArrowIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

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
            component: [
                {code: 'AD', label: 'Andorra', phone: '376'},
                {code: 'AE', label: 'United Arab Emirates', phone: '971'},
                {code: 'AF', label: 'Afghanistan', phone: '93'},
                {code: 'AG', label: 'Antigua and Barbuda', phone: '1-268'},
                {code: 'AI', label: 'Anguilla', phone: '1-264'},
                {code: 'AL', label: 'Albania', phone: '355'},
                {code: 'AM', label: 'Armenia', phone: '374'},
                {code: 'AO', label: 'Angola', phone: '244'},
                {code: 'AD', label: 'Andorra', phone: '376'},
                {code: 'AE', label: 'United Arab Emirates', phone: '971'},
                {code: 'AF', label: 'Afghanistan', phone: '93'},
                {code: 'AG', label: 'Antigua and Barbuda', phone: '1-268'},
                {code: 'AI', label: 'Anguilla', phone: '1-264'},
                {code: 'AL', label: 'Albania', phone: '355'},
                {code: 'AM', label: 'Armenia', phone: '374'},
                {code: 'AO', label: 'Angola', phone: '244'},
            ],
            dialogOpen: false,
        };
    }

    toggleHover = () => {
        this.setState(prevState => ({
            isHovered: !prevState.isHovered,
            component: prevState.component,
            dialogOpen: prevState.dialogOpen,
        }));
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

    countryToFlag = (isoCode) => {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
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
                            // subheader={this.state.component.name}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <Autocomplete
                            id="country-select-demo"
                            fullWidth="true"
                            // style={{width: 100}}
                            options={this.state.component}
                            classes={{
                                option: classes.option,
                            }}
                            autoHighlight
                            getOptionLabel={option => option.label}
                            renderOption={option => (
                                <React.Fragment>
                                    <span>{this.countryToFlag(option.code)}</span>
                                    {option.label} ({option.code}) +{option.phone}
                                </React.Fragment>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Select a Component"
                                    variant="outlined"
                                    fullWidth="true"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'disabled', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <br/>
                        <Autocomplete
                            id="country-select-demo"
                            fullWidth="true"
                            disabled={true}
                            options={this.state.component}
                            classes={{
                                option: classes.option,
                            }}
                            autoHighlight
                            getOptionLabel={option => option.label}
                            renderOption={option => (
                                <React.Fragment>
                                    <span>{this.countryToFlag(option.code)}</span>
                                    {option.label} ({option.code}) +{option.phone}
                                </React.Fragment>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Select a Operation"
                                    variant="outlined"
                                    fullWidth="true"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'disabled', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <br/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

}

export default withStyles(useStyles)(AddComponentButton);
