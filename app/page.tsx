'use client'

import { Button, SearchableSelect, Modal, DatePicker, Box, ButtonSelect, HashText } from "panta_design_system";
import { useMemo, useState } from 'react';
import { DoubleBarChart } from "panta_design_system";
import { DoubleLineChart } from "panta_design_system";
import { SingleBarChart } from "panta_design_system";
import { SingleLineChart } from "panta_design_system";
import { CircleChart } from "panta_design_system";

type Exchange = { id: number; name: string };
const EXCHANGES: Exchange[] = [
  { id: 1, name: "آگاه" },
  { id: 2, name: "مفید" },
  { id: 3, name: "فارابی" },
  { id: 4, name: "پاسارگاد" },
  { id: 5, name: "اقتصاد بیدار" },
];

const userData = {
  name: "علی رضایی",
  email: "ali@example.com",
  role: "مدیر محصول",
  status: "فعال",
};

const brokers = [
  { label: "IranBit Exchange", value: "iranbit" },
  { label: "Wallex Exchange", value: "wallex" },
  { label: "Tetherland Exchange", value: "tetherland" },
  { label: "Nobitex Exchange", value: "nobitex" },
];

const Icon = ({
  children,
  size = 20,
  className = ""
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export const TrendingUpIcon = (props: any) => (
  <Icon {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icon>
);

export const MoreVerticalIcon = (props: any) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </Icon>
);

export default function Home() {
  const [open, setOpen] = useState(false);

  const [exchangeSelected, setExchangeSelected] = useState("");

  const options = useMemo(
    () => EXCHANGES.map((e) => ({ id: e.id, label: e.name, value: e.name })),
    []
  );

  const [dateFa, setDateFa] = useState<Date | null>(null);
  const [dateEn, setDateEn] = useState<Date | null>(null);

  const [dateFaISO, setDateFaISO] = useState("");
  const [dateEnISO, setDateEnISO] = useState("");

  const [value, setValue] = useState("");

  const data = [
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
    { label: "BTC", x: 120000000, y: 80000000 },
    { label: "ETH", x: 95000000, y: 60000000 },
    { label: "USDT", x: 70000000, y: 45000000 },
    { label: "BNB", x: 40000000, y: 20000000 },
  ];

  const lineChartData = [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 2800 },
    { label: "Mar", value: 1900 },
    { label: "Apr", value: 4200 },
    { label: "May", value: 3800 },
    { label: "Jun", value: 5200 },
    { label: "Jul", value: 6100 },
  ];

  const barChartData = [
    { label: "Jan", value: 3200 },
    { label: "Feb", value: 4500 },
    { label: "Mar", value: 2800 },
    { label: "Apr", value: 6200 },
    { label: "May", value: 5100 },
    { label: "Jun", value: 7200 },
    { label: "Jul", value: 6800 },
  ];

  const Circledata = [
    { label: "Marketing", value: 4000 },
    { label: "Sales", value: 3000 },
    { label: "Development", value: 5000 },
    { label: "Support", value: 1500 },
  ];


  return (
    <div style={{}}>
      <div className="max-w-sm" style={{ width: '300px' }}>
        <SearchableSelect
          label="کارگزاری"
          value={exchangeSelected}
          onChange={setExchangeSelected}
          placeholder="همه کارگزاری‌ها"
          allLabel="همه کارگزاری‌ها"
          searchable
          searchPlaceholder="جستجوی نام کارگزاری..."
          options={options}
          direction="rtl"
          className="text-sm"
        />

      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lux-btn rounded-xl px-4 py-2"
      >
        Open Modal
      </button>

      <div className="mx-auto max-w-lg space-y-6 p-6 w-lg" style={{ width: '300px' }}>
        <DatePicker
          calendar="jalali"
          value={dateFa}
          onChange={setDateFa}
          onChangeFormatted={setDateFaISO}
          placeholder="انتخاب تاریخ"
        />

        <DatePicker
          calendar="gregorian"
          value={dateEn}
          onChange={setDateEn}
          onChangeFormatted={setDateEnISO}
          placeholder="Pick a date"
        />

      </div>

      <div className="p-8 space-y-8 bg-gray-50 dark:bg-black min-h-screen">

        {/* ✅ Full Featured Box */}
        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="عنوان"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <SearchableSelect
            options={brokers}
            placeholder="همه تنظیمات"
            onChange={(val) => console.log("selected:", val)} value={""}
          />
        </Box>

      </div>

      <Box
        title="کارگزاری"
        description="تست"
        collapsible
        defaultCollapsed
      >
        Collapse
      </Box>


      <div className="p-8 space-y-8 bg-gray-50 dark:bg-black min-h-screen w-lg">

        {/* ✅ Full Featured Box */}
        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="افقی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <ButtonSelect
            value={value}
            onChange={setValue}
            options={options}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="افقی ولی تمام عرض"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <ButtonSelect
            orientation="horizontal"
            fullWidth
            value={value}
            onChange={setValue}
            options={options}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="عمودی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <ButtonSelect
            orientation="vertical"
            value={value}
            onChange={setValue}
            options={options}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="Grid چهار ستونه"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <ButtonSelect
            orientation="grid"
            columns={4}
            options={options}
            value={value}
            onChange={setValue}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="Grid چهار ستونه"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <HashText
            text="0x7fa938a2b91f49ce1b94a1c928fd90eae3f2a991"
            startChars={8}
            endChars={6}
            copyOnClickText
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="نمودار میله ای دوتایی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <DoubleBarChart
            data={data}
            assetLabel="دارایی"
            liabilityLabel="بدهی"
            height={300}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="نمودار خطی دوتایی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <DoubleLineChart
            data={data}
            assetLabel="کوفت"
            liabilityLabel="زهرمار"
            height={300}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="نمودار خطی تکی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <SingleLineChart
            data={lineChartData}
            dataLabel="Revenue"
            height={340}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="نمودار میله ای تکی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
          <SingleBarChart
            data={barChartData}
            dataLabel="Sales"
            height={340}
          />
        </Box>

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="نمودار میله ای تکی"
          description="انتخاب گزینه برای مشاهده اطلاعات"
          actions={
            <Button variant="warning">
              تنظیمات
            </Button>
          }
          footer={
            <div className="text-sm text-muted-foreground">
              آخرین بروزرسانی: امروز
            </div>
          }
        >
<CircleChart
  unit="$"
  data={Circledata}
  height={360}
  dir="ltr"
/>
        </Box>

      </div>



      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="تست مودال"
        showCloseButton={false}
      >
        <p className="text-sm m-0 mb-4 pb-4">
          این یک محتوای استاتیک برای تست کامپوننت Modal است.
        </p>
        <div className="mt-4">
          <Button onClick={() => { setOpen(false) }} variant="danger" className="mt-4">بسته</Button>
        </div>
      </Modal>


    </div>
  );
}