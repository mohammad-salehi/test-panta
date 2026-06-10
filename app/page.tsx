'use client'

import { Button, SearchableSelect, Modal, DatePicker, Box, ButtonSelect, HashText, TreeChart, PageLoader } from "panta_design_system";
import { useMemo, useState } from 'react';
import { DoubleBarChart } from "panta_design_system";
import { DoubleLineChart } from "panta_design_system";
import { SingleBarChart } from "panta_design_system";
import { SingleLineChart } from "panta_design_system";
import { Badge } from "panta_design_system";
import { CircleChart } from "panta_design_system";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "panta_design_system"
import { Column, ExpandableTable } from "panta_design_system";
import { Loader } from "panta_design_system";
import { Input } from "panta_design_system";
import { Pagination } from "panta_design_system";

type Project = {
  id: string;
  title: string;
  owner: string;
  team: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Todo" | "In Progress" | "Review" | "Done";
  budget: number;
  progress: number;
  dueDate: string;
  subRows?: Project[];
};

const Tabledata: Project[] = [
  {
    id: "1",
    title: "Redesign Dashboard",
    owner: "Ali",
    team: "Product",
    priority: "High",
    status: "In Progress",
    budget: 120000000,
    progress: 72,
    dueDate: "1405/04/10",
    subRows: [
      {
        id: "1-1",
        title: "Wireframes",
        owner: "Mina",
        team: "Design",
        priority: "Medium",
        status: "Done",
        budget: 15000000,
        progress: 100,
        dueDate: "1405/03/12",
      },
      {
        id: "1-2",
        title: "UI Kit Update",
        owner: "Reza",
        team: "Design",
        priority: "High",
        status: "In Progress",
        budget: 30000000,
        progress: 65,
        dueDate: "1405/03/28",
      },
    ],
  },
  {
    id: "2",
    title: "API Gateway Migration",
    owner: "Sara",
    team: "Backend",
    priority: "Critical",
    status: "Review",
    budget: 200000000,
    progress: 84,
    dueDate: "1405/03/30",
    subRows: [
      {
        id: "2-1",
        title: "Auth Service",
        owner: "Hamed",
        team: "Backend",
        priority: "High",
        status: "Done",
        budget: 50000000,
        progress: 100,
        dueDate: "1405/03/05",
      },
    ],
  },
  {
    id: "3",
    title: "Mobile Push Notifications",
    owner: "Nima",
    team: "Mobile",
    priority: "Medium",
    status: "Todo",
    budget: 45000000,
    progress: 10,
    dueDate: "1405/05/01",
  },
  {
    id: "4",
    title: "SEO Technical Fixes",
    owner: "Pari",
    team: "Marketing",
    priority: "High",
    status: "In Progress",
    budget: 30000000,
    progress: 40,
    dueDate: "1405/04/02",
    subRows: [
      {
        id: "4-1",
        title: "Schema Markup",
        owner: "Pari",
        team: "Marketing",
        priority: "Medium",
        status: "Review",
        budget: 8000000,
        progress: 75,
        dueDate: "1405/03/22",
      },
      {
        id: "4-2",
        title: "Core Web Vitals",
        owner: "Navid",
        team: "Frontend",
        priority: "High",
        status: "In Progress",
        budget: 12000000,
        progress: 50,
        dueDate: "1405/03/29",
      },
    ],
  },
  {
    id: "5",
    title: "Payment Retry Mechanism",
    owner: "Maryam",
    team: "Backend",
    priority: "Critical",
    status: "In Progress",
    budget: 90000000,
    progress: 58,
    dueDate: "1405/04/15",
  },
  {
    id: "6",
    title: "Customer Support Portal",
    owner: "Omid",
    team: "Frontend",
    priority: "Medium",
    status: "Review",
    budget: 70000000,
    progress: 79,
    dueDate: "1405/04/05",
    subRows: [
      {
        id: "6-1",
        title: "Ticket List",
        owner: "Omid",
        team: "Frontend",
        priority: "Low",
        status: "Done",
        budget: 10000000,
        progress: 100,
        dueDate: "1405/03/10",
      },
      {
        id: "6-2",
        title: "Live Chat Widget",
        owner: "Sina",
        team: "Frontend",
        priority: "Medium",
        status: "In Progress",
        budget: 18000000,
        progress: 55,
        dueDate: "1405/03/27",
      },
      {
        id: "6-3",
        title: "SLA Reports",
        owner: "Yas",
        team: "Data",
        priority: "High",
        status: "Todo",
        budget: 15000000,
        progress: 5,
        dueDate: "1405/04/20",
      },
    ],
  },
  {
    id: "7",
    title: "Data Warehouse ETL",
    owner: "Kian",
    team: "Data",
    priority: "High",
    status: "In Progress",
    budget: 160000000,
    progress: 47,
    dueDate: "1405/05/12",
  },
  {
    id: "8",
    title: "Onboarding Email Journey",
    owner: "Ava",
    team: "CRM",
    priority: "Low",
    status: "Done",
    budget: 25000000,
    progress: 100,
    dueDate: "1405/03/01",
  },
  {
    id: "9",
    title: "Role-Based Access Control",
    owner: "Hossein",
    team: "Security",
    priority: "Critical",
    status: "In Progress",
    budget: 110000000,
    progress: 62,
    dueDate: "1405/04/25",
    subRows: [
      {
        id: "9-1",
        title: "Permission Matrix",
        owner: "Hossein",
        team: "Security",
        priority: "High",
        status: "Review",
        budget: 22000000,
        progress: 80,
        dueDate: "1405/03/24",
      },
    ],
  },
  {
    id: "10",
    title: "A/B Test Pricing Page",
    owner: "Elina",
    team: "Growth",
    priority: "Medium",
    status: "Todo",
    budget: 35000000,
    progress: 0,
    dueDate: "1405/04/18",
  },
];
const columns: Column<Project>[] = [
  { header: "عنوان پروژه", accessorKey: "title", align: "start", width: "24%" },
  { header: "مسئول", accessorKey: "owner", align: "start", width: "10%" },
  { header: "تیم", accessorKey: "team", align: "center", width: "10%" },
  {
    header: "اولویت",
    align: "center",
    width: "10%",
    cell: (row) => {
      const color =
        row.priority === "Critical"
          ? "text-red-600"
          : row.priority === "High"
            ? "text-orange-600"
            : row.priority === "Medium"
              ? "text-yellow-600"
              : "text-green-600";
      return <span className={color}>{row.priority}</span>;
    },
  },
  {
    header: "وضعیت",
    align: "center",
    width: "12%",
    cell: (row) => <span>{row.status}</span>,
  },
  {
    header: "بودجه (تومان)",
    align: "end",
    width: "14%",
    cell: (row) => row.budget.toLocaleString("fa-IR"),
  },
  { header: "پیشرفت", accessorKey: "progress", align: "center", width: "12%" },
  { header: "ددلاین", accessorKey: "dueDate", align: "center", width: "8%" },
];
type Exchange = { id: number; name: string };
const EXCHANGES: Exchange[] = [
  { id: 1, name: "آگاه" },
  { id: 2, name: "مفید" },
  { id: 3, name: "فارابی" },
  { id: 4, name: "پاسارگاد" },
  { id: 5, name: "اقتصاد بیدار" },
];

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

  const treemapData = [
    { name: "Bitcoin", symbol: "BTC", value: 982_450_000 },
    { name: "Ethereum", symbol: "ETH", value: 741_320_000 },
    { name: "Tether", symbol: "USDT", value: 524_180_000 },
    { name: "BNB", symbol: "BNB", value: 301_900_000 },
    { name: "Solana", symbol: "SOL", value: 286_700_000 },
    { name: "XRP", symbol: "XRP", value: 238_400_000 },
    { name: "USDC", symbol: "USDC", value: 211_050_000 },
    { name: "Dogecoin", symbol: "DOGE", value: 176_890_000 },
    { name: "Cardano", symbol: "ADA", value: 154_300_000 },
    { name: "TRON", symbol: "TRX", value: 149_700_000 },
    { name: "Toncoin", symbol: "TON", value: 138_220_000 },
    { name: "Avalanche", symbol: "AVAX", value: 127_940_000 },
    { name: "Shiba Inu", symbol: "SHIB", value: 118_560_000 },
    { name: "Polkadot", symbol: "DOT", value: 109_330_000 },
    { name: "Chainlink", symbol: "LINK", value: 101_450_000 },
    { name: "Litecoin", symbol: "LTC", value: 96_210_000 },
    { name: "Bitcoin Cash", symbol: "BCH", value: 88_940_000 },
    { name: "NEAR Protocol", symbol: "NEAR", value: 84_170_000 },
    { name: "Uniswap", symbol: "UNI", value: 79_860_000 },
    { name: "Polygon", symbol: "MATIC", value: 74_520_000 },
  ];

  const MailIcon = () => (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = 243;
  return (
    <div style={{}}>

      {/* <PageLoader text="BLOCKBIN" mode="spinner"/> */}

      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="بگ"
        description="انتخاب گزینه برای مشاهده اطلاعات"
      >
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={(p) => {setPage(p)}}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          rtl
        />      </Box>
      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="بگ"
        description="انتخاب گزینه برای مشاهده اطلاعات"
      >
        <Input
          label="نام"
          placeholder="نام خود را وارد کنید"
          hint="حداقل ۳ کاراکتر"
        />

        <Input
          label="ایمیل"
          type="email"
          placeholder="example@mail.com"
          leftIcon={<MailIcon />}
        />

        <Input
          label="رمز عبور"
          type="password"
          placeholder="••••••••"
          error="رمز باید حداقل ۸ کاراکتر باشد"
        />

        <Input
          label="شماره موبایل"
          type="tel"
          placeholder="09xxxxxxxxx"
          success="شماره تأیید شد"
        />
      </Box>

      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="بگ"
        description="انتخاب گزینه برای مشاهده اطلاعات"
      >
        <Loader text="در حال دریافت اطلاعات..." />
      </Box>
      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="بگ"
        description="انتخاب گزینه برای مشاهده اطلاعات"
      >
        <Loader mode="skeleton" count={4} />
      </Box>
      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="بگ"
        description="انتخاب گزینه برای مشاهده اطلاعات"
      >
        <Loader mode="skeleton" count={4} withAvatar />
      </Box>

      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="بگ"
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
        <Badge color="green">فعال</Badge>
        <Badge color="red">ناموفق</Badge>
        <Badge color="blue">در حال بررسی</Badge>
        <Badge color="yellow">در انتظار</Badge>
        <Badge color="purple">جدید</Badge>

        <Badge color="green" variant="solid">موفق</Badge>
        <Badge color="red" variant="outline">حذف شده</Badge>

      </Box>

      <Box
        icon={<MoreVerticalIcon size={20} />}
        title="تب"
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
        <ExpandableTable<Project>
          data={Tabledata}
          columns={columns}
          pageSize={10}
          renderProgress={(value) => (
            <div className="mx-auto flex w-[120px] items-center gap-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full ${value >= 80 ? "bg-green-500" : value >= 40 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs">{value}%</span>
            </div>
          )}
          rowDetails={(row) => (
            <div className="rounded-lg border border-border p-3 text-sm">
              <div>جزئیات: {row.title}</div>
              <div>Owner: {row.owner}</div>
              <div>Team: {row.team}</div>
              <div>Due: {row.dueDate}</div>
            </div>
          )}
        />

      </Box>

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

        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="نمودار درختی"
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
          <TreeChart
            data={treemapData}
            height={340}
            valueUnit="USDT"
            valueLabel="حجم"
            shareLabel="سهم"
          />
        </Box>


        <Box
          icon={<MoreVerticalIcon size={20} />}
          title="تب"
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
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">Tab 1</TabsContent>
            <TabsContent value="orders">Tab 2</TabsContent>
            <TabsContent value="history">Tab 3</TabsContent>
          </Tabs>
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