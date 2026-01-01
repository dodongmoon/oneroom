import React from 'react';
import { Key, User, Wrench, CheckCircle } from 'lucide-react';

const statusConfig = {
  renewed: { // Green: Renewed
    bg: 'bg-emerald-300',
    border: 'border-emerald-500',
    glow: 'shadow-md',
    text: 'text-emerald-950',
    icon: <Key className="w-4 h-4 text-emerald-800" />
  },
  new_occupant: { // Yellow: New Occupant
    bg: 'bg-amber-300',
    border: 'border-amber-500',
    glow: 'shadow-md',
    text: 'text-amber-950',
    icon: <User className="w-4 h-4 text-amber-800" />
  },
  ready: { // Blue: Ready
    bg: 'bg-blue-300',
    border: 'border-blue-500',
    glow: 'shadow-md',
    text: 'text-blue-950',
    icon: <CheckCircle className="w-4 h-4 text-blue-800" />
  },
  vacated: { // Red: Vacated/Cleaning Needed
    bg: 'bg-rose-300',
    border: 'border-rose-500',
    glow: 'shadow-md',
    text: 'text-rose-950',
    icon: <Wrench className="w-4 h-4 text-rose-800" />
  },
  deposit_paid: { // Gray: Before Exit (formerly Deposit Paid)
    bg: 'bg-gray-200',
    border: 'border-gray-500',
    glow: 'shadow-md',
    text: 'text-gray-900',
    icon: <CheckCircle className="w-4 h-4 text-gray-700" />
  }
};

export function RoomCard({ room, onClick }) {
  const config = statusConfig[room.status] || statusConfig.ready;

  return (
    <button
      onClick={() => onClick(room)}
      className={`
        relative w-full aspect-square
        border ${config.border} ${config.bg} ${config.glow}
        rounded-xl
        flex flex-col items-center justify-start pt-4
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-md hover:border-indigo-300 hover:z-10
        group
      `}
    >
      <span className={`text-sm md:text-base font-bold tracking-widest ${config.text}`}>
        {room.room_number}
      </span>

      {/* Deposit Status Indicator - Top Right (Smaller) */}
      <div className={`absolute top-2 right-2 font-black text-base ${room.is_deposit_paid ? 'text-green-600' : 'text-red-500/80'} z-10`}>
        {room.is_deposit_paid ? 'O' : 'X'}
      </div>

      {/* Move-in Date Display - Bottom Center (Smaller than Room Number) */}
      <div className="absolute bottom-4 font-bold text-xs md:text-sm text-slate-800 tracking-tight opacity-90">
        {room.move_in_date}
      </div>
    </button>
  );
}
