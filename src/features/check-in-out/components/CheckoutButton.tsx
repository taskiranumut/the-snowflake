import { Button } from '@/components/shared';
import { useCheckout } from '@/features/check-in-out/hooks';
import { useTranslation } from 'react-i18next';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';

type CheckoutButtonProps = {
  bookingId: number | string | undefined;
  constantSize?: boolean;
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
  className?: string;
};

export function CheckoutButton({
  bookingId,
  constantSize = false,
  size = 'md',
  withIcon = false,
  className = '',
}: CheckoutButtonProps) {
  const { t } = useTranslation();
  const { mutateCheckout, isCheckingOut } = useCheckout();

  function handleCheckout() {
    if (bookingId) {
      mutateCheckout(bookingId);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isCheckingOut}
      constantSize={constantSize}
      size={size}
      className={twMerge('max-content', className)}
      icon={withIcon ? <HiArrowUpOnSquare size="1.25rem" /> : null}
    >
      {t('action.bookings.checkOut')}
    </Button>
  );
}
