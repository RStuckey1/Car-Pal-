
interface CommentsData {
  id: number;
  name: string;
  description: string;
  assignedUserId: number;
  assignedUser?: {
  username: string;
  };

}
export type { CommentsData };