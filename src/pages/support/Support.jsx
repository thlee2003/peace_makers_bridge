import React, { useEffect, useState } from 'react';
import styles from './Support.module.css';

import Header from '../../components/header/Header';

const Support = () => {
  const [supprot, setSupprot] = useState('');
  //   video 입력
  const [video1, setVideo1] = useState('');
  const [video2, setVideo2] = useState('');
  //   video 출력
  const [outVideo1, setOutVideo1] = useState('');
  const [outVideo2, setOutVideo2] = useState('');
  const [image, setImage] = useState({
    img1: null,
  });

  useEffect(() => {
    console.log(video1.split('.be/')[1]);
    setOutVideo1('https://www.youtube.com/embed/' + video1.split('.be/')[1]);
    setOutVideo2('https://www.youtube.com/embed/' + video2.split('.be/')[1]);
    console.log(outVideo1, outVideo2);
  }, [video1, video2]);

  const onclick = () => {
    console.log(image);
    console.log(supprot);
    console.log(outVideo1, outVideo2);
  };

  const onFileChange = (e, num) => {
    let array = [];
    array.push(e.target.files[0], num);
    console.log(array);
    encodeFileBase64(array);
  };

  const encodeFileBase64 = (file) => {
    console.log(file);
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        var base64 = reader.result;
        console.log(`img${file[1]}`);
        setImage({
          ...image,
          [`img${file[1]}`]: base64,
        });
      };
      reader.onerror = function (error) {
        console.log('error:', error);
      };
    }
  };

  return (
    <div className={styles.content}>
      <Header />
      <h1>후원 페이지</h1>
      {/* 소개 */}
      <h2>소개(가로: 360px, 세로: 180px)</h2>
      <div className={styles.Images}>
        <div className={styles.campaignImage}>
          <h3>메인 이미지 1</h3>
          <img src={image.img1} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 1)} />
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.supprottextarea} value={supprot} onChange={(e) => setSupprot(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      {/* 홍보 영상 */}
      <h2>홍보 영상</h2>
      <div className={styles.Images}>
        <div className={styles.newsImage}>
          <h3>홍보 영상1</h3>
          <div id="area" className={styles.area}>
            <div id="video" className={styles.video}>
              <iframe
                width="100%"
                height="100%"
                src={outVideo1}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>

          <input className={styles.file} type="text" id="input" onChange={(e) => setVideo1(e.target.value)} />
        </div>
        <div className={styles.newsImage}>
          <h3>홍보 영상2</h3>
          <div id="area" className={styles.area}>
            <div id="video" className={styles.video}>
              <iframe
                width="100%"
                height="100%"
                src={outVideo2}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
          <input className={styles.file} type="text" id="input" onChange={(e) => setVideo2(e.target.value)} />
        </div>
      </div>
      <div>
        <button onClick={onclick}>등록</button>
      </div>
    </div>
  );
};

export default Support;
