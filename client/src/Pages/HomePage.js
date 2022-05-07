import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

// API & Utils
import intiAPI from "../Api/intiAPI";
import { users } from "../Utils/Users";

// CSS
import styles from "./HomePage.module.css";

const HomePage = ({ user }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [contests, setContests] = useState([]);
  const [isAddingContest, setIsAddingContest] = useState(false);
  const [isUpdatingContest, setIsUpdatingContest] = useState(false);
  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchAllContests();
    }
    // eslint-disable-next-line
  }, []);

  const fetchAllContests = async () => {
    try {
      const res = await intiAPI.get("/contest/all");
      setContests(res.data.contests);
    } catch (error) {
      console.log(error.response.data.errors);
      alert(error.response.data.errors.msg);
    }
  };

  const updateContestStatus = async (id) => {
    try {
      setIsUpdatingContest(true);
      await intiAPI.patch(`/contest/update/${id}`, {
        user: user.username,
      });
      fetchAllContests();
    } catch (error) {
      console.log(error.response.data.errors);
      alert(error.response.data.errors.msg);
    } finally {
      setIsUpdatingContest(false);
    }
  };

  const onAddFormSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name can't be empty!");
      setName("");
      return;
    }
    if (!link.trim()) {
      alert("Link can't be empty!");
      setLink("");
      return;
    }

    setIsAddingContest(true);

    try {
      await intiAPI.post("/contest/new", {
        name: name,
        link: link,
        postedBy: user._id,
      });
      alert("Contest added successfully!");
      fetchAllContests();
    } catch (error) {
      console.log(error.response.data.errors);
      alert(error.response.data.errors.msg);
    } finally {
      setIsAddingContest(false);
      setName("");
      setLink("");
      setShow(false);
    }
  };

  const countContestsPosted = (contestList, username) => {
    let count = 0;
    contestList.forEach((contest) => {
      if (contest.postedBy.username === username) count++;
    });
    return count;
  };

  const countContestsSolved = (contestList, username) => {
    let count = 0;
    contestList.forEach((contest) => {
      if (contest[username.toLowerCase()] === true) count++;
    });
    return count;
  };

  return (
    <div className={`${styles.homeContainer}`}>
      <div className={`${styles.homeWrapper}`}>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header className="d-flex justify-content-center align-items-center">
            <Modal.Title>Add New Contest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="inputContestName" className="form-label">
                  Contest Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputContestName"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputContestLink" className="form-label">
                  Contest Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputContestLink"
                  aria-describedby="emailHelp"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            {!isAddingContest ? (
              <Button variant="primary" onClick={onAddFormSubmit}>
                Add Contest
              </Button>
            ) : (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </button>
            )}
          </Modal.Footer>
        </Modal>

        <Accordion className={`${styles.detailsCard} mb-2`}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h2 className="fs-5 fw-bold mb-0">{user.username}</h2>
            </Accordion.Header>
            <Accordion.Body>
              <span className="fw-bold mb-0">Total Contests:</span>{" "}
              {contests.length}
              <br />
              <span className="fw-bold mb-0">Posted by me:</span>{" "}
              {countContestsPosted(contests, user.username)}
              <br />
              <span className="fw-bold mb-0">Total Contests Solved:</span>{" "}
              {countContestsSolved(contests, user.username)}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className={styles.customCard}>
          <div className={styles.addContest}>
            <Button variant="outline-primary" onClick={() => setShow(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
          <h2 className={styles.title}>Contests</h2>
          <p className={styles.line}></p>
          <div className="table-responsive">
            <table className="table table-hover table-borderless align-middle">
              <thead>
                <tr>
                  <th className="text-center">Author</th>
                  <th className="text-center">Name</th>
                  {users.map((user, idx) => {
                    return (
                      <th key={idx} className="text-center">
                        {user}
                      </th>
                    );
                  })}
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center user-select-none">
                        <div className={styles.profileImage}>
                          {contest.postedBy.username.charAt(0)}
                        </div>
                      </td>
                      <td className="text-center">
                        <a rel="noreferrer" target="_blank" href={contest.link}>
                          {contest.name}
                        </a>
                      </td>
                      {users.map((user, idx) => {
                        return (
                          <td key={idx} className="text-center">
                            {contest[user.toLowerCase()] ? (
                              <FontAwesomeIcon icon={faCheck} color="green" />
                            ) : (
                              <FontAwesomeIcon icon={faXmark} color="red" />
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center">
                        {contest[user.username.toLowerCase()] ? (
                          <button
                            type="button"
                            className="btn btn-success"
                            disabled
                          >
                            Solved
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary text-nowrap"
                            onClick={() => updateContestStatus(contest._id)}
                            disabled={isUpdatingContest}
                          >
                            Mark as Done
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
