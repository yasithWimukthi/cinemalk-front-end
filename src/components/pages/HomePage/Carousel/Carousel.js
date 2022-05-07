import { Carousel } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};

const carouselItem1 = {
    background: 'url(\'../../../../assets/images/ant_man_ver5.jpg\') no-repeat center center',
    backgroundSize: 'cover',
    height:'160px'
}

const HomeCarousel = () => {
    return(
        <Carousel autoplay dots={false}>
            <div>
                <h3 style={carouselItem1}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    )
}

export default HomeCarousel;