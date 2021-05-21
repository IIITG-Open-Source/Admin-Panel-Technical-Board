import React from 'react';
import { Grid, Container, Typography, Button, withStyles } from '@material-ui/core';
import Item from './Item';
import AddButton from './AddButton';

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '5vh',
        marginBottom: '5vh',
    },
    buttons: {
        margin: '5vh 3vw',
        fontSize: "20px",
    }
};

class GridComponent extends React.Component {
    constructor(props) {
        /*
            Props:-
            - Item to be rendered inside a grid item
        */
        super(props);

        /*
            The State will hold the refs to all the item componenents and
            their instances
        */
        this.state = {
            items: [],
            refs: []
        };

        //Method Bindings
        this.addNewItem = this.addNewItem.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.uploadAll = this.uploadAll.bind(this);
        this.handleRefs = this.handleRefs.bind(this);
        this.deleteButton = this.deleteButton.bind(this);

        //Instance Properties
        this.key = 0;

        //Item Componenent which needs to be rendered inside the grid item
        this.itemType = this.props.itemTypeName;
    }

    addNewItem() {
        //Store the current State
        let items = this.state.items;

        //Add the new Grid Item and pass the item to be rendered inside
        items.push(
            <Item delete={this.deleteButton} key={this.key} identifier={this.key} ref={this.handleRefs}>
                {this.itemType}
            </Item>
        );

        (this.key)++;

        this.setState({
            items
        });
    }

    handleRefs(ref) {
        const refs = this.state.refs;
        if (ref) {
            refs.push(ref);
        }
        this.setState({
            refs
        });
    }

    uploadAll() {
        const refs = this.state.refs;

        for (let i in refs) {
            refs[i].upload();
        }
    }

    deleteAll() {
        this.setState({
            items: [],
            refs: []
        });
    }

    deleteButton(key) {
        const { state } = this;
        const { refs, items } = state;

        let pos;
        //Binary Search since the array will be always sorted
        let left = 0, right = refs.length - 1, mid;

        do {
            mid = left + Math.ceil(parseFloat(right - left) / parseFloat(2));
            const identifier = refs[mid].identifier;
            if (key === identifier) {
                pos = mid;
                break;
            }
            else if (key > identifier) {
                left = mid + 1;
            }
            else if (key < identifier) {
                right = mid - 1;
            }
        } while (refs[mid].identifier !== key);

        //Remove the element
        refs.splice(pos, 1);
        items.splice(pos, 1);

        this.setState({
            items, refs
        });
    }

    render() {
        const items = [...(this.state.items)];
        const { classes } = this.props;

        return (
            <Container maxWidth={false} className={classes.container}>

                {/* Heading */}
                <Typography variant="h2" component="h2" align='center'>
                    { this.props.heading }
                </Typography>

                <Container maxWidth={false} className={classes.container}>

                    {/* Buttons */}
                    <Button variant="contained" color="primary" className={classes.buttons} onClick={this.uploadAll}>
                        Upload All
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.buttons} onClick={this.deleteAll}>
                        Delete All
                    </Button>

                    {/* Grid */}
                    <Grid spacing={4} container alignItems='center'>
                        {/* Items which need to be rendered inside the grid */}
                        <React.Fragment>
                            {items}
                        </React.Fragment>

                        {/* Button to Add New Items */}
                        <AddButton key="AddButton" onClick={this.addNewItem} />
                    </Grid>
                </Container>
            </Container>
        );
    }
}

export default withStyles(styles)(GridComponent);