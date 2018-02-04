import React from 'react'
import './styles.scss'
class ListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    // componentDidMount() {

    // }
    render() {
        const { item } = this.props
        return (
            <div className='list_content'>
                <p>{item.title}</p>
                <img src={item.images[0]} />
            </div>
        )
    }
}

export default ListItem