import React, { Component } from 'react';


export default class Item extends Component {
    defaultProps: {
        title: 'Lorem Ipsum'
    }

    render() {
        const imageUrl = 'http://lorempixel.com/' + 
                            this.props.width + '/' + 
                            this.props.height + 
                            '/fashion/?_r=' + Math.random();

        return (
            <div className="item" style={{display: 'inline-block'}}>
                <div className="item-image">
                    <img src={imageUrl}
                         style={{
                            width: this.props.width + 'px',
                            height: this.props.height + 'px'
                         }}/>
                </div>
                <div className="item-title">
                    {this.props.title}
                </div>
            </div>
        );
    }
}
