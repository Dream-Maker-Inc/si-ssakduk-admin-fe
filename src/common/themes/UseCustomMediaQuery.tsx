import useMediaQuery from "@mui/material/useMediaQuery";
import { MediaQueries } from "./Limit";

// 브라우저 크기가 변하면 연결된 컴포넌트가 실시간으로 리렌더링 됩니다.
export const useCustomMediaQuery = () => {
  const isExtraSmall = useMediaQuery(MediaQueries.xs);
  const isSmall = useMediaQuery(MediaQueries.sm);
  const isMedium = useMediaQuery(MediaQueries.md);
  const isLarge = useMediaQuery(MediaQueries.lg);
  const isTablet = useMediaQuery(MediaQueries.xl);
  const isLaptop = useMediaQuery(MediaQueries.xxl);

  return {
    isExtraSmall,
    isSmall,
    isMedium,
    isLarge,
    isTablet,
    isLaptop,
  };
};
