import React, { useState } from 'react';
import styles from './News.module.css';

const News = () => {
  const [introduction, setIntroduction] = useState('');
  const [image, setImage] = useState([]);

  const onclick = () => {
    console.log(image);
  };

  const onFileChange = (e, num) => {
    let array = [];
    array.push(e.target.files);
    console.log(array);
    encodeFileBase64(array);
  };

  const encodeFileBase64 = (file) => {
    console.log(file[0].length);
    if (file) {
      for (let i = 0; i < file[0].length; i++) {
        let reader = new FileReader();
        console.log(file[0][i]);
        reader.readAsDataURL(file[0][i]);
        reader.onload = () => {
          let base64 = reader.result;
          console.log(`img${i + 1}`);
          console.log(image);
          setImage((image) => [...image, base64]);
        };
        reader.onerror = function (error) {
          console.log('error:', error);
        };
      }
    }
  };

  return (
    <div className={styles.content}>
      <h1>소개 페이지</h1>
      {/* 소개 */}
      <h2>소개()</h2>
      <div className={styles.Images}>
        <div className={styles.campaignImage}>
          <h3>메인 이미지 1</h3>
          <img src={image.img1} alt="" />
          <input className={styles.file} type="file" id="input" multiple="multiple" onChange={(e) => onFileChange(e, 1)} />
          <div className={styles.text}>
            <h3>내용</h3>
            <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      <div>
        <button onClick={onclick}>등록</button>
      </div>
    </div>
  );
};

export default News;
