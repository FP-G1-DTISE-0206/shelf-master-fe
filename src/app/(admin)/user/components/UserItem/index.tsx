import { ProfileResponse } from "@/types/profile";
import { TableCell, TableRow } from "flowbite-react";
import { FC } from "react";
interface UserItemProps {
  user: ProfileResponse;
}
const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <>
      <TableRow key={user.id}>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.userName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.roles.map((role) => role.name).join(", ")}</TableCell>
      </TableRow>
    </>
  );
};
export default UserItem;
