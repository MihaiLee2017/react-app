import React from 'react'
import ReactDOM from 'react-dom';

import { PullToRefresh } from 'antd-mobile'
class ScrollUpAndDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            direction: 'down',
            distanceToRefresh: 30,
        }
    }
    componentDidMount() {
        this.setConfig()
    }
    setConfig() {
        let setDirection = null
        const $scrollUpAndDown = ReactDOM.findDOMNode(this.scrollUpAndDown)
        $scrollUpAndDown.addEventListener("scroll", () => {
            const { refreshing } = this.state
            if (refreshing) {
                return false
            }
            clearTimeout(setDirection)
            setDirection = setTimeout(() => {
                const distance = $scrollUpAndDown.scrollTop
                if (distance > 50) {
                    this.setState(prevState => ({
                        direction: 'up'
                    }))
                } else {
                    this.setState(prevState => ({
                        direction: 'down'
                    }))
                }
            }, 20)
        })
    }
    onRefreshHandle() {
        const isRefresh = this.state.direction === 'up' ? false : true
        this.props.scrollProps.onRefresh && this.props.scrollProps.onRefresh(isRefresh)
    }
    render() {
        const { directionType, onRefresh, style, ...props } = this.props.scrollProps
        return (
            <PullToRefresh
                ref={el => this.scrollUpAndDown = el}
                direction={this.state.direction}
                distanceToRefresh={this.state.distanceToRefresh}
                refreshing={this.state.refreshing}
                style={style}
                onRefresh={this.onRefreshHandle.bind(this)}
            >
                {this.props.children}
            </PullToRefresh>
        )
    }
}
export default ScrollUpAndDown