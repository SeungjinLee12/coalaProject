import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StarRating = ({ star }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= star ? "star-filled" : "star-empty";
      const starCharacter = i <= star ? "★" : "☆";
      stars.push(
        <span key={i} className={`star ${starClass}`}>
          {starCharacter}
        </span>
      );
    }
    return stars;
  };

  return <div style={{ display: "flex" }}>{renderStars()}</div>;
};

const LectureInfo2 = () => {
  const reviewData = {
    review_list: [
      {
        review: "도움이 됐어요",
        star: 5,
        userName: "이승진123",
      },
      {
        review: "어려워요",
        star: 3,
        userName: "성우창",
      },
      {
        review: "TEST112223",
        star: 4,
        userName: "이승진123",
      },
      {
        review: "TEST213123123",
        star: 2,
        userName: "이승진123",
      },
      {
        review: "TEST213123123",
        star: 1,
        userName: "이승진123",
      },
      {
        review: "도움이 됐어요",
        star: 5,
        userName: "이승진123",
      },
      // ... (다른 리뷰 데이터)
    ],
  };

  const lectureData = {
    lectureTOC_list: [
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },
      {
        title: "Introduction",
        TOC_description: "Overview of the course",
      },

      // ... (다른 TOC 항목들)
    ],
    lectureView: [
      {
        title: "JAVA",
        period: "02:00:00",
        imageUrl:
          "https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202311/004546-476/react.png",
        price: null,
        star: null,
        description: "Introduction to Programming",
        starttime: "2024-01-13T23:33:10.000Z",
        studyrate: null,
      },
    ],
    instructor_info: [
      {
        instructor_name: "RKD",
        instructor_email: "instructor1@example.com",
        instructor_career: "10 years of experience in the field",
      },
    ],
  };

  return (
    <div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      {lectureData.lectureView.map((lecture, index) => (
        <h1>{lecture.title}</h1>
      ))}
      <div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            display: "flex",
          }}
        >
          {lectureData.lectureView.map((lecture, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img
                  src={lecture.imageUrl}
                  alt={lecture.title}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div style={{ marginLeft: "20px", left: "100%" }}>
                <h2 style={{ margin: "10px 0" }}>{lecture.description}</h2>
                <StarRating star={lecture.star} />
                <p style={{ margin: "10px 0", marginTop: "30px" }}>
                  수강 기한: {lecture.period}
                </p>
                <p style={{ margin: "10px 0", marginTop: "30px" }}>
                  가격 : {lecture.price}
                </p>
                <p style={{ margin: "10px 0", marginTop: "30px" }}>
                  수강 시작일 : {lecture.starttime}
                </p>
                <p style={{ margin: "10px 0", marginTop: "30px" }}>
                  수강률 : {lecture.studyrate}
                </p>
                <div>
                  <button style={{}}>이어서 보기</button>
                  <button style={{ marginLeft: "20PX" }}>후기 작성하기</button>
                  <button style={{ marginLeft: "20PX" }}>강의Q&A</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2
          style={{
            marginTop: "50px",
          }}
        >
          강사 소개
        </h2>
        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: "10px",
            height: "200px",
          }}
        >
          {lectureData.instructor_info.map((instructor, index) => (
            <div key={index}>
              <p>이름 : {instructor.instructor_name}</p>
              <p>이메일 : {instructor.instructor_email}</p>
              <p>경력 : {instructor.instructor_career}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>강의 목차</h2>
      </div>
      <div style={{ textAlign: "center" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {lectureData.lectureTOC_list.map((toc, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              <strong>
                {index + 1}. {toc.title}
              </strong>
              : {toc.TOC_description}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          marginTop: "10px",
          padding: "10px",
          marginTop: "50px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#C0C0C0" }}>
            <tr>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  width: "20%",
                }}
              >
                작성자
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  width: "15%",
                }}
              >
                평점
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {reviewData.review_list.map((review, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {review.userName}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <StarRating star={review.star} />
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {review.review}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LectureInfo2;
