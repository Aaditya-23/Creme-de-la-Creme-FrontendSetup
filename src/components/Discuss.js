import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/discuss.css";
import { commentCourse, fetchCourse } from "../features/CoursesSlice";

export default function Discuss() {
  const { id } = useParams();
  const [Course, setCourse] = useState([]);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState(null);

  async function getCourse() {
    const course = await fetchCourse(id);
    setCourse(course);
    setComments(course[0].comments);
  }

  useEffect(() => {
    async function getCourse() {
      const course = await fetchCourse(id);
      setCourse(course);
      setComments(course[0].comments);
    }
    getCourse();
  }, [id]);

  const handleReplyClick = (e, target = null) => {
    const elementId = target || e?.target.dataset.user;
    document.querySelectorAll(".write-reply").forEach((reply) => {
      if (reply.id === elementId) reply.classList.toggle("hide");
      else {
        reply.classList.add("hide");
      }
    });
    document.querySelectorAll(".write-reply textarea").forEach((textbox) => {
      textbox.value = "";
    });
  };

  const handlePostReply = async (e) => {
    const body = {
      courseId: Course[0]._id,
      parentId: e.target.dataset.user,
      comment: { comment: value.trim() },
    };
    await commentCourse(body);
    getCourse();
    handleReplyClick(null, e.target.dataset.user);
  };

  return (
    <div className="discuss">
      <div className="caption">Discuss</div>
      <div className="write-comment">
        <textarea
          onClick={() => {
            handleReplyClick(null);
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="comment-content"
          placeholder="Write a comment..."
        ></textarea>
        <button
          type="button"
          className="post-comment"
          onClick={async (e) => {
            await commentCourse({
              courseId: Course[0]._id,
              parentId: null,
              comment: { comment: value.trim() },
            });

            getCourse();

            document.querySelector(".write-comment textarea").value = "";
          }}
        >
          Comment
        </button>
      </div>

      <div className="heading-separator">Comments</div>
      <div className="comments">
        {comments.map((comment, i) => {
          const time = Math.floor(
            (Date.now() - parseInt(comment[0].createdAt)) / 3600000
          );
          return (
            <div key={i} className="parent">
              <div className="avatar-separator">
                {(comment[0].user.avatarURL && (
                  <Avatar
                    alt={comment[0].user.name.charAt(0).toUpperCase()}
                    src={
                      process.env.REACT_APP_SERVER_URL +
                      comment[0].user.avatarURL
                    }
                    sx={{ width: 46, height: 46, bgcolor: "black" }}
                  />
                )) || (
                  <Avatar sx={{ width: 46, height: 46, bgcolor: "black" }}>
                    {comment[0].user.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <div className="comment-separator"></div>
              </div>
              <div className="comment-container">
                <div className="parentheading">
                  <div className="parentName">{comment[0].user.name}</div>
                  <span className="time-lapsed">
                    {(time >= 24 && parseInt(time / 24) + " Days ago") ||
                      (time < 24 && time + " Hours ago")}
                  </span>
                </div>
                <div className="rest-content">
                  {comment.map((comment, i) => {
                    const replyTime = Math.floor(
                      (Date.now() - parseInt(comment.createdAt)) / 3600000
                    );
                    if (i === 0) {
                      return (
                        <div key={i} className="message">
                          {comment.comment}
                          <span
                            className="material-icons reply-icon"
                            data-user={comment._id}
                            onClick={(e) => {
                              handleReplyClick(e);
                            }}
                          >
                            reply
                          </span>
                          <div id={comment._id} className="write-reply hide">
                            <textarea
                              className="comment-content"
                              placeholder="Write a comment..."
                              onChange={(e) => {
                                setValue(e.target.value);
                              }}
                            ></textarea>
                            <button
                              type="button"
                              data-user={comment._id}
                              className="post-comment"
                              onClick={(e) => {
                                handlePostReply(e);
                              }}
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="reply">
                        {(comment.user.avatarURL && (
                          <Avatar
                            alt={comment.user.name.charAt(0).toUpperCase()}
                            src={
                              process.env.REACT_APP_SERVER_URL +
                              comment.user.avatarURL
                            }
                            sx={{ width: 26, height: 26, bgcolor: "black" }}
                          />
                        )) || (
                          <Avatar
                            sx={{ width: 26, height: 26, bgcolor: "black" }}
                          >
                            {comment.user.name.charAt(0).toUpperCase()}
                          </Avatar>
                        )}
                        <div className="respondent">
                          <div className="respondentName">
                            {comment.user.name}
                          </div>
                          <span className="time-lapsed">
                            {(replyTime >= 24 &&
                              parseInt(replyTime / 24) + " Days ago") ||
                              (replyTime < 24 && replyTime + " Hours ago")}
                          </span>
                          <div className="reply-message">{comment.comment}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
