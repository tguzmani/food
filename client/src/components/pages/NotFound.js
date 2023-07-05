import React from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation
  return (
    <div className="text-center">
      <h1 className="font-weight-bold mt-5">404</h1>
      <h2 className="mb-5">{t('error.notFound')}(</h2>
      <Link to="/">{t('error.goBack')}</Link>
    </div>
  )
}

export default NotFound
