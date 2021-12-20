import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';

import Header from '../../components/header/Header';
import { dbService, storageService } from '../../server/firebase';

const Main = () => {
  const [main1, setMain1] = useState('');
  const [main2, setMain2] = useState('');
  const [study1Title, setStudy1Title] = useState('');
  const [study1, setStudy1] = useState('');
  const [study2Title, setStudy2Title] = useState('');
  const [study2, setStudy2] = useState('');
  const [study3Title, setStudy3Title] = useState('');
  const [study3, setStudy3] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [image, setImage] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
    img5: null,
    img6: null,
    img7: null,
    img8: null,
    img9: null,
    img10: null,
  });

  useEffect(() => {
    dbService.collection("admin").doc("mainpage").onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
      setMain1(doc.data().maintext1)
      setMain2(doc.data().maintext2)
      setStudy1Title(doc.data().edutitle1)
      setStudy1(doc.data().edutext1)
      setStudy2Title(doc.data().edutitle2)
      setStudy2(doc.data().edutext2)
      setStudy3Title(doc.data().edutitle3)
      setStudy3(doc.data().edutext3)
      setNewsTitle(doc.data().newstitle)
    })
  }, []);

  const onclick = () => {
    console.log(image);
    console.log(main1, main2);
    console.log(study1Title, study1);
    console.log(study2Title, study2);
    console.log(study3Title, study3);
    console.log(newsTitle);

    const db = dbService.collection("admin").doc("mainpage");

    // 글 관련 DB update, doc updata 사용
    db.update({
      maintext1: main1,
      maintext2: main2,
      edutitle1: study1Title,
      edutext1: study1,
      edutitle2: study2,
      edutext2: study2Title,
      edutitle3: study3,
      edutext3: study3Title,
      newstitle: newsTitle,
      image: image
    }).then(() => {
      alert("메인 페이지 업데이트가 완료되었습니다!")
    }).catch((error) => {
      console.log(error)
      alert("오류가 발생하였습니다. 잘못 입력한 부분이 있는지 확인해주세요!")
    })

    const ref = storageService.child('main_page/');
    const file = image
    ref.putString(file, 'data_url').then(function(snapshot) {
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
      <h1>메인 페이지</h1>
      {/* 슬라이드 */}
      <h2>슬라이드 이미지(가로: 360px, 세로: 620px)</h2>
      <div className={styles.Images}>
        <div className={styles.slideImage}>
          <h3>슬라이드 이미지 1</h3>
          <img src={image.img1} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 1)} />
        </div>
        <div className={styles.slideImage}>
          <h3>슬라이드 이미지 2</h3>
          <img src={image.img2} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 2)} />
        </div>
        <div className={styles.slideImage}>
          <h3>슬라이드 이미지 3</h3>
          <img src={image.img3} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 3)} />
        </div>
      </div>
      {/* 메인 */}
      <h2>메인 이미지(가로: 320px, 세로: 200px)</h2>
      <div className={styles.Images}>
        <div className={styles.mainImage}>
          <h3>메인 이미지 1</h3>
          <img src={image.img4} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 4)} />
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.maintextarea} value={main1} onChange={(e) => setMain1(e.target.value)}></textarea>
          </div>
        </div>
        <div className={styles.mainImage}>
          <h3>메인 이미지 2</h3>
          <img src={image.img5} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 5)} />
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.maintextarea} value={main2} onChange={(e) => setMain2(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      {/* 피스메이커 교육 */}
      <h2>피스메이커 교육 이미지(가로: 220px, 세로: 300px)</h2>
      <div className={styles.Images}>
        <div className={styles.stduyImage}>
          <h3>피스에미커 교육 이미지 1</h3>
          <img src={image.img6} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 6)} />
          <div>
            <label htmlFor="">제목</label>
            <input type="text" className={styles.title} value={study1Title} onChange={(e) => setStudy1Title(e.target.value)} />
          </div>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.maintextarea} value={study1} onChange={(e) => setStudy1(e.target.value)}></textarea>
          </div>
        </div>
        <div className={styles.stduyImage}>
          <h3>피스에미커 교육 이미지 2</h3>
          <img src={image.img7} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 7)} />
          <div>
            <label htmlFor="">제목</label>
            <input type="text" className={styles.title} value={study2Title} onChange={(e) => setStudy2Title(e.target.value)} />
          </div>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.maintextarea} value={study2} onChange={(e) => setStudy2(e.target.value)}></textarea>
          </div>
        </div>
        <div className={styles.stduyImage}>
          <h3>피스에미커 교육 이미지 3</h3>
          <img src={image.img8} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 8)} />
          <div>
            <label htmlFor="">제목</label>
            <input type="text" className={styles.title} value={study3Title} onChange={(e) => setStudy3Title(e.target.value)} />
          </div>
          <div className={styles.text}>
            <p>내용</p>
            <textarea className={styles.maintextarea} value={study3} onChange={(e) => setStudy3(e.target.value)}></textarea>
          </div>
        </div>
      </div>
      {/* 뉴스 */}
      <h2>뉴스 이미지(가로: 300px, 세로: 150px)</h2>
      <div className={styles.Images}>
        <div className={styles.newsImage}>
          <h3>뉴스 제목</h3>
          <input type="text" className={styles.input} value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
          <h3>피스에미커 뉴스 이미지 1</h3>
          <img src={image.img10} alt="" />
          <input className={styles.file} type="file" id="input" onChange={(e) => onFileChange(e, 10)} />
        </div>
      </div>
      <div>
        <button onClick={onclick}>등록</button>
      </div>
    </div>
  );
};

export default Main;
