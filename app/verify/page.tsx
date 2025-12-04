import AuthPageWrapper from '@/components/auth/AuthPageWrapper'
import VerifyAccount from '@/components/registrations/VerifyAccount'
import React from 'react'

const VerificationPage = () => {
  return (
    <AuthPageWrapper>
        <VerifyAccount/>
    </AuthPageWrapper>
  )
}

export default VerificationPage