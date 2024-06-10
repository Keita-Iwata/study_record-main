import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { deleteTodo } from '../../utils/supabaseFunction'
import { GetAllStudyRecords } from '../lib/study-record';

// `deleteTodo`関数をモックする
jest.mock('../../utils/supabaseFunction', () => ({
  deleteTodo: jest.fn(),
  addTodo: jest.fn(),
}));

jest.mock('../lib/study-record', () => ({
  GetAllStudyRecords: jest.fn(),
}));

// サンプルデータを用意する
const mockTodos = [
  { id: '1', title: 'Math Study', time: 2, created_at: '2022-01-01' },
  { id: '2', title: 'Science Study', time: 1, created_at: '2022-01-02' },
];

beforeEach(() => {
  jest.clearAllMocks();
  (GetAllStudyRecords as jest.Mock).mockResolvedValue(mockTodos);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('deletes a todo when the delete button is clicked', async () => {
  render(<App />);

  // 学習記録が表示されるのを待つ
  await waitFor(() => {
    mockTodos.forEach(todo => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });

  // 最初の削除ボタンを取得してクリック
  const deleteButton = screen.getAllByText('削除')[0];
  fireEvent.click(deleteButton);

  // 削除関数が呼ばれることを確認
  await waitFor(() => {
    expect(deleteTodo).toHaveBeenCalledWith('1');
  });

  // 学習記録が削除されることを確認
  await waitFor(() => {
    expect(screen.queryByText(mockTodos[0].title)).not.toBeInTheDocument();
  });
});
