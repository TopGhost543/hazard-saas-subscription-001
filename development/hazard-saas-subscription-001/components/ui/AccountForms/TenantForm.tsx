'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { updateName } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tables } from '@/types_db';
import Link from 'next/link';

type Subscription = Tables<'subscriptions'>;



interface Props {
  subscription: any | null;
}

export default function TenantForm({ subscription }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('subscription TenantForm: ', subscription);

  const handleTenantSupport = async () => {
    setIsSubmitting(true);
    const redirectUrl = '/support';
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card
      title="Your Tenant"
      description={subscription?.tenants?.tenant_domain ? 
        (
          <div>
            <p>Tenant Name: <span style={{ fontWeight: 'bold'}}>{subscription.tenants?.tenant_name}</span></p>
            <p>Tenant Category: <span style={{ fontWeight: 'bold' }}>{subscription.tenants?.industry_category}</span></p>
            <p>Tenant Description: <span style={{ fontWeight: 'bold' }}>{subscription.tenants?.tenant_description}</span></p>
            <p>Employee Count: <span style={{ fontWeight: 'bold'}}>{subscription.tenants?.employee_count}</span></p>
            <p>Subscription Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{subscription.status.toUpperCase()}</span></p>
          </div>
        ).toString()
        :
        ("You have not registered a Tenant. Please register your Tenant/Company Portal")
      }
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">{subscription?.tenants?.tenant_domain || 'Please contact support for assistance'}</p>
          <Button
            variant="slim"
            onClick={handleTenantSupport}
            loading={isSubmitting}
          >
            Contact Support
          </Button>
        </div>
      }
    >
     
<div className="mt-8 mb-4 text-xl font-semibold">
        {subscription?.tenants?.tenant_domain? (
          ``
        ) : (
          <Link href="/companyRegistration">Register a Tenant</Link>
        )}
      </div>

    </Card>
  );
}
