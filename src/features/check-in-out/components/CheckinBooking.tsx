import { useEffect, useState } from 'react';
import {
  Row,
  Box,
  Heading,
  Button,
  ButtonText,
  Spinner,
  Checkbox,
  Empty,
} from '@/components/shared';
import { useBooking } from '@/features/bookings/hooks';
import { useMoveBack } from '@/hooks';
import { BookingDetailData } from '@/features/bookings/components';
import { useSettings } from '@/features/settings/hooks';
import { formatCurrency } from '@/utils';
import { useCheckin } from '@/features/check-in-out/hooks';
import { HiArrowDownOnSquare } from 'react-icons/hi2';
import { useScreenSizeContext } from '@/context';

export function CheckinBooking() {
  const { isSm } = useScreenSizeContext();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading: isLoadingBooking } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { mutateCheckin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  if (!booking) return <Empty resource="checkin" />;

  const {
    id: bookingId,
    nigthsNum,
    guestsNum,
    totalPrice,
    hasBreakfast,
    guests,
  } = booking || {};
  const { breakfastPrice } = settings || {};

  function handleCheckin() {
    if (!confirmPaid || !bookingId) return;

    const optionalBreakfastPrice = getOptionalBreakfastPrice();

    if (addBreakfast && optionalBreakfastPrice && totalPrice) {
      mutateCheckin({
        id: bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: optionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      mutateCheckin({ id: bookingId });
    }
  }

  function handleChangeConfirmCheck() {
    setConfirmPaid((confirm) => !confirm);
  }

  function handleChangeBreakfastCheck() {
    setAddBreakfast((add) => !add);
    setConfirmPaid(false);
  }

  function getOptionalBreakfastPrice(): number | null {
    if (nigthsNum && breakfastPrice && guestsNum) {
      return nigthsNum * breakfastPrice * guestsNum;
    }

    return null;
  }

  function getTotalPriceConfirmCheckboxLabel(): string | null {
    const optionalBreakfastPrice = getOptionalBreakfastPrice();

    if (optionalBreakfastPrice && totalPrice) {
      return `I confirm that ${guests?.fullName || 'booking owner'} has paid the total amount of ${
        !addBreakfast
          ? formatCurrency(totalPrice)
          : `${formatCurrency(
              totalPrice + optionalBreakfastPrice,
            )} (${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfastPrice,
            )} for breakfast)`
      }`;
    }

    return null;
  }

  function getBreakfastAddingCheckboxLabel(): string | null {
    const optionalBreakfastPrice = getOptionalBreakfastPrice();

    if (optionalBreakfastPrice) {
      return `Want to add breakfast for ${formatCurrency(optionalBreakfastPrice)}?`;
    }

    return null;
  }

  const totalPriceConfirmCheckboxLabel = getTotalPriceConfirmCheckboxLabel();
  const breakfastAddingCheckboxLabel = getBreakfastAddingCheckboxLabel();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDetailData booking={booking} />

      {!hasBreakfast && (
        <Box className="w-full rounded-lg bg-white p-4 sm:p-6 md:px-10 md:py-4 dark:bg-dark">
          <Checkbox
            id="breakfast"
            label={breakfastAddingCheckboxLabel}
            checked={addBreakfast}
            onChange={handleChangeBreakfastCheck}
          />
        </Box>
      )}

      <Box className="w-full rounded-lg bg-white p-4 sm:p-6 md:px-10 md:py-4 dark:bg-dark">
        <Checkbox
          id="confirm"
          label={totalPriceConfirmCheckboxLabel}
          checked={confirmPaid}
          onChange={handleChangeConfirmCheck}
          disabled={confirmPaid || isCheckingIn}
        />
      </Box>

      <div className="flex justify-end gap-3">
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
          icon={<HiArrowDownOnSquare size="1.25rem" />}
        >
          Check in
        </Button>
        {!isSm && (
          <Button onClick={moveBack} color="secondary">
            Back
          </Button>
        )}
      </div>
    </>
  );
}
