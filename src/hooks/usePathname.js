import { useLocation } from "react-router";

function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export default usePathname;
