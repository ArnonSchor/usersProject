import Input from "@mui/material/Input";
import { useAtom } from "jotai";
import { userAtom } from "../../atoms";

export const TheSite = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h1> hello {user}</h1>
      <Input placeholder="heading" />
      <Input placeholder="content" />
      <button>log out</button>
      <button>delete account</button>
      <button>reset password</button>
    </div>
  );
};
