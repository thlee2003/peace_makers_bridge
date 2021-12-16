import React from 'react'
import {styles} from './Main.module.css'

const Main = () => {
    return (
        <div>
            <h1>main</h1>
            <div className="slideImage">
                <p>슬라이드 이미지</p>
            </div>
            <div className="main">
                <p>메인</p>
            </div>
            <div className="study">
                <p>피스메이커 교육</p>
            </div>
            <div className="support">
                <p>후원</p>
            </div>
            <div className="news">
                <p>뉴스</p>
            </div>
        </div>
    )
}

export default Main