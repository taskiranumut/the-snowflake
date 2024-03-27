import { Button } from '@/components/shared';
import { useCheckout } from '@/features/check-in-out/hooks';
import { useTranslation } from 'react-i18next';
import { HiArrowUpOnSquare } from 'react-icons/hi2';

type CheckoutButtonProps = {
  bookingId: number | string | undefined;
  constantSize?: boolean;
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
};

export function CheckoutButton({
  bookingId,
  constantSize = false,
  size = 'md',
  withIcon = false,
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
      className="max-content"
      icon={withIcon ? <HiArrowUpOnSquare size="1.25rem" /> : null}
    >
      {t('action.bookings.checkOut')}
    </Button>
  );
}
