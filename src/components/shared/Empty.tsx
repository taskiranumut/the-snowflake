import { useTranslation } from 'react-i18next';

type EmptyProps = {
  resource: string;
};

export function Empty({ resource }: EmptyProps) {
  const { t } = useTranslation();

  return <p>{t('message.empty.content', { resource })}</p>;
}
