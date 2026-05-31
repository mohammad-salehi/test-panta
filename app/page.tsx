'use client'

import { Button, SearchableSelect, Modal } from "panta_design_system";

import { useMemo, useState } from 'react';
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

export default function Home() {
  const [open, setOpen] = useState(false);

  const [exchangeSelected, setExchangeSelected] = useState("");

  const options = useMemo(
    () => EXCHANGES.map((e) => ({ id: e.id, label: e.name, value: e.name })),
    []
  );
  return (
    <div style={{}}>
      <div className="max-w-sm">
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
          <Button onClick={() => {setOpen(false)}} variant="danger" className="mt-4">بسته</Button>
        </div>
      </Modal>
    </div>
  );
}