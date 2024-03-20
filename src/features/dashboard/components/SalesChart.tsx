import { type DataBooking } from '@/services/api/bookings.types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { Heading } from '@/components/shared';
import { DashboardBox } from '@/features/dashboard/components';
import { useScreenSizeContext, useThemeContext } from '@/context';

type SalesChartProps = {
  bookings: DataBooking[];
  daysNum: number;
};

export function SalesChart({ bookings, daysNum }: SalesChartProps) {
  const { isSm } = useScreenSizeContext();
  const { theme } = useThemeContext();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), daysNum - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.totalPrice!, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.extrasPrice!, 0),
    };
  });

  const colors =
    theme === 'dark'
      ? {
          totalSales: { stroke: '#059669', fill: '#059669' },
          extrasSales: { stroke: '#4338ca', fill: '#4338ca' },
          text: '#e5e7eb',
          background: '#18212f',
        }
      : {
          totalSales: { stroke: '#10b981', fill: '#6ee7b7' },
          extrasSales: { stroke: '#4f46e5', fill: '#818cf8' },
          text: '#374151',
          background: '#fff',
        };

  return (
    <DashboardBox className="col-span-full col-start-1 overflow-x-auto md:overflow-x-hidden">
      <Heading as="h2">
        Sales from {format(allDates.at(0)!, 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1)!, 'MMM dd yyyy')}{' '}
      </Heading>

      <ResponsiveContainer height={300} width={isSm ? 800 : '100%'}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
