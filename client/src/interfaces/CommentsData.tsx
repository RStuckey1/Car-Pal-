
interface CommentsData {
  id: number;
  name: string;
  description: string;
  assignedUserId: number;
  status: string;
  assignedUser?: {
  username: string;
  };

}
export type { CommentsData };