import React, { Component } from 'react';
import './styles.scss'
// import BarItem from './subpage/BarItem'
class CommentTitle extends Component {
   
    render() {
        const {title} = this.props
        return (
            <div className="commentTitle">
                {title}
            </div >
        );
    }
}

export default CommentTitle
