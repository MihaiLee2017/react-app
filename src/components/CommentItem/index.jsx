import React, { Component } from 'react';
import './styles.scss'
// import BarItem from './subpage/BarItem'
class CommentItem extends Component {
   
    render() {
        const {item} = this.props
        return (
            <div className="comment">
              <div className="author">
                  <img src={item.avatar} />
              </div>
              <div className="content">
                <h3>{item.author}</h3>
                <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
              </div>
            </div >
        );
    }
}

export default CommentItem
