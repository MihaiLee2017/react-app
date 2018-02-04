import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import '../static/css/common.scss'

import ZhiHu from '../containers/ZhiHu/index'
import DouBan from '../containers/DouBan/index'
const NORMAL_PATH = ['/', '/zhihu', '/douban']
export default class SubRouter extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        // console.log(this.props)
        const { location = {}, history = {}, } = this.props
        const key = location.pathname
        const { action } = history
        let transName = action === 'POP' ? "back" : action === "PUSH" ? "go" : ""
        let transTime = action === 'POP' ? 400 : action === "PUSH" ? 400 : 100
        const isChange = NORMAL_PATH.some(item => {
            return item === key
        })
        if (isChange) {
            transName = "example"
            transTime = 400
        }
        return (
            <ReactCSSTransitionGroup
                transitionName={transName}
                transitionEnterTimeout={transTime}
                transitionLeaveTimeout={transTime}>
                <div key={key} style={{ position: "absolute", width: "100%", top: '0', bottom: '0' }}>
                    <Switch location={location}>
                        <Route exact path='/' component={ZhiHu}></Route>
                        <Route path='/zhihu' component={ZhiHu}></Route>
                        <Route path='/douban' component={DouBan}></Route>
                    </Switch>
                </div >
            </ReactCSSTransitionGroup>
        )
    }
}