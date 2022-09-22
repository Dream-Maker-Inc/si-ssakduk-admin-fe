import { Colors } from '@/common/themes/Color'
import { AddRounded } from '@mui/icons-material'
import { css, IconButton, IconButtonProps, Tooltip } from '@mui/material'

export type CreateActionIconProps = {
  tooltip?: string
  iconButtonProps?: IconButtonProps
}

export const CreateActionIcon = ({
  tooltip = '',
  iconButtonProps,
}: CreateActionIconProps) => (
  <Tooltip title={tooltip}>
    <IconButton size={'small'} css={st.optionIcon} {...iconButtonProps}>
      <AddRounded />
    </IconButton>
  </Tooltip>
)

const st = {
  optionIcon: css`
    background-color: ${Colors.BackgroundDefault};
    border: 1px solid ${Colors.Border};
    border-radius: 4px;
  `,
}
