import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
class BackHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { title = '', backFn = () => { },rightContent="" } = this.props
        return (
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={backFn}
                rightContent={rightContent}
            >
                {/*{title}*/}
            </NavBar>
        )
    }
}

export default BackHeader