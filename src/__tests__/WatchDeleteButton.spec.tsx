import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { StudyRecord } from '../domain/record';

// モック関数を定義
const mockGetAllTodos = jest.fn().mockResolvedValue([
  new StudyRecord("1", "title1", 1, "2021-01-01T00:00:00Z"),
  new StudyRecord("2", "title2", 2, "2021-01-01T00:00:00Z"),
  new StudyRecord("3", "title3", 3, "2021-01-01T00:00:00Z"),
  new StudyRecord("4", "title4", 4, "2021-01-01T00:00:00Z"),
]);

// `deleteTodo`関数をモックする
jest.mock('../../utils/supabaseFunction', () => ({
  deleteTodo: jest.fn().mockResolvedValue(null),
  addTodo: jest.fn(),
}));

jest.mock('../lib/study-record', () => ({
  GetAllStudyRecords: () => mockGetAllTodos(),
}));

test('deletes a todo when the delete button is clicked', async () => {
  render(<App />);

  // 学習記録が表示されるのを待つ
  await waitFor(() => {
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  // テーブルの行数を取得
  let rows = screen.getByTestId("table").querySelectorAll("tr");
  expect(rows.length).toBe(5); // ヘッダー行 + 4 データ行

  // 最初の削除ボタンを取得してクリック
  const deleteButton = screen.getAllByText('削除')[0];
  fireEvent.click(deleteButton);

  // 削除が反映されるのを待つ
  await waitFor(() => {
    rows = screen.getByTestId("table").querySelectorAll("tr");
    expect(rows.length).toBe(4); // ヘッダー行 + 3 データ行
  });
});