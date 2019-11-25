import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from 'prop-types';

const styles = {
    card: {
        maxWidth: 245,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'blue'
    },
    cardContent: {
        backgroundColor: '#d9d9d9',
        padding: '5px 5px 5px 5px',
    }
};


export default class ParentComponent extends Component {

    render(){
        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={styles.avatar}>
                                {this.props.avatar}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.title}
                        subheader={this.props.subheader}
                    />
                    <CardContent style={styles.cardContent}>
                        + Payload<br/>
                        + Attributes
                    </CardContent>
                </Card>
            </div>
        );
    }

}


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