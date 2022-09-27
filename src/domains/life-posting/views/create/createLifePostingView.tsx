import { DataRow } from '@/common/components/DataRow'
import { ContentContainer } from '@/common/ContentContainer'
import { PageTemplate } from '@/common/templates'
import { Colors } from '@/common/themes/Color'
import { css } from '@emotion/react'
import { Button, TextField, Typography } from '@mui/material'
import { useCreateLifePostingView } from './useCreateLifePostingView'

export const CreateLifePostingView = () => {
  const { data } = useCreateLifePostingView()
  const {
    breadcrumbModels,
    titleTextFieldProps,
    contentTextFieldProps,
    sponsorLinkState,
    attachmentsInputProps,
    cancelButtonProps,
    submitButtonProps,
  } = data

  return (
    <PageTemplate
      pageTitle={'라이프 글 작성'}
      subtitleModel={{
        label: (
          <Typography
            variant='h6'
            fontWeight={600}
            color={Colors.TitlePrimary}
            sx={{ opacity: 0.7 }}
          >
            {'상세 보기'}
          </Typography>
        ),
      }}
      breadcrumbModels={breadcrumbModels}
    >
      <ContentContainer>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 8px;
            color: ${Colors.TextPrimary};
          `}
        >
          <DataRow
            title='제목'
            content={<TextField fullWidth {...titleTextFieldProps} />}
          />
          <DataRow
            title='내용'
            content={
              <TextField
                fullWidth
                multiline
                rows={10}
                {...contentTextFieldProps}
              />
            }
          />
          <DataRow
            title='스폰서 링크'
            content={<TextField fullWidth {...sponsorLinkState} />}
          />
          <DataRow
            title='파일 첨부 (최대 2개)'
            content={
              <input
                type={'file'}
                multiple
                onChange={e => attachmentsInputProps.onChange(e.target.files)}
              />
            }
          />
        </div>

        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            gap: 8px;
          `}
        >
          <div
            css={css`
              color: ${Colors.WeakItem};
            `}
          >
            <Button
              variant={'outlined'}
              color={'inherit'}
              {...cancelButtonProps}
            />
          </div>
          <Button variant={'contained'} {...submitButtonProps} />
        </div>
      </ContentContainer>
    </PageTemplate>
  )
}
