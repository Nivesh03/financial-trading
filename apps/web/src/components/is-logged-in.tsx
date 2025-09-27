import { useQuery } from "@tanstack/react-query";
import { allAuthQueries } from "@/hooks/use-user";

const IsLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const { data: userSession } = useQuery(allAuthQueries.getUserQuery());
  if (!userSession) return null;
  return <>{children}</>;
};

export default IsLoggedIn;
