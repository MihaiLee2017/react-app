import React, { Component } from 'react';
import './App.scss';
import { withRouter } from 'react-router-dom'
import FooterBar from './components/FooterBar/index'
import { TAB_ITEM_List } from './util/footTab'
// import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathname: ''
    }
  }
  componentDidMount() {
    this.confing()
  }
  confing() {
    let pathname = this.props.location.pathname.split('/')[1]
    if (!pathname) {
      pathname = 'zhihu'
    }
    this.setState({
      pathname,
    })
  }
  onPress(path) {
    const { pathname } = this.state
    if (pathname === path) {
      return null
    }
    this.setState({
      pathname: path,
    })
    this.props.history.push(`/${path}`)
  }
  render() {
    const footerProps = {
      onPress: this.onPress.bind(this),
      pathname: this.state.pathname,
      itemList: [...TAB_ITEM_List],
    }
    return (
      <div className="App">
        <div className="app_route">
          {this.props.children}
        </div>
        <FooterBar {...footerProps}></FooterBar>
      </div>
    );
  }
}

export default withRouter(App);
