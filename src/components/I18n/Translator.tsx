import { useTranslation } from 'react-i18next'

const Translator = ({ path }: { path: any }) => {
  const { t } = useTranslation()

  return <>{t(path)}</>
}

export default Translator
