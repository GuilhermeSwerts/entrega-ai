import { useState } from "react";

type Schedule = {
    id: number;
    title: string;
    category: string;
    time: string;
};

type DayData = {
    day: number;
    weekday: string;
    schedules: Schedule[];
};

const days: DayData[] = [
    {
        day: 16,
        weekday: "Sex",
        schedules: [],
    },
    {
        day: 17,
        weekday: "Sab",
        schedules: [
            {
                id: 1,
                title: "Training - Running",
                category: "endurance",
                time: "10:15 AM",
            },
        ],
    },
    {
        day: 18,
        weekday: "Dom",
        schedules: [],
    },
    {
        day: 19,
        weekday: "Seg",
        schedules: [
        ],
    },
    {
        day: 20,
        weekday: "Ter",
        schedules: [],
    },
    {
        day: 21,
        weekday: "Qua",
        schedules: [],
    },
    {
        day: 22,
        weekday: "Qui",
        schedules: [],
    },
    {
        day: 23,
        weekday: "Sex",
        schedules: [
            {
                id: 1,
                title: "Sistema Em Manutenção 00:00 às 01:00",
                category: "Sistema",
                time: "10:15 AM",
            },
            {
                id: 2,
                title: "PIX Fora Do Ar",
                category: "Sistema",
                time: "12:15 AM",
            },
        ],
    },
];

export default function CalendarWithSchedules() {
    const [selectedDay, setSelectedDay] = useState<DayData>(days[7]);

    return (
        <div className="p-5 max-w-sm mx-auto space-y-6">
            {/* Calendar */}
            <div className="bg-zinc-900 text-white rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Janeiro 2026</h2>
                    <div className="flex gap-2">
                        <button className="opacity-60 hover:opacity-100">‹</button>
                        <button className="opacity-60 hover:opacity-100">›</button>
                    </div>
                </div>

                <div className="flex justify-between">
                    {days.map((day) => (
                        <button
                            key={day.day}
                            onClick={() => setSelectedDay(day)}
                            className={`flex flex-col items-center gap-1 w-10 py-2 rounded-full transition
                ${selectedDay.day === day.day
                                    ? "bg-red-500 text-white"
                                    : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <span className="text-xs">{day.weekday}</span>
                            <span className="text-sm font-medium">{day.day}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scheduled */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                        Scheduled{" "}
                        <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {selectedDay.schedules.length}
                        </span>
                    </h3>
                    <button className="text-sm text-zinc-500 hover:underline">
                        See all
                    </button>
                </div>

                {selectedDay.schedules.length === 0 && (
                    <p className="text-sm text-zinc-400">
                        Nenhum aviso para esse dia.
                    </p>
                )}

                {selectedDay.schedules.map((item) => (
                    <div
                        key={item.id}
                        className="bg-zinc-100 rounded-xl p-4"
                    >
                        <div className="space-y-1">
                            <span className="text-xs bg-white px-2 py-1 rounded-full text-zinc-600">
                                {item.category}
                            </span>
                            <p className="font-medium text-zinc-900">{item.title}</p>
                        </div>

                        <span className="text-sm text-zinc-500">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
