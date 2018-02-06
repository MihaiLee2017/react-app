import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
class NormalHeader extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const { backFn } = this.props
        return (
            <NavBar
                mode='dark'
                icon={<Icon type="ellipsis" />}
                onLeftClick={backFn}
            >{this.props.title}</NavBar>
        )
    }
}

export default NormalHeader