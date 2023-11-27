import { userAtom } from "../../atoms";

import { useAtom } from "jotai";
import NoAuthorization from "./NoAuthorization";

const ProtectRoute = ({ children }: any) => {
  const [user] = useAtom(userAtom);

  return user === "" ? <NoAuthorization /> : <>{children}</>;
};

export default ProtectRoute;
