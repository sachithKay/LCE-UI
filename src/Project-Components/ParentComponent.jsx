import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";

const styles = {
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
    }
};


class ParentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };

    render() {
        return (
            <div>
                <div style={styles.parentDiv}>
                    <div style={styles.cardDiv}>
                        <Card style={styles.card}>
                            <CardActionArea onClick={this.handleClickOpen}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" style={styles.avatar}>
                                            {this.props.avatar}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={this.props.title}
                                    subheader={this.props.subheader}
                                />
                            </CardActionArea>
                        </Card>
                    </div>
                    <div style={styles.buttonDiv}>
                        <IconButton aria-label="settings">
                            <AddIcon/>
                        </IconButton>
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" style={styles.avatar}>
                                    {this.props.avatar}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={this.props.title}
                            subheader={this.props.subheader}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default ParentComponent;


ParentComponent.propTypes = {
    avatar: PropTypes.string,
    title: PropTypes.string,
    subheader: PropTypes.string
};

ParentComponent.defaultProps = {
    avatar: 'C',
    title: 'Component',
    subheader: 'Component Description'

};