import React from 'react'
import { Drawer, List } from 'antd-mobile'
class ZhiHuDrawer extends React.Component {
    // onClickHandle(id) {
    //     console.log('onClickHandle:', id)
    // }
    constructor(props) {
        super(props)
        this.state = {
            sidebar: ''
        }
    }
    componentDidMount() {
        this.setSlider()
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.currentThemes.id !== nextProps.currentThemes.id)
            this.setSlider(nextProps)
    }
    setSlider(nextProps) {
        const { themes, onClick, currentThemes } = nextProps || this.props
        const selectCss = { backgroundColor: '#efefef' }
        const sidebar = (<List>
            {themes.map((i, index) => {
                let style = {}
                if (currentThemes && currentThemes.id === i.id) {
                    style = { ...selectCss }
                }
                return (
                    <List.Item key={index}
                        thumb={i.thumbnail}
                        multipleLine
                        style={style}
                        onClick={onClick.bind(this, i)}
                    >
                        {i.name}
                    </List.Item>
                )
            })}
        </List >);
        this.setState({
            sidebar,
        })
    }
    render() {
        const { open, onOpenChange } = this.props
        const { sidebar } = this.state

        return (
            <div>
                <Drawer
                    enableDragHandle
                    sidebarStyle={{ width: '80%', marginTop: '45px' }}
                    overlayStyle={{ marginTop: '45px' }}
                    style={{ minHeight: "100%" }}
                    open={open}
                    sidebar={sidebar}
                    onOpenChange={onOpenChange}
                >
                    {this.props.children}
                </Drawer>
            </div>
        )
    }
}

export default ZhiHuDrawer