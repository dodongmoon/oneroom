import React, { useState } from 'react';
import { BuildingView } from './components/BuildingView';
import { StatusModal } from './components/StatusModal';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useRooms } from './hooks/useRooms';

function App() {
  const { rooms, loading, updateRoomStatus } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBuildingIndex, setCurrentBuildingIndex] = useState(1); // 0: C, 1: B, 2: A

  const nextBuilding = () => {
    if (currentBuildingIndex < 2) setCurrentBuildingIndex(prev => prev + 1);
  };

  const prevBuilding = () => {
    if (currentBuildingIndex > 0) setCurrentBuildingIndex(prev => prev - 1);
  };
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (roomId, newStatus) => {
    updateRoomStatus(roomId, newStatus);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader className="w-10 h-10 text-slate-400 animate-spin" />
      </div>
    );
  }
  const roomsB = rooms.filter(r => r.building_name === 'B');
  const roomsC = rooms.filter(r => r.building_name === 'C');
  const roomsA = rooms.filter(r => r.building_name === 'A');

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <header className="max-w-5xl mx-auto mb-16 flex flex-col items-center justify-center text-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-gradient-luxury">
            원룸 관리 현황
          </h1>
          <p className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-bold text-lg md:text-2xl tracking-wide uppercase drop-shadow-sm">
            트리마제, 한남더힐, 벧엘원룸 Let's go
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto relative overflow-hidden px-4">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentBuildingIndex * 100}%)` }}
        >
          {/* Building C (Index 0) - Left */}
          <div className="w-full flex-shrink-0 px-2">
            <BuildingView
              title="C동 (15세대)"
              rooms={roomsC}
              onRoomClick={handleRoomClick}
              reverseNumbering={true}
            />
          </div>

          {/* Building B (Index 1) - Center */}
          <div className="w-full flex-shrink-0 px-2">
            <BuildingView
              title="B동 (18세대)"
              rooms={roomsB}
              onRoomClick={handleRoomClick}
            />
          </div>

          {/* Building A (Index 2) - Right */}
          <div className="w-full flex-shrink-0 px-2">
            <BuildingView
              title="A동 (14세대)"
              rooms={roomsA}
              onRoomClick={handleRoomClick}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevBuilding}
          className={`absolute top-1/2 -translate-y-1/2 left-0 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800 hover:bg-white transition-all ${currentBuildingIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronLeft size={40} />
        </button>

        <button
          onClick={nextBuilding}
          className={`absolute top-1/2 -translate-y-1/2 right-0 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800 hover:bg-white transition-all ${currentBuildingIndex === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronRight size={40} />
        </button>
      </main>

      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default App;
