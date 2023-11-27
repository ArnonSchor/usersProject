import { userAtom } from "../../atoms";

import { useAtom } from "jotai";
import PageNotFound from "../pages/ErrorPages/PageNotFound";

const ProtectRoute = ({ children }: any) => {
  const [user] = useAtom(userAtom);

  return user === "" ? <PageNotFound /> : <>{children}</>;
};

export default ProtectRoute;
