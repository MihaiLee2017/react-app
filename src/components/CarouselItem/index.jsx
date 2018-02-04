import React from 'react'
class CarouselItem extends React.Component {
    // onClickHandle(id) {
    //     this.props.onClick && this.props.onClick(id)
    // }
    render() {
        const { item } = this.props
        const containStyle = {
            height: item.height,
            backgroundImage: `url(${item.image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            position: 'relative'
        }
        const mask = {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)'
        }
        return (
            <div style={containStyle}>
                {/*<div style={mask} onClick={this.onClickHandle.bind(this, item.id)}></div>*/}
                <div style={mask}></div>
            </div>
        )
    }
}

export default CarouselItem