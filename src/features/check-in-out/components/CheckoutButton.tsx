import { Button } from '@/components/shared';
import { useCheckout } from '@/features/check-in-out/hooks';

type CheckoutButtonProps = {
  bookingId: number | string | undefined;
};

export function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { mutateCheckout, isCheckingOut } = useCheckout();

  function handleCheckout() {
    if (bookingId) {
      mutateCheckout(bookingId);
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}
