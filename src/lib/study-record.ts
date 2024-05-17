import { supabase } from "../../utils/supabase";
import { StudyRecord } from "../domain/record";

export const GetAllStudyRecords = async () => {
  const response = await supabase.from("study-record").select("*");
  if (response.error) {
    throw new Error(response.error.message);
  }

  const studyRecordsData = response.data.map((record) => {
    return StudyRecord.newStudyRecord(
      record.id,
      record.title,
      record.time,
      record.created_at
    );
  });

  return studyRecordsData;
};
