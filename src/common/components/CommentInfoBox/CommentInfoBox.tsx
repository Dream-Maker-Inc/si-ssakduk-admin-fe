import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import {
  BlockRounded,
  FavoriteBorderRounded,
  LockOpenRounded,
} from '@mui/icons-material'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'

export type CommentInfoBoxProps = {
  model: {
    profileImage: string
    author: string
    content: string
    createdAt: string
    likedCount: number
  }
  blindState: {
    reason: string
    value: boolean
    onChange: (v: boolean) => void
  }
}

export const CommentInfoBox = (p: CommentInfoBoxProps) => {
  const { model, blindState } = p

  return (
    <div css={st.root}>
      {blindState.value && (
        <div css={st.reasonContainer}>
          <Typography>{blindState.reason}</Typography>

          <div css={st.reasonOptionIconWrapper}>
            <Tooltip title={'비공개 해제'}>
              <IconButton
                size={'small'}
                color={'error'}
                onClick={() => blindState.onChange(!blindState.value)}
              >
                <BlockRounded />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}

      <div css={st.commentContainer(blindState.value)}>
        <Avatar src={model.profileImage} />

        <div css={st.content}>
          <div css={st.top}>
            <Typography variant={'subtitle2'}>{model.author}</Typography>

            <Typography
              variant={'body2'}
              whiteSpace={'break-spaces'}
              sx={{ opacity: 0.8 }}
            >{`  ·  ${model.createdAt}`}</Typography>
          </div>

          <Typography variant={'body2'} color={Colors.TextSecondary}>
            {model.content}
          </Typography>

          <div css={st.optionWrapper}>
            <FavoriteBorderRounded fontSize='small' color={'inherit'} />

            <Typography variant='body2' color={'inherit'}>
              {model.likedCount}
            </Typography>
          </div>
        </div>

        <div>
          {!blindState.value && (
            <Tooltip title={'비공개 처리'}>
              <IconButton
                size={'small'}
                color={'success'}
                onClick={() => blindState.onChange(!blindState.value)}
              >
                <LockOpenRounded />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

const st = {
  root: css`
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  `,
  reasonContainer: css`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: #33333399;
    color: #fff;

    z-index: 1;
  `,
  reasonOptionIconWrapper: css`
    position: absolute;
    top: 16px;
    right: 24px;
    border-radius: 36px;
    background-color: #eee;
  `,
  commentContainer: (isBlind: boolean) => css`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    padding: 16px 24px;

    background-color: #fff;
    border-bottom: 1px solid ${Colors.Border};

    opacity: ${isBlind && 0.6};
  `,
  top: css`
    display: flex;
    color: ${Colors.TextPrimary};
  `,
  content: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  optionWrapper: css`
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${Colors.TextSecondary};
    margin-top: 12px;
  `,
}
