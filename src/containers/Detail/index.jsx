import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon } from 'antd-mobile';
import BackHeader from '../../components/BackHeader'
import Logo from '../../components/Logo'
import { getZhiHuDetail } from '../../fetch/zhiHu/index'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            link: 'http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3',
            linkID: `dyn_${Math.floor(Math.random() * 100000)}`,
            logo: {
                src: '',
                title: '',
            },
        }
    }
    componentDidMount() {
        this.getData()
    }
    componentWillUnmount() {
        this.removeCSS()
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
        getZhiHuDetail(id).then(res => {
            return res.json()
        }).then(res => {
            const { CONTENTS } = res
            this.setState({
                body: CONTENTS.body,
                // link: CONTENTS.css,
                logo: {
                    title: CONTENTS.title,
                    src: CONTENTS.image,
                }
            })
            this.createLink()
            this.removeDom()
        })
    }
    createLink() {
        let $head = document.getElementsByTagName('head')[0],
            $meta = document.getElementsByTagName('meta')[0],
            cssURL = this.state.link,
            linkTag = document.createElement('link');
        linkTag.id = this.state.linkID;
        linkTag.href = cssURL;
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('media', 'all');
        linkTag.setAttribute('type', 'text/css');
        $head.insertBefore(linkTag, $meta);
    }
    removeCSS() {
        let $head = document.getElementsByTagName('head')[0],
            $link = document.querySelector(`#${this.state.linkID}`)
        $head.removeChild($link);
    }
    onBackClick() {
        // this.removeCSS()
        this.props.history.goBack()
    }
    goComments() {
        // this.removeCSS()
        const id = this.props.match.params.id
        this.props.history.push(`/comments/${id}`)
    }
    render() {
        const { logo, body } = this.state
        const headerProps = {
            title: logo.title,
            backFn: this.onBackClick.bind(this),
            rightContent: <Icon onClick={this.goComments.bind(this)} type="ellipsis" />
        }
        return (
            <div className="route_content" ref="routeContent">
                <BackHeader {...headerProps}></BackHeader>
                <div className="route_scroll" ref="scrollContent">
                    <Logo logo={logo}></Logo>
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                </div>
            </div>
        )
    }
}

export default withRouter(Detail)