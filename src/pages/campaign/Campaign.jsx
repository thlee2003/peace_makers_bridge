import React, { useEffect, useState } from 'react';
import styles from './Campaign.module.css';

import Header from '../../components/header/Header';
import { dbService } from '../../server/firebase';

const Campaign = () => {
  const [phrase, setPhrase] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [FAQ1Title, setFAQ1Title] = useState('');
  const [FAQ1, setFAQ1] = useState('');
  const [FAQ2Title, setFAQ2Title] = useState('');
  const [FAQ2, setFAQ2] = useState('');
  const [FAQ3Title, setFAQ3Title] = useState('');
  const [FAQ3, setFAQ3] = useState('');
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
    dbService.collection("admin").doc("campaign").onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
      console.log(doc.data().video1)
      console.log(setVideo1)
      setPhrase(doc.data().campaign2)
      setIntroduction(doc.data().campaign1)
      setFAQ1Title(doc.data().Q1text)
      setFAQ1(doc.data().A1text)
      setFAQ2Title(doc.data().Q2text)
      setFAQ2(doc.data().A2text)
      setFAQ3Title(doc.data().Q3text)
      setFAQ3(doc.data().A3text)
      setVideo1(doc.data().video1)
      setVideo2(doc.data().video2)
    })
    // console.log(outVideo1, outVideo2);
    // setOutVideo1('https://www.youtube.com/embed/' + video1.split('.be/')[1]);
    // setOutVideo2('https://www.youtube.com/embed/' + video2.split('.be/')[1])
  }, []);

  const onclick = () => {
    console.log(image);
    console.log(introduction);
    console.log(FAQ1Title, FAQ1);
    console.log(FAQ2Title, FAQ2);
    console.log(FAQ3Title, FAQ3);
    console.log(outVideo1, outVideo2);

    const db = dbService.collection("admin").doc("campaign");
    db.update({
      Q1text: FAQ1Title,
      A1text: FAQ1,
      Q2text: FAQ2Title,
      A2text: FAQ2,
      Q3text: FAQ3Title,
      A3text: FAQ3,
      video1: video1,
      video2: video2,
      campaign2: phrase,
      campaign1: introduction,
      image: image
    }).then(() => {
      alert("메인 페이지 업데이트가 완료되었습니다!")
    }).catch((error) => {
      console.log(error)
      alert("오류가 발생하였습니다. 잘못 입력한 부분이 있는지 확인해주세요!")
    })
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
      <h1>소개 페이지</h1>
      {/* 이달의 소개 문구 */}
      <h2>이달의 평화 문구</h2>
      <div className={styles.Images}>
        <div className={styles.slideImage}>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.textarea} value={phrase} onChange={(e) => setPhrase(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      {/* 소개 */}
      <h2>소개(가로: 360px, 세로: 180px)</h2>
      <div className={styles.Images}>
        <div className={styles.campaignImage}>
          <h3>메인 이미지 1</h3>
          <img src={image.img1} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 1)} />
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.campaigntextarea} value={introduction} onChange={(e) => setIntroduction(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      {/* FAQ */}
      <h2>FAQ</h2>
      <div className={styles.Images}>
        <div className={styles.stduyImage}>
          <div>
            <label htmlFor="">제목</label>
            <input type="text" className={styles.title} value={FAQ1Title} onChange={(e) => setFAQ1Title(e.target.value)} />
          </div>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.campaigntextarea} value={FAQ1} onChange={(e) => setFAQ1(e.target.value)}></textarea>
          </div>
        </div>
        <div className={styles.stduyImage}>
          <div>
            <label htmlFor="">제목</label>
            <input type="text" className={styles.title} value={FAQ2Title} onChange={(e) => setFAQ2Title(e.target.value)} />
          </div>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.campaigntextarea} value={FAQ2} onChange={(e) => setFAQ2(e.target.value)}></textarea>
          </div>
        </div>
        <div className={styles.stduyImage}>
          <div>
            <label htmlFor="">제목</label>
            <input type="text" className={styles.title} value={FAQ3Title} onChange={(e) => setFAQ3Title(e.target.value)} />
          </div>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.campaigntextarea} value={FAQ3} onChange={(e) => setFAQ3(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      {/* 소개 영상 */}
      <h2>소개 영상(가로: 300px, 세로: 150px)</h2>
      <div className={styles.Images}>
        <div className={styles.newsImage}>
          <h3>소개 영상1</h3>
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
          <h3>소개 영상2</h3>
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

export default Campaign;
