import React from 'react'
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import NormalHeader from '../../components/NormalHeader'
import { getZhiHuLastDaily } from '../../fetch/zhiHu/index'
import ZhiHuCarousel from './subpage/Carousel'
import ListItem from '../../components/ListItem'
import ListTitle from '../../components/ListTitle'
import ScrollUpAndDown from '../../components/ScrollUpAndDown'
// import { PullToRefresh } from 'antd-mobile'
class ZhiHu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stories_List: [],
            top_stories: [],
            height: 0,
            requestDate: ''

        }
    }
    componentDidMount() {
        this.getData()
        this.setHeight()
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
    onClickHandle(item) {
        console.log('onClickHandle:', item.id)
    }
    render() {
        const { top_stories, stories_List } = this.state
        const carouselProps = {
            top_stories,
            dots: true,
            autoplay: true,
            infinite: true,
            autoplayInterval: 4000,
            onClickHandle: this.onClickHandle.bind(this)
        }

        const scrollProps = {
            directionType: '3',
            onRefresh: this.onRefresh.bind(this),
            style: {
                height: this.state.height,
                overflow: 'auto',
            }
        }
        return (
            <div className="route_content" ref="routeContent">
                <NormalHeader title="知乎日报"></NormalHeader>
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
        )
    }
}

export default withRouter(ZhiHu)