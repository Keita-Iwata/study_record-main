import { Button } from "@chakra-ui/react";
import "./App.css";
import { StudyRecord } from "./domain/record";
import { useEffect, useState } from "react";
import { GetAllStudyRecords } from "./lib/study-record";

function App() {
  const [todos, setTodos] = useState<StudyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllTodos = async () => {
      const StudyRecordsData = await GetAllStudyRecords();
      setTodos(StudyRecordsData);
      setIsLoading(false);
      console.log(StudyRecordsData);
    };
    getAllTodos();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Vite + React!!!!!!</h1>
      <h2>Hello World</h2>
      <Button>ボタン</Button>
    </>
  );
}

export default App;
