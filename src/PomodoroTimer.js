import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import alarmSound from "./nokia.mp3";

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause/resume functionality

  const [play] = useSound(alarmSound);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      // Check if timer is active and not paused
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            play(); // Play sound when timer reaches 0
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
            setIsActive(false);
            setIsPaused(false); // Reset the paused state
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && !isPaused && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds, minutes, isBreak, play]);

  const handleStartPause = () => {
    setIsActive(true);
    setIsPaused(false); // Reset the paused state when starting
  };

  const handlePause = () => {
    setIsActive(true);
    setIsPaused(true); // Set the paused state to true
  };

  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false); // Reset the paused state
  };

  const handleReset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
    setIsPaused(false); // Reset the paused state
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>{isBreak ? "Break" : "Focus"} Time</h1>
          <pre className="display-1">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </pre>
          <ProgressBar
            animated
            now={
              ((isBreak
                ? 5 * 60 - (minutes * 60 + seconds)
                : 25 * 60 - (minutes * 60 + seconds)) /
                (isBreak ? 5 * 60 : 25 * 60)) *
              100
            }
          />
          <div className="mt-4">
            {!isActive ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartPause}
                className="me-4"
              >
                <FontAwesomeIcon icon={faPlay} /> Start
              </Button>
            ) : isPaused ? (
              <Button
                variant="success"
                size="lg"
                onClick={handleResume}
                className="me-4"
              >
                <FontAwesomeIcon icon={faPlay} /> Resume
              </Button>
            ) : (
              <Button
                variant="warning"
                size="lg"
                onClick={handlePause}
                className="me-4"
              >
                <FontAwesomeIcon icon={faPause} /> Pause
              </Button>
            )}
            <Button variant="danger" size="lg" onClick={handleReset}>
              <FontAwesomeIcon icon={faRedo} /> Reset
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PomodoroTimer;
