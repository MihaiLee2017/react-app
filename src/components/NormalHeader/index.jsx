import React from 'react'
import { NavBar } from 'antd-mobile'
class NormalHeader extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <NavBar mode='dark'>{this.props.title}</NavBar>
        )
    }
}

export default NormalHeader