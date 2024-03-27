import { Heading, Row } from '@/components/shared';
import {
  BookingsTable,
  BookingTableOperations,
} from '@/features/bookings/components';
import { useTranslation } from 'react-i18next';

export function Bookings() {
  const { t } = useTranslation();

  return (
    <>
      <Row
        type="horizontal"
        className="flex-col items-start gap-6 lg:flex-row lg:items-center"
      >
        <Heading as="h1">{t('title.page.bookings')}</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}
