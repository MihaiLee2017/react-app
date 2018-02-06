import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon } from 'antd-mobile';
import BackHeader from '../../components/BackHeader'
import CommentItem from '../../components/CommentItem'
import CommentTitle from '../../components/CommentTitle'
import { getLongCommont, getShortCommont } from '../../fetch/zhiHu/index'
class Commnet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            longComment: [],
            shortComment: [],
            isShow: false,
        }
    }
    componentDidMount() {
        this.getData()
    }
    // 设置列表高度
    removeDom() {
        const $headline = document.querySelector('.headline')
        $headline.parentNode.removeChild($headline)
        const $more = document.querySelector('.view-more')
        $more.parentNode.removeChild($more)
    }
    getData() {
        const id = this.props.match.params.id
        getLongCommont(id).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            const { COMMENTS } = res
            this.setState({
                longComment: COMMENTS.comments,
            })
        })
        getShortCommont(id).then(res => {
            return res.json()
        }).then(res => {
            const { COMMENTS } = res
            this.setState({
                shortComment: COMMENTS.comments,
            })
        })
    }
    onBackClick() {
        this.props.history.goBack()
    }
    toggleComment() {
        this.setState(prevState => ({
            isShow: !prevState.isShow
        }))
        // const $dom = this.refs.route_scroll
        // const $target = this.refs.short_comment
        // const len = $target.offsetTop - $target.offsetHeight
        // let start = $dom.scrollTop
        // var scrollInterval = setInterval(() => {
        //     start = start + 50
        //     if (start < len) {
        //         $dom.scrollTo(0, start)
        //     } else {
        //         $dom.scrollTo(0, len)
        //         clearInterval(scrollInterval)
        //     }
        // }, 20)

    }
    render() {
        const { longComment, shortComment, isShow } = this.state
        const headerProps = {
            title: "",
            backFn: this.onBackClick.bind(this),
        }
        const longTitle = `${longComment.length} 条长评论`
        const shortTitle = `${shortComment.length} 条短评论`
        return (
            <div className="route_content" ref="routeContent">
                <BackHeader {...headerProps}></BackHeader>
                <div className="route_scroll" ref="route_scroll">
                    <CommentTitle title={longTitle}></CommentTitle>
                    {
                        longComment.length > 0 ? longComment.map((item, index) => {
                            return (
                                <CommentItem key={`long_${index}`} item={item}>

                                </CommentItem>
                            )
                        }) :
                            <div style={{ color: "#949494", width: '100%', lineHeight: '300px', backgroundColor: "#fff", fontSize: '24px', textAlign: 'center' }}>
                                深度评论虚位以待
                        </div>
                    }
                    <div onClick={this.toggleComment.bind(this)} ref="short_comment">
                        <CommentTitle title={shortTitle} ></CommentTitle>
                    </div>
                    {
                        isShow ?
                            shortComment.length > 0 ?
                                shortComment.map((item, index) => {
                                    return (
                                        <CommentItem key={`short_${index}`} item={item}> </CommentItem>
                                    )
                                })
                                :
                                <div style={{ color: "#949494", width: '100%', lineHeight: '300px', backgroundColor: "#fff", fontSize: '24px', textAlign: 'center' }}>
                                    短评论虚位以待
                            </div>
                            :
                            <div></div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Commnet)