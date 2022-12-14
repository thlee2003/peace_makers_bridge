import React, { useState } from 'react';
import styles from './News.module.css';

import Header from '../../components/header/Header';
import { dbService } from '../../server/firebase';

const News = () => {
  const [introduction, setIntroduction] = useState('');
  const [image, setImage] = useState([]);
  const [imageName, setImageName] = useState([]);

  const onclick = () => {
    console.log(image);
    console.log(imageName);

    const db = dbService.collection("admin").doc("new");

    db.update({
      image: image,
      imagetext: imageName
    }).then(() => {
      alert("소개 페이지 업데이트가 완료되었습니다!")
    }).catch((error) => {
      console.log(error)
      alert("오류가 발생하였습니다. 잘못 입력한 부분이 있는지 확인해주세요!")
    })
  };

  const onFileChange = (e, num) => {
    let array = [];
    array.push(e.target.files);
    encodeFileBase64(array);
  };

  const encodeFileBase64 = (file) => {
    if (file) {
      setImage([]);
      setImageName([]);
      for (let i = 0; i < file[0].length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(file[0][i]);
        reader.onload = () => {
          let base64 = reader.result;
          setImage((image) => [...image, base64]);
          setImageName((imageName) => [...imageName, file[0][i].name]);
        };
        reader.onerror = function (error) {
          console.log('error:', error);
        };
      }
    }
  };

  const p = () => {
    const result = [];
    for (let i = 0; i < imageName.length; i++) {
      result.push(
        <p key={i} style={{ margin: '4px', fontSize: '18px' }}>
          {imageName[i]}
        </p>
      );
    }
    return result;
  };

  return (
    <div className={styles.content}>
      <Header />
      <h1>소개 페이지</h1>
      {/* 소개 */}
      <h2>소개</h2>
      <div className={styles.Images}>
        <div className={styles.campaignImage}>
          <h3>메인 이미지 1</h3>
          <div className={styles.imglist}>
            <p>{p()}</p>
          </div>
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
