import { useMemo, useCallback } from 'react';
import { type DataBooking } from '@/services/api/bookings.types';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Heading } from '@/components/shared';
import { DashboardBox } from '@/features/dashboard/components';
import { useScreenSizeContext } from '@/context';
import { useTranslation } from 'react-i18next';

type DurationChartProps = {
  confirmedStays: DataBooking[];
};

type StartData = {
  duration: string;
  value: number;
  color: string;
};

export function DurationChart({ confirmedStays }: DurationChartProps) {
  const { t } = useTranslation();
  const { isMobile, isTablet, isLg } = useScreenSizeContext();

  const durations = useMemo(
    () => ({
      night1: t('label.dashboard.durationChart.durations.night1'),
      night2: t('label.dashboard.durationChart.durations.night2'),
      night3: t('label.dashboard.durationChart.durations.night3'),
      night4_5: t('label.dashboard.durationChart.durations.night4_5'),
      night6_7: t('label.dashboard.durationChart.durations.night6_7'),
      night8_14: t('label.dashboard.durationChart.durations.night8_14'),
      night15_21: t('label.dashboard.durationChart.durations.night15_21'),
      night21plus: t('label.dashboard.durationChart.durations.night21plus'),
    }),
    [t],
  );

  const startData: StartData[] = useMemo(
    () => [
      {
        duration: durations.night1,
        value: 0,
        color: '#ef4444',
      },
      {
        duration: durations.night2,
        value: 0,
        color: '#f97316',
      },
      {
        duration: durations.night3,
        value: 0,
        color: '#eab308',
      },
      {
        duration: durations.night4_5,
        value: 0,
        color: '#84cc16',
      },
      {
        duration: durations.night6_7,
        value: 0,
        color: '#22c55e',
      },
      {
        duration: durations.night8_14,
        value: 0,
        color: '#14b8a6',
      },
      {
        duration: durations.night15_21,
        value: 0,
        color: '#3b82f6',
      },
      {
        duration: durations.night21plus,
        value: 0,
        color: '#a855f7',
      },
    ],
    [durations],
  );

  const prepareData = useCallback(
    (startData: StartData[], stays: DataBooking[]) => {
      function incArrayValue(arr: StartData[], field: string) {
        return arr.map((obj) =>
          obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
        );
      }

      const data = stays
        .reduce((arr, cur) => {
          const num = cur.nigthsNum;
          if (num === 1) return incArrayValue(arr, durations.night1);
          if (num === 2) return incArrayValue(arr, durations.night2);
          if (num === 3) return incArrayValue(arr, durations.night3);
          if ([4, 5].includes(num!))
            return incArrayValue(arr, durations.night4_5);
          if ([6, 7].includes(num!))
            return incArrayValue(arr, durations.night6_7);
          if (num! >= 8 && num! <= 14)
            return incArrayValue(arr, durations.night8_14);
          if (num! >= 15 && num! <= 21)
            return incArrayValue(arr, durations.night15_21);
          if (num! >= 21) return incArrayValue(arr, durations.night21plus);
          return arr;
        }, startData)
        .filter((obj) => obj.value > 0);

      return data;
    },
    [durations],
  );

  const data = prepareData(startData, confirmedStays);

  return (
    <DashboardBox className="p-4 md:px-8 md:py-6">
      <Heading as="h2">{t('label.dashboard.durationChart.title')}</Heading>
      <div className="flex size-full items-center justify-center">
        <ResponsiveContainer
          width={isMobile ? '100%' : isTablet ? '90%' : '80%'}
          height={isMobile || isLg ? 170 : 240}
        >
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={'60%'}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardBox>
  );
}
