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
import { useTranslation } from 'react-i18next';
import { useLocaleDateFormat } from '@/hooks';

type SalesChartProps = {
  bookings: DataBooking[];
  daysNum: number;
};

export function SalesChart({ bookings, daysNum }: SalesChartProps) {
  const { t } = useTranslation();
  const { isSm } = useScreenSizeContext();
  const { theme } = useThemeContext();

  const { formats, locale } = useLocaleDateFormat();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), daysNum - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, formats.short, {
        locale,
      }),
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
        {t('label.dashboard.salesChart.title', {
          from: format(allDates.at(0)!, formats.long, {
            locale,
          }),
          to: format(allDates.at(-1)!, formats.long, {
            locale,
          }),
        })}
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
            name={t('label.dashboard.salesChart.totalSales')}
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name={t('label.dashboard.salesChart.extraSales')}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
