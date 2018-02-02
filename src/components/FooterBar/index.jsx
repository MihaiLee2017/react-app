import React, { Component } from 'react';
// import BarItem from './subpage/BarItem'
import { TabBar } from 'antd-mobile';
class FooterBar extends Component {
    onPressHandle(path) {
        this.props.onPress && this.props.onPress(path)
    }
    render() {
        const { pathname, itemList } = this.props
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    {itemList.map((item, index) => {
                        return (
                            <TabBar.Item
                                title={item.title}
                                key={item.key}
                                icon={<div style={{
                                    width: item.icon.width,
                                    height: item.icon.height,
                                    background: `url(${item.icon.url}) center center /  21px 21px no-repeat`
                                }}
                                />
                                }
                                selectedIcon={<div style={{
                                    width: item.selectedIcon.width,
                                    height: item.selectedIcon.height,
                                    background: `url(${item.selectedIcon.url}) center center /  21px 21px no-repeat`
                                }}
                                />
                                }
                                selected={pathname === item.key}
                                onPress={this.onPressHandle.bind(this, item.key)}
                            >
                            </TabBar.Item>
                        )
                    })}
                </TabBar>
            </div >
        );
    }
}

export default FooterBar;
