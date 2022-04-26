// import { useState } from "react";
// import { createContext } from "react/cjs/react.production.min";
import useHttp from "../../Hooks/usehttp";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  const createTask = (taskText,taskdata) => {
    const generatedId = taskdata.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://react-http-4e214-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null,taskText)
    );
  };
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
