import React from 'react';
import { RoomCard } from './RoomCard';

export function BuildingView({ title, rooms, onRoomClick, reverseNumbering = false }) {
    const activeFloors = [4, 3, 2];

    const roomsByFloor = activeFloors.reduce((acc, floor) => {
        acc[floor] = rooms
            .filter(r => r.floor === floor)
            .sort((a, b) => {
                const comparison = a.room_number.localeCompare(b.room_number);
                return reverseNumbering ? -comparison : comparison;
            });
        return acc;
    }, {});

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-16">
            {/* Modern Header - Floating above the building */}
            <h2 className="text-3xl font-bold mb-8 text-slate-700 tracking-widest uppercase border-b border-slate-300 pb-2">{title}</h2>

            {/* The Building Structure (Concrete Block) */}
            <div className="relative w-full concrete-wall rounded-t-lg shadow-2xl border-x border-t border-slate-500 p-6 md:p-8 overflow-hidden">

                {/* Vertical Dark Stone Accents (Photo Match) */}
                <div className="absolute top-0 bottom-0 left-6 w-8 md:w-12 bg-slate-700/10 border-r border-slate-600/20"></div>
                <div className="absolute top-0 bottom-0 right-6 w-8 md:w-12 bg-slate-700/10 border-l border-slate-600/20"></div>

                {/* Floors */}
                <div className="space-y-8 relative z-10">
                    {activeFloors.map(floor => (
                        <div key={floor} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-xs font-mono bg-slate-800 text-white px-3 py-1 rounded-full shadow-sm tracking-widest border border-slate-600 font-bold opacity-90">{floor}F</span>
                            </div>

                            {/* Rooms Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4 w-full">
                                {roomsByFloor[floor].map(room => (
                                    <RoomCard
                                        key={room.id}
                                        room={room}
                                        onClick={onRoomClick}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dark Fascia Band (Photo Match - Name/Number Area) */}
            <div className="w-[102%] h-10 md:h-12 bg-slate-800 -mt-1 relative z-20 shadow-lg flex items-center justify-center border-t border-slate-600">
                <span className="text-slate-400 font-mono text-xs md:text-sm tracking-[0.2em]">010-2540-2488</span>
            </div>

            {/* Pilotis Structure (Pillars & Parking) */}
            <div className="w-[96%] flex justify-between px-6 sm:px-16 relative -mt-1 z-10">
                {/* Left Pillar - Dark Stone */}
                <div className="w-10 sm:w-16 h-24 bg-slate-700 shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] border-x border-slate-600"></div>

                {/* Center/Parking Area */}
                <div className="flex-1 flex items-end justify-center pb-2 opacity-30">
                    {/* Parking Line */}
                    <div className="w-full h-1 bg-slate-400 m-auto"></div>
                </div>

                {/* Right Pillar - Dark Stone */}
                <div className="w-10 sm:w-16 h-24 bg-slate-700 shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] border-x border-slate-600"></div>
            </div>

            {/* Ground Shadow */}
            <div className="w-[90%] h-4 bg-slate-800/20 blur-xl rounded-[50%] -mt-4"></div>
        </div>
    );
}
