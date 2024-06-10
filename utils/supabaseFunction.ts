import { supabase } from "./supabase";

// Supabaseにデータを挿入する関数
export const addTodo = async (title:string, time:number) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert([{ title: title, time: time }])
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTodo = async (id:string) => {
  const { data, error } = await supabase
    .from("study-record")
    .delete()
    .match({ id });

  if (error) {
    throw error;
  }

  return data;
};