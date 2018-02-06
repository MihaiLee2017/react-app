import React from 'react'
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import NormalHeader from '../../components/NormalHeader'
import { getZhiHuLastDaily, getDailyThemes, getDailyThemesItem } from '../../fetch/zhiHu/index'
import ZhiHuCarousel from './subpage/Carousel'
import ZhiHuDrawer from './subpage/Drawer'
import ListItem from '../../components/ListItem'
import ListTitle from '../../components/ListTitle'
import ScrollUpAndDown from '../../components/ScrollUpAndDown'
import * as CONSTANTS from '../../constants/zhiHu'
// import { PullToRefresh } from 'antd-mobile'
class ZhiHu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stories_List: [],
            top_stories: [],
            height: 0,
            requestDate: '',
            themes: [],
            drawerOpen: false,
            currentThemes: {
                title: CONSTANTS.THEMES_HOME.name,
                id: CONSTANTS.THEMES_HOME.id,
            },
            directionType: CONSTANTS.DIRECTION_TYPE.UpAndDown,
        }
    }
    componentDidMount() {
        this.getData()
    }
    setDateToState(result, isMore) {
        const { STORIES } = result
        let stories_List = [{ date: STORIES.date }, ...STORIES.stories]
        const top_stories = isMore ? [] : STORIES.top_stories
        this.setState(prevState => ({
            stories_List: isMore ? prevState.stories_List.concat(stories_List) : stories_List,
            top_stories: isMore ? prevState.top_stories : top_stories,
            requestDate: STORIES.date,
        }))
    }
    getData() {
        //主题日报
        getDailyThemes().then(result => {
            return result.json()
        }).then(result => {
            // this.setDateToState(result)
            const { THEMES } = result
            this.setState({
                themes: [CONSTANTS.THEMES_HOME, ...THEMES.others]
            })
            this.setHeight()
        })
        // 首页数据
        getZhiHuLastDaily().then(result => {
            return result.json()
        }).then(result => {
            this.setDateToState(result)
        })
    }
    // 设置列表高度
    setHeight() {
        const scrollContent = ReactDOM.findDOMNode(this.refs.scrollContent)
        const height = this.refs.routeContent.clientHeight - scrollContent.offsetTop
        this.setState({
            height,
        })

    }
    // 列表刷新函数
    onRefresh(isRefresh) {
        if (isRefresh) {
            this.getData()
        } else {
            let date = this.state.requestDate
            // date = parseInt(date) - 1
            getZhiHuLastDaily(date).then(res => {
                return res.json()
            }).then(res => {
                this.setDateToState(res, true)
            })
        }
    }
    // detail
    onClickHandle(item) {
        if (item && item.id)
            this.props.history.push(`/detail/${item.id}`)
    }
    // 转换日报
    onThemeClick(item) {
        const { themes, currentThemes } = this.state
        // 当前是否选择了
        if (item.id === currentThemes.id) {
            return null
        }
        let isHome = false
        // 请求选中themes的数据
        for (let theme of themes) {
            if (theme.id === item.id) {
                isHome = item.id === CONSTANTS.THEMES_HOME.id
                this.setState({
                    currentThemes: {
                        title: theme.name,
                        id: theme.id,
                    },
                    drawerOpen: false,
                    directionType: isHome ? CONSTANTS.DIRECTION_TYPE.UpAndDown : CONSTANTS.DIRECTION_TYPE.No
                })
                break
            }
        }
        if (isHome) {
            this.getData()
            return false;
        }
        getDailyThemesItem(item.id).then(res => {
            return res.json()
        }).then(res => {
            const { THEMEDES } = res
            const top_stories = [{
                id: '',
                image: THEMEDES.background,
                title: THEMEDES.description,
            }]
            const stories_List = [...THEMEDES.stories]
            this.setState({
                top_stories,
                stories_List,
            })
        })
        // const scrollContent = ReactDOM.findDOMNode(this.refs.scrollContent)
        // scrollContent.scrollTo(0, 0)
    }
    // 是否打开抽屉
    toggleDrawer() {
        this.setState((prevState) => ({
            drawerOpen: !prevState.drawerOpen
        }))
    }
    render() {
        const { top_stories, stories_List, themes, drawerOpen, currentThemes, directionType } = this.state
        const carouselProps = {
            top_stories,
            dots: true,
            autoplay: true,
            infinite: true,
            autoplayInterval: 4000,
            onClickHandle: this.onClickHandle.bind(this)
        }
        const scrollProps = {
            directionType,
            onRefresh: this.onRefresh.bind(this),
            style: {
                height: this.state.height,
                overflow: 'auto',
            }
        }
        const drawerProps = {
            themes,
            open: drawerOpen,
            onOpenChange: this.toggleDrawer.bind(this),
            onClick: this.onThemeClick.bind(this),
            currentThemes,
        }
        return (
            <div className="route_content" ref="routeContent">
                {themes.length > 0 && <ZhiHuDrawer {...drawerProps}>
                    <NormalHeader backFn={this.toggleDrawer.bind(this)} title={currentThemes.title}></NormalHeader>
                    <div className="route_scroll">
                        <ScrollUpAndDown ref="scrollContent" scrollProps={scrollProps}>
                            {top_stories.length > 0 && <ZhiHuCarousel {...carouselProps}></ZhiHuCarousel>}
                            {
                                stories_List.length > 0 && stories_List.map((item, index) => {
                                    return (
                                        item.date ?
                                            <div key={index}>
                                                <ListTitle title={item.date}></ListTitle>
                                            </div>
                                            :
                                            <div key={index} onClick={this.onClickHandle.bind(this, item)}>
                                                <ListItem item={item}></ListItem>
                                            </div>
                                    )
                                })
                            }
                        </ScrollUpAndDown>
                    </div>
                </ZhiHuDrawer>
                }
            </div>
        )
    }
}

export default withRouter(ZhiHu)