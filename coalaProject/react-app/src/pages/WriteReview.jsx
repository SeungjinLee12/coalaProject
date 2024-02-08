import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const WriteReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { lectureNo, lectureTitle } = state;
  const { currentUser } = useContext(AuthContext);

  window.addEventListener("DOMContentLoaded", () => {
    const starRating = new StarRating("form");
  });

  class StarRating {
    constructor(qs) {
      this.ratings = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "5" },
      ];
      this.rating = null;
      this.el = document.querySelector(qs);

      this.init();
    }
    init() {
      this.el?.addEventListener("change", this.updateRating.bind(this));

      // stop Firefox from preserving form data between refreshes
      try {
        this.el?.reset();
      } catch (err) {
        console.error("Element isn’t a form.");
      }
    }
    updateRating(e) {
      // clear animation delays
      Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach((el) => {
        el.className = "rating__label";
      });

      const ratingObject = this.ratings.find((r) => r.id === +e.target.value);
      const prevRatingID = this.rating?.id || 0;

      let delay = 0;
      this.rating = ratingObject;
      this.ratings.forEach((rating) => {
        const { id } = rating;

        // add the delays
        const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`);

        if (id > prevRatingID + 1 && id <= this.rating.id) {
          ++delay;
          ratingLabel.classList.add(`rating__label--delay${delay}`);
        }

        // hide ratings to not read, show the one to read
        const ratingTextEl = this.el.querySelector(`[data-rating="${id}"]`);

        if (this.rating.id !== id) ratingTextEl.setAttribute("hidden", true);
        else ratingTextEl.removeAttribute("hidden");
      });
      console.log(`Selected Rating: ${this.rating?.name}`);
    }
  }

  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleStarClick = (star) => {
    console.log("star", star);
    setSelectedStars(star);
  };

  const submitReview = () => {
    const userNo = currentUser.USER_NO;
    if (selectedStars !== 0 && reviewText !== "") {
      axios
        .post(`${serverUrl}/lecture/writeReview`, {
          STAR: selectedStars,
          userNo: userNo,
          lectureNo: lectureNo,
          REVIEW: reviewText,
        })
        .then((res) => {
          navigate(`/lecture/${lectureNo}`);
          alert("리뷰가 작성되었습니다");
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (selectedStars === 0 || selectedStars === null) {
      alert("별점을 선택해주세요");
    } else if (reviewText === null || reviewText === "") {
      alert("리뷰를 작성해주세요");
    }
  };

  return (
    <div>
      <div>
        <h1>강의 후기 - {lectureTitle}</h1>
      </div>
      <div style={{ display: "flex" }}>
        <h3>별점을 선택해주세요 :</h3>
        <form class="rating" style={{ marginLeft: "2px", marginBottom: "3px" }}>
          <div class="rating__stars">
            <input
              id="rating-1"
              className="rating__input rating__input-1"
              type="radio"
              name="rating"
              value="1"
              onClick={() => handleStarClick(1)}
            />
            <input
              id="rating-2"
              className="rating__input rating__input-2"
              type="radio"
              name="rating"
              value="2"
              onClick={() => handleStarClick(2)}
            />
            <input
              id="rating-3"
              className="rating__input rating__input-3"
              type="radio"
              name="rating"
              value="3"
              onClick={() => handleStarClick(3)}
            />
            <input
              id="rating-4"
              className="rating__input rating__input-4"
              type="radio"
              name="rating"
              value="4"
              onClick={() => handleStarClick(4)}
            />
            <input
              id="rating-5"
              className="rating__input rating__input-5"
              type="radio"
              name="rating"
              value="5"
              onClick={() => handleStarClick(5)}
            />
            <label className="rating__label" for="rating-1">
              <svg
                className="rating__star"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <g transform="translate(16,16)">
                  <circle
                    className="rating__star-ring"
                    fill="none"
                    stroke="#000"
                    stroke-width="16"
                    r="8"
                    transform="scale(0)"
                  />
                </g>
                <g
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g transform="translate(16,16) rotate(180)">
                    <polygon
                      className="rating__star-stroke"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="none"
                    />
                    <polygon
                      className="rating__star-fill"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="#000"
                    />
                  </g>
                  <g
                    transform="translate(16,16)"
                    stroke-dasharray="12 12"
                    stroke-dashoffset="12"
                  >
                    <polyline
                      className="rating__star-line"
                      transform="rotate(0)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(72)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(144)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(216)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(288)"
                      points="0 4,0 16"
                    />
                  </g>
                </g>
              </svg>
              {/* <span class="rating__sr">1 star—Terrible</span> */}
            </label>
            <label className="rating__label" for="rating-2">
              <svg
                className="rating__star"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <g transform="translate(16,16)">
                  <circle
                    className="rating__star-ring"
                    fill="none"
                    stroke="#000"
                    stroke-width="16"
                    r="8"
                    transform="scale(0)"
                  />
                </g>
                <g
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g transform="translate(16,16) rotate(180)">
                    <polygon
                      className="rating__star-stroke"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="none"
                    />
                    <polygon
                      className="rating__star-fill"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="#000"
                    />
                  </g>
                  <g
                    transform="translate(16,16)"
                    stroke-dasharray="12 12"
                    stroke-dashoffset="12"
                  >
                    <polyline
                      className="rating__star-line"
                      transform="rotate(0)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(72)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(144)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(216)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(288)"
                      points="0 4,0 16"
                    />
                  </g>
                </g>
              </svg>
              {/* <span class="rating__sr">2 stars—Bad</span> */}
            </label>
            <label className="rating__label" for="rating-3">
              <svg
                className="rating__star"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <g transform="translate(16,16)">
                  <circle
                    className="rating__star-ring"
                    fill="none"
                    stroke="#000"
                    stroke-width="16"
                    r="8"
                    transform="scale(0)"
                  />
                </g>
                <g
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g transform="translate(16,16) rotate(180)">
                    <polygon
                      className="rating__star-stroke"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="none"
                    />
                    <polygon
                      className="rating__star-fill"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="#000"
                    />
                  </g>
                  <g
                    transform="translate(16,16)"
                    stroke-dasharray="12 12"
                    stroke-dashoffset="12"
                  >
                    <polyline
                      className="rating__star-line"
                      transform="rotate(0)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(72)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(144)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(216)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(288)"
                      points="0 4,0 16"
                    />
                  </g>
                </g>
              </svg>
              {/* <span class="rating__sr">3 stars—OK</span> */}
            </label>
            <label className="rating__label" for="rating-4">
              <svg
                className="rating__star"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <g transform="translate(16,16)">
                  <circle
                    className="rating__star-ring"
                    fill="none"
                    stroke="#000"
                    stroke-width="16"
                    r="8"
                    transform="scale(0)"
                  />
                </g>
                <g
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g transform="translate(16,16) rotate(180)">
                    <polygon
                      className="rating__star-stroke"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="none"
                    />
                    <polygon
                      className="rating__star-fill"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="#000"
                    />
                  </g>
                  <g
                    transform="translate(16,16)"
                    stroke-dasharray="12 12"
                    stroke-dashoffset="12"
                  >
                    <polyline
                      className="rating__star-line"
                      transform="rotate(0)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(72)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(144)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(216)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(288)"
                      points="0 4,0 16"
                    />
                  </g>
                </g>
              </svg>
              {/* <span class="rating__sr">4 stars—Good</span> */}
            </label>
            <label className="rating__label" for="rating-5">
              <svg
                className="rating__star"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <g transform="translate(16,16)">
                  <circle
                    className="rating__star-ring"
                    fill="none"
                    stroke="#000"
                    stroke-width="16"
                    r="8"
                    transform="scale(0)"
                  />
                </g>
                <g
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g transform="translate(16,16) rotate(180)">
                    <polygon
                      className="rating__star-stroke"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="none"
                    />
                    <polygon
                      className="rating__star-fill"
                      points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                      fill="#000"
                    />
                  </g>
                  <g
                    transform="translate(16,16)"
                    stroke-dasharray="12 12"
                    stroke-dashoffset="12"
                  >
                    <polyline
                      className="rating__star-line"
                      transform="rotate(0)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(72)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(144)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(216)"
                      points="0 4,0 16"
                    />
                    <polyline
                      className="rating__star-line"
                      transform="rotate(288)"
                      points="0 4,0 16"
                    />
                  </g>
                </g>
              </svg>
              {/* <span class="rating__sr">5 stars—Excellent</span> */}
            </label>
            <p className="rating__display" data-rating="1" hidden>
              {/* Terrible */}
            </p>
            <p className="rating__display" data-rating="2" hidden>
              {/* Bad */}
            </p>
            <p className="rating__display" data-rating="3" hidden>
              {/* OK */}
            </p>
            <p className="rating__display" data-rating="4" hidden>
              {/* Good */}
            </p>
            <p className="rating__display" data-rating="5" hidden>
              {/* Excellent */}
            </p>
          </div>
        </form>
      </div>
      <div>
        <textarea
          type="text"
          style={{
            marginTop: "5px",
            border: "3px solid black",
            width: "100%",
            height: "300px",
            padding: "10px",
            boxSizing: "border-box",
            whiteSpace: "normal", // 줄 바꿈을 하지 않음
          }}
          value={reviewText}
          onChange={handleReviewTextChange} // 입력된 값을 표시
        />
      </div>
      <div>
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          onClick={submitReview}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const blue1 = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue1[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue1[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue1[400]}, inset 0 -2px 1px ${blue1[600]};

  &:hover {
    background-color: ${blue1[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }

  `
);

export default WriteReview;
