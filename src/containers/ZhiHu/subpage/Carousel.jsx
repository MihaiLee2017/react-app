import React from 'react'
import { Carousel } from 'antd-mobile'
import CarouselItem from '../../../components/CarouselItem'
class ZhiHuCarousel extends React.Component {
    // onClickHandle(id) {
    //     console.log('onClickHandle:', id)
    // }
    componentDidMount() {
    }
    render() {
        const { top_stories, onClickHandle, ...config } = this.props
        return (
            <div>
                {top_stories && top_stories.length > 0 &&
                    <Carousel

                        {...config}
                    >
                        {top_stories.map((item, index) => {
                            const carouselItem = { ...item, height: '230px' }
                            return (
                                <div key={index} onClick={onClickHandle.bind(this, item)}>
                                    <CarouselItem item={carouselItem}></CarouselItem>
                                </div>
                            )
                        })}
                    </Carousel>
                }
            </div>
        )
    }
}

export default ZhiHuCarousel