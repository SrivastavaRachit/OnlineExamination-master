import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputBase } from "@material-ui/core";
import update from "immutability-helper";
import app_config from "../config";
import Swal from "sweetalert2";

const AddPaper = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const url = app_config.api_url;

  const [questionList, setQuestionList] = React.useState([
    {
      name: "Question 1",
      answertype: "text",
      answer: "",
      options: ["opt1", "opt2", "opt3"],
    },
    {
      name: "Question 2",
      answertype: "radio",
      answer: "",
      options: ["opt1", "opt2", "opt3"],
    },
  ]);

  const paperform = {
    title: "",
    course: "",
    max: "",
    author: currentUser._id,
    questions: [],
    created: new Date(),
  };

  const formSubmit = (values) => {
    values.questions = questionList;
    console.log(values);

    fetch(url + "/paper/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Paper Added Successfully",
        });
      });
  };

  const addNewQuestion = () => {
    const newQues = {
      name: "Question " + (questionList.length + 1),
      answertype: "text",
      answer: "",
      options: ["opt1", "opt2", "opt3"],
    };

    setQuestionList([...questionList, newQues]);

    // const newData = update(questionPaper, {
    //     questions: {
    //         $push: [newQues]
    //     }
    // });

    // setQuestionPaper(newData);
  };

  // const createCourse = () => {
  //     let formdata = tempForm;
  //     formdata['data'] = curriculum;
  //     formdata['avatar'] = avatar;
  //     console.log(formdata);
  //     courseService.addCourse(formdata)
  //         .then(res => {
  //             console.log(res);
  //             Swal.fire({
  //                 icon: 'success',
  //                 title: 'Sucess',
  //                 text: 'Course Added Successfully'
  //             })
  //         })
  // }

  // const handleRename = (prop, val, ques_i) => {

  //     const questions = {}

  //     if (prop == 'ques_name') {
  //         questions[ques_i] = { name: { $set: val } };
  //     }

  //     const newData = update(questionPaper, {
  //         questions: questions
  //     });

  //     setQuestionPaper(newData);
  // }

  const setOption = (q_i, index, e) => {
    const options = {};
    const questions = {};

    options[index] = { $set: e.target.value };
    questions[q_i] = { options: options };

    const newData = update(questionList, questions);

    console.log(newData);
    setQuestionList(newData);
  };

  const addOption = (q_i) => {
    const questions = {};

    questions[q_i] = { options: { $push: ["new option"] } };

    const newData = update(questionList, questions);

    console.log(newData);
    setQuestionList(newData);
  };

  const changeType = (q_i, e) => {
    const questions = {};

    questions[q_i] = { answertype: { $set: e.target.value } };
    questions[q_i] = { answertype: { $set: e.target.value } };

    const newData = update(questionList, questions);

    console.log(newData);
    setQuestionList(newData);
  };

  const displayOptions = (q_i, type, options) => {
    if (type == "radio" || type == "checkbox") {
      return (
        <>
          {options.map((op, i) => {
            return (
              <input
                className="form-control mt-3 w-50"
                value={op}
                onChange={(e) => setOption(q_i, i, e)}
              />
            );
          })}
          <Button
            onClick={(e) => addOption(q_i)}
            className="mt-3"
            color="primary"
            variant="contained"
          >
            {" "}
            +{" "}
          </Button>
        </>
      );
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <Formik initialValues={paperform} onSubmit={formSubmit}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <div class="input-group mt-3">
                    <span class="input-group-text">Title</span>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      value={values.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div class="input-group mt-3">
                        <span class="input-group-text">Course</span>
                        <input
                          type="text"
                          class="form-control"
                          id="course"
                          value={values.course}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="input-group mt-3">
                        <span class="input-group-text">Max Marks :</span>
                        <input
                          type="number"
                          class="form-control"
                          id="max"
                          value={values.max}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-25 mt-5"
                    variant="outlined"
                  >
                    Create Paper
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>

        {
          // questionPaper.questions.map((question, sect_i) =>
          // (
          //     <div style={{ padding: '2rem', border: '1px solid gray', background: 'grey', marginTop: '1rem' }} key={sect_i}>
          //         <h3>Question {`${sect_i + 1}: `}</h3>
          //         <input className="form-control" value={question.name} onChange={e => handleRename('sect_name', e.target.value, sect_i, 0)} />
          //         <input value={question.description} onChange={e => handleRename('question', e.target.value, sect_i, 0)} />

          //     </div>
          // ))
          questionList.map((question, index) => (
            <div className="card mt-5">
              <div className="card-body">
                <div class="input-group mt-3">
                  <span class="input-group-text" id={"question" + index}>
                    {question.name}
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Username"
                    aria-describedby={"question" + index}
                  />
                </div>
                <div class="input-group mt-3">
                  <span class="input-group-text">Question Type</span>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={question.answertype}
                    onChange={(e) => changeType(index, e)}
                  >
                    <option value="">Open this select menu</option>
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </div>
                <div className="my-3">
                  {displayOptions(index, question.answertype, question.options)}
                </div>
              </div>
            </div>
          ))
        }
        <Button
          onClick={addNewQuestion}
          className="mt-5"
          color="primary"
          variant="contained"
        >
          Add New Question
        </Button>
      </div>
    </div>
  );
};

export default AddPaper;
