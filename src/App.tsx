import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import { StudyRecord } from "./domain/record";
import { formatDate } from "./domain/record";
import { addTodo, deleteTodo, updateTodo } from "../utils/supabaseFunction";
import { useEffect, useState } from "react";
import { GetAllStudyRecords } from "./lib/study-record";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  title: string;
  time: number;
};

function App() {
  const [todos, setTodos] = useState<StudyRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose: originalOnClose } = useDisclosure();
  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<StudyRecord | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    const getAllTodos = async () => {
      const StudyRecordsData = await GetAllStudyRecords();
      setTodos(StudyRecordsData);
      setIsLoading(false);
      console.log(StudyRecordsData);
    };
    getAllTodos();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isEditTodo && editingTodo) {
      const { title, time } = data;
      const updatedRecord = await updateTodo(editingTodo.id, title, time); // Supabaseにデータを更新
      setTodos(todos.map(todo => todo.id === editingTodo.id ? {
        ...updatedRecord[0],
        created_at: formatDate(updatedRecord[0].created_at) // 日付をフォーマット
      } : todo));
      reset(); // フォームをリセット
      setEditingTodo(null); // 編集状態をリセット
    } else {
      const { title, time } = data;
      const insertedRecord = await addTodo(title, time); // Supabaseにデータを挿入
      setTodos([...todos, {
        ...insertedRecord[0],
        created_at: formatDate(insertedRecord[0].created_at) // 日付をフォーマット
      }]);
      reset(); // フォームをリセット
    }
    onClose(); // モーダルを閉じる
  };

  const onDelete = async (id:string) => {
    console.log(id);
    try {
      await deleteTodo(id);
      // 削除後のtodosをセット
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("データの削除に失敗しました", error);
      setError("データの削除に失敗しました");
    }
  }

  const onNewOpen = () => {
    setIsEditTodo(false);
    reset({ title: "", time: "" });
    onOpen();
  }

  const onEditOpen = (todo: StudyRecord) => {
    setIsEditTodo(true);
    setEditingTodo(todo);
    reset(todo);
    onOpen();
  }

  const onClose = () => {
    reset(); // フォームをリセット
    setEditingTodo(null); // 編集状態をリセット
    setIsEditTodo(false); // 編集モードをリセット
    originalOnClose(); // 元の onClose 関数を呼び出してモーダルを閉じる
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 data-testid="title">学習記録アプリ</h1>
      <Button className="newRegister" data-testid="register-modal" onClick={onNewOpen} mt={4} mb={4}>学習内容の登録はこちら</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader data-testid="modal-header">{isEditTodo ? "登録内容の編集" : "新規登録"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                data-testid="content-input"
                placeholder='学習内容を記載'
                id="title"
                {...register("title", { required: "学習内容を記載してください" })}
                mb="3"
              />
              {errors.title && <p data-testid="no-content-error" style={{ color: 'red' }}>{String(errors.title.message)}</p>}
              <Input
                data-testid="time-input"
                placeholder='学習時間を記載'
                id="time"
                {...register("time", {
                  required: "学習時間を入力してください",
                  validate: value => value >= 1 || "時間は1以上である必要があります"
                 })}
                mb="3"
              />
              {errors.time && <p data-testid="time-error" style={{ color: 'red' }}>{String(errors.time.message)}</p>}
              <Button data-testid="register-button" type="submit" mr="3">{isEditTodo ? "保存" : "登録"}</Button>
              <Button onClick={onClose}>キャンセル</Button>
              <p className="error-message" data-testid="error">{error}</p>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <TableContainer>
        <Table data-testid="table">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>学習内容</Th>
              <Th>学習時間</Th>
              <Th>日付</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo) => (
              <Tr data-testid="study-item" key={todo.id}>
                <Td>{todo.id}</Td>
                <Td>{todo.title}</Td>
                <Td>{todo.time}</Td>
                <Td>{todo.created_at}</Td>
                <Button onClick={() => onEditOpen(todo)}>編集</Button>
                <Button onClick={() => onDelete(todo.id)}>削除</Button>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
