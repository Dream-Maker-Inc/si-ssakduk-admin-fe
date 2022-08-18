// 반응형 포인트
export const BreakPoints = {
  xs: 376,
  sm: 576,
  md: 768, // Mobile
  lg: 900,
  xl: 1200, // Tablet
  xxl: 1440, // Laptop
};

// 미디어 쿼리
export const MediaQueries = {
  xs: `(max-width:${BreakPoints.xs}px)`,
  sm: `(max-width:${BreakPoints.sm}px)`,
  md: `(max-width:${BreakPoints.md}px)`,
  lg: `(max-width:${BreakPoints.lg}px)`,
  xl: `(max-width:${BreakPoints.xl}px)`,
  xxl: `(max-width:${BreakPoints.xxl}px)`,
};
