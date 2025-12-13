import React from 'react';
import { X, Key, User, Wrench, CheckCircle } from 'lucide-react';

const statusOptions = [

    { id: 'contracted', label: '재계약/입주완료', icon: Key, color: 'bg-emerald-300 text-emerald-950 border border-emerald-500 hover:bg-emerald-400' },
    { id: 'occupied', label: '거주중 (안나감)', icon: User, color: 'bg-amber-300 text-amber-950 border border-amber-500 hover:bg-amber-400' },
    { id: 'cleaning', label: '청소/수리 필요', icon: Wrench, color: 'bg-rose-300 text-rose-950 border border-rose-500 hover:bg-rose-400' },
    { id: 'vacant', label: '공실/청소완료', icon: CheckCircle, color: 'bg-slate-200 text-slate-600 border border-slate-300 hover:bg-slate-300' }
];

export function StatusModal({ isOpen, onClose, room, onUpdateStatus }) {
    if (!isOpen || !room) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h3 className="text-xl font-bold mb-1 text-slate-800">
                    {room.building_name}동 {room.room_number}호
                </h3>
                <p className="text-slate-500 mb-6">상태를 변경해주세요</p>

                <div className="grid gap-3">
                    {statusOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => onUpdateStatus(room.id, option.id)}
                            className={`
                w-full flex items-center gap-3 p-4 rounded-xl transition-all
                ${option.color}
                ${room.status === option.id ? 'ring-2 ring-offset-2 ring-indigo-500 ring-offset-white' : ''}
              `}
                        >
                            <option.icon className="w-5 h-5" />
                            <span className="font-bold tracking-wide">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
