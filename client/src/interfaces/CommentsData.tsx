
interface CommentsData {
  id: number;
  username: string;
  description: string;
  assignedUserId: number;
  assignedUser?: {
  username: string;
  };

}
export type { CommentsData };