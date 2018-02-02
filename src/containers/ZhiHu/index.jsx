import React from 'react'
import { withRouter } from 'react-router-dom'
import { Flex } from 'antd-mobile'
import NormalHeader from '../../components/NormalHeader'
class ZhiHu extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <div>
                <NormalHeader title="知乎日报"></NormalHeader>
                <div>
                    知乎
                </div>
            </div>
        )
    }
}

export default withRouter(ZhiHu)