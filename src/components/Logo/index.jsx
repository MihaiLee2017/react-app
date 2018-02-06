import React from 'react'
import './styles.scss'
class Logo extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    render() {
        const { logo } = this.props
        return (
             <div className="logo" style={{ backgroundImage: `url(${logo.src})` }}>
                <div className="mask"></div>
                <h1>{logo.title}</h1>
            </div>
            // <div className="img-wrap">
            //     <h1 className="headline-title">{logo.title}</h1>
            //     <span class="img-source">图片：《美丽心灵》</span>
            //     <img src={logo.src} alt="" />
            //     <div className="img-mask"></div>
            // </div>
        )
    }
}

export default Logo