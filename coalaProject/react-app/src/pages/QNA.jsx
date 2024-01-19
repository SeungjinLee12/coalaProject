import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QNA = () => {
  const lectureData = {
    question_info: [
      {
        title_q: "질문1",
        question:
          "디ㅏ러ㅏ룽나ㅓ룽남러ㅏㅣㅁㄹ더ㅏㅈ미러ㅏㄷㅁ 러ㅏㅣㅇ너라ㅣㅁㄴ어리ㅏㅓㄹ ㅣㄴㅁ어 ㅣㅏㅇ널니마ㅓ리ㅏㅇㄴㅁ ㅓㅣㅁ ㅓㄴ이러 ㄴㅁㅇ;ㅓㄹ ㅣㄴ;ㅓ린 밀 어미 ㅓ링;ㄴ머 링머 리ㅏ;ㄴ얼 ㅣㅏㄴ멀 ㅣㅏㄴㅁ어리ㅏ ㅓㅁㄴ이; ㅓ민ㅇ;ㅓㄹ ㅣ너 리ㅏㄴ어 ㅣㅏㄴ어 ㅏㅣㄹ ㅓ ",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
      {
        title_q: "JAVA",
        question: "TEST12211232133",
        questionFileUrl: "TEST112321123231",
        inserttime_q: null,
        name_q: "이승진123",
        title_l: "JAVA",
      },
    ],
    reply_list: [
      {
        reply: "1",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply: "2",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply: "3",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply: "4",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply: "5",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply: "6",
        name_r: "성우창12",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: null,
      },
      {
        reply:
          "You can find the download link in the course materials section.",
        name_r: "이승진123",
        inserttime_r: "2024-01-12T00:26:29.000Z",
      },
    ],

    // ... (lectureData 객체는 변경되지 않음)
  };

  return (
    <div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      {lectureData.question_info.length > 0 && (
        <>
          <div>
            <h1 style={{ marginTop: "20px" }}>
              {lectureData.question_info[0].title_l} - Q&A
            </h1>
            <h2>제목 : {lectureData.question_info[0].title_q}</h2>
            <h4>작성자 : {lectureData.question_info[0].name_q}</h4>
            <h5>작성일 : {lectureData.question_info[0].inserttime_q}</h5>

            <div style={{ whiteSpace: "normal" }}>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  minHeight: "200px",
                }}
              >
                {lectureData.question_info[0].question}
              </div>
            </div>
          </div>
        </>
      )}
      <h2 style={{ marginTop: "20px" }}>댓글</h2>
      <div
        style={{
          border: "1px solid #ccc",
          marginTop: "10px",
          padding: "10px",
          // marginTop: "50px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {lectureData.reply_list.map((reply, index) => (
            <tr key={index}>
              <td
                style={{
                  border: "1px solid ",
                  height: "150px", // 높이 조절
                  display: "flex",
                  flexDirection: "column", // 열 방향으로 정렬
                }}
              >
                {/* 위쪽 칸 (이름) */}
                <div
                  style={{
                    backgroundColor: "#c0c0c0",
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    borderBottom: "1px solid #ccc", // 아래쪽 테두리 추가
                  }}
                >
                  <p style={{ textAlign: "center" }}>▶ {reply.name_r}</p>
                  <div
                    style={{
                      flex: "1", // 오른쪽에 정렬
                      textAlign: "right",
                    }}
                  >
                    {formatDate(reply.inserttime_r)}{" "}
                  </div>
                </div>

                {/* 아래쪽 칸 (내용) */}
                <div
                  style={{
                    flex: "1", // 아래쪽에 정렬
                    padding: "8px",
                  }}
                >
                  {reply.reply}
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

const formatDate = (datetimeString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(datetimeString).toLocaleString("ko-KR", options);
};

export default QNA;
