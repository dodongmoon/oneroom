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
  deposit_paid: { // Gray: Deposit Paid
    bg: 'bg-slate-200',
    border: 'border-slate-300',
    glow: 'shadow-md',
    text: 'text-slate-600',
    icon: <CheckCircle className="w-4 h-4 text-slate-500" />
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
        flex flex-col items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-md hover:border-indigo-300 hover:z-10
        group
      `}
    >
      <span className={`text-sm md:text-base font-bold tracking-widest ${config.text}`}>
        {room.room_number}
      </span>

      {/* Icon floating */}
      {config.icon && (
        <div className="mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {config.icon}
        </div>
      )}
    </button>
  );
}
