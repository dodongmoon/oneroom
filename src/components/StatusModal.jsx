import React from 'react';
import { X, Key, User, Wrench, CheckCircle } from 'lucide-react';

const statusOptions = [
    { id: 'renewed', label: '재계약', icon: Key, color: 'bg-emerald-300 text-emerald-950 border border-emerald-500 hover:bg-emerald-400' },
    { id: 'new_occupant', label: '새계약 입주완료', icon: User, color: 'bg-amber-300 text-amber-950 border border-amber-500 hover:bg-amber-400' },
    { id: 'vacated', label: '청소,수리', icon: Wrench, color: 'bg-rose-300 text-rose-950 border border-rose-500 hover:bg-rose-400' },
    { id: 'ready', label: '준비완료', icon: CheckCircle, color: 'bg-blue-300 text-blue-950 border border-blue-500 hover:bg-blue-400' },
    { id: 'deposit_paid', label: '퇴실 전', icon: CheckCircle, color: 'bg-gray-200 text-gray-900 border border-gray-500 hover:bg-gray-300' }
];

export function StatusModal({ isOpen, onClose, room, onUpdate }) {
    const [memo, setMemo] = React.useState('');
    const [moveInDate, setMoveInDate] = React.useState('');

    React.useEffect(() => {
        if (room) {
            setMemo(room.memo || '');
            setMoveInDate(room.move_in_date || '');
        }
    }, [room]);

    const handleMemoChange = (e) => {
        setMemo(e.target.value);
    };

    const handleDateChange = (e) => {
        setMoveInDate(e.target.value);
    };

    const handleMemoBlur = () => {
        if (room && memo !== room.memo) {
            onUpdate(room.id, { memo });
        }
    };

    const handleDateBlur = () => {
        if (room && moveInDate !== room.move_in_date) {
            onUpdate(room.id, { move_in_date: moveInDate });
        }
    };

    if (!isOpen || !room) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col max-h-[85vh] relative animate-in fade-in zoom-in duration-200">
                {/* Fixed Header */}
                <div className="p-6 pb-2 flex-none">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h3 className="text-xl font-bold mb-1 text-slate-800">
                        {room.building_name}동 {room.room_number}호
                    </h3>
                    <p className="text-slate-500">상태를 변경해주세요</p>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 pt-2 overflow-y-auto flex-1">
                    {/* Memo Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            메모
                        </label>
                        <textarea
                            value={memo}
                            onChange={handleMemoChange}
                            onBlur={handleMemoBlur}
                            placeholder="특이사항을 입력하세요..."
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-slate-700 bg-slate-50"
                            rows={3}
                        />
                    </div>

                    <div className="grid gap-3">
                        {statusOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => onUpdate(room.id, { status: option.id })}
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

                    {/* Deposit Status Section */}
                    <div className="mt-6 border-t pt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            입금 상태
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => onUpdate(room.id, { is_deposit_paid: true })}
                                className={`
                                    flex items-center justify-center gap-2 p-3 rounded-xl transition-all font-bold border active:scale-95
                                    ${room.is_deposit_paid
                                        ? 'bg-green-100 text-green-800 border-green-500 ring-2 ring-green-500 ring-offset-2'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                                `}
                            >
                                <span className="text-lg">O</span>
                                <span>입금완료</span>
                            </button>
                            <button
                                onClick={() => onUpdate(room.id, { is_deposit_paid: false })}
                                className={`
                                    flex items-center justify-center gap-2 p-3 rounded-xl transition-all font-bold border active:scale-95
                                    ${!room.is_deposit_paid
                                        ? 'bg-red-100 text-red-800 border-red-500 ring-2 ring-red-500 ring-offset-2'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                                `}
                            >
                                <span className="text-lg">X</span>
                                <span>미입금</span>
                            </button>
                        </div>
                    </div>

                    {/* Move-in Date Section */}
                    <div className="mt-6 border-t pt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            입주 날짜
                        </label>
                        <input
                            type="text"
                            value={moveInDate}
                            onChange={handleDateChange}
                            onBlur={handleDateBlur}
                            placeholder="예) 12/31"
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center text-lg font-bold text-slate-800 tracking-wider bg-slate-50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
