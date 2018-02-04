import React from 'react'
import './styles.scss'
class ListTitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }
    componentDidMount() {
        this.setTitle()
    }
    setTitle() {
        const days = ['日', '一', '二', '三', '四', '五', '六']
        let { title } = this.props
        title = `${title.slice(0, 4)}-${title.slice(4, 6)}-${title.slice(6, 8)} `
        const date = new Date(title)
        const day = date.getDay()
        let str = `${date.getMonth() + 1}月${date.getDate()}日 星期${days[day]}`
        this.setState({
            title: str
        })
    }
    render() {
        const { title } = this.state
        return (
            <div className='list_title'>
                {title}
            </div>
        )
    }
}

export default ListTitle