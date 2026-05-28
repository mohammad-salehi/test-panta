'use client'

import { SearchableSelect } from "panta_design_system";

import { useMemo, useState } from 'react';
type Exchange = { id: number; name: string };
const EXCHANGES: Exchange[] = [
  { id: 1, name: "آگاه" },
  { id: 2, name: "مفید" },
  { id: 3, name: "فارابی" },
  { id: 4, name: "پاسارگاد" },
  { id: 5, name: "اقتصاد بیدار" },
];


export default function Home() {

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
    </div>
  );
}