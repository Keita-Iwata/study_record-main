export class StudyRecord {
  constructor(
    public id: string,
    public title: string,
    public time: number,
    public created_at: string
  ){}

  public static newStudyRecord(
    id: string,
    title: string,
    time: number,
    created_at: string
  ):StudyRecord{
    return new StudyRecord(
      id,
      title,
      time,
      formatDate(created_at)
    )
  }
}

export const formatDate = (input: string): string => {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}