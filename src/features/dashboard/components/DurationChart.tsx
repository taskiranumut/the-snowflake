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

type DurationChartProps = {
  confirmedStays: DataBooking[];
};

type StartData = {
  duration: string;
  value: number;
  color: string;
};

const startData: StartData[] = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

function prepareData(startData: StartData[], stays: DataBooking[]) {
  function incArrayValue(arr: StartData[], field: string) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.nigthsNum;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num!)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num!)) return incArrayValue(arr, '6-7 nights');
      if (num! >= 8 && num! <= 14) return incArrayValue(arr, '8-14 nights');
      if (num! >= 15 && num! <= 21) return incArrayValue(arr, '15-21 nights');
      if (num! >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export function DurationChart({ confirmedStays }: DurationChartProps) {
  const { isMobile, isTablet, isLg } = useScreenSizeContext();
  const data = prepareData(startData, confirmedStays);

  return (
    <DashboardBox className="p-4 md:px-8 md:py-6">
      <Heading as="h2">Stay duration summary</Heading>
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
