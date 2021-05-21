import React from 'react';
import { TextField, withStyles, Button } from '@material-ui/core';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '2vw',
        justifyContent: 'space-evenly',
    },
    input: {
    },
    button: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                error: false
            },
            description: {
                value: '',
                error: false,
            },
            link: {
                value: '',
                error: false,
            },
        };
        this.reset = this.reset.bind(this);
        this.validate = this.validate.bind(this);
    }

    reset() {
        this.setState({
            name: {
                value: '',
                error: false
            },
            description: {
                value: '',
                error: false,
            },
            link: {
                value: '',
                error: false,
            },
        });
    }

    validate(prop, value) {
        if (prop === 'name') {
            if(value === '') {
                return false;
            }
            else {
                return true;
            }
        }
        else if (prop === 'description') {
            if(value === '') {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            const pattern = /www.[\w]+[.]com[/][\w]+/;

            return pattern.test(value);
        }
    }

    render() {
        const { classes } = this.props;
        const state = this.state;

        return (
            <React.Fragment>
                <form noValidate autoComplete='off' className={classes.form} >
                    <TextField
                        error={false}
                        helperText={state.name.error ? 'Required' : ''}
                        className={classes.input}
                        label='Name Of The Video'
                        value={state.name.value}
                        onChange={(e) => {
                            this.setState({
                                name: {
                                    value: e.target.value,
                                    error: !this.validate('name', e.target.value),
                                }
                            });
                        }}
                    />
                    <TextField
                        error={false}
                        helperText={state.description.error ? 'Required' : ''}
                        className={classes.input}
                        multiline
                        rows={7}
                        label="Description"
                        variant="outlined"
                        value={state.description.value}
                        onChange={(e) => {
                            this.setState({
                                description: {
                                    value: e.target.value,
                                    error: !this.validate('description', e.target.value),
                                }
                            });
                        }}
                    />
                    <TextField
                        error={false}
                        helperText={state.link.error ? 'Not a link' : ''}
                        className={classes.input}
                        label='Link of the Video'
                        value={state.link.value}
                        onChange={(e) => {
                            this.setState({
                                link: {
                                    value: e.target.value,
                                    error: !this.validate('link', e.target.value),
                                }
                            });
                        }}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={this.reset}
                    >
                        Reset
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Video);