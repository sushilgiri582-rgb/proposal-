import React, { useState } from 'react';
import PixelCat from './components/PixelCat';
import FloatingHearts from './components/FloatingHearts';
import RunawayButton from './components/RunawayButton';
import RetroWindowHeader from './components/RetroWindowHeader';
import CelebrationView from './components/CelebrationView';
import CustomizerModal from './components/CustomizerModal';
import CuteAlertDialog from './components/CuteAlertDialog';
import RetroTaskbar from './components/RetroTaskbar';
import AboutModal from './components/AboutModal';

export function App() {
  const [isWon, setIsWon] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [alertDialog, setAlertDialog] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ''
  });

  const [proposalData, setProposalData] = useState({
    title: "Are you ready to be mine officially?",
    recipient: "My Sweetheart",
    sender: "Your Admirer"
  });

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setIsWon(true);
  };

  return (
    <div className="min-h-screen bg-[#f5d6dc] bg-[radial-gradient(#f3a6b3_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono select-none pb-12">
      <FloatingHearts />

      {isWon ? (
        <CelebrationView 
          recipient={proposalData.recipient}
          sender={proposalData.sender}
          question={proposalData.title}
          noCount={noCount}
          onReset={() => {
            setIsWon(false);
            setNoCount(0);
          }}
        />
      ) : (
        <div className="w-full max-w-lg bg-[#fce4ec] border-2 border-t-[#fff] border-l-[#fff] border-r-[#555] border-b-[#555] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] rounded-sm relative z-10 my-auto">
          <RetroWindowHeader 
            title={`proposal_request.exe - [To: ${proposalData.recipient}]`}
            onClose={() => setAlertDialog({ open: true, message: "You cannot escape destiny this easily! 🐾" })}
          />

          {/* Menu Bar */}
          <div className="flex bg-[#fce4ec] border-b border-[#dfb1bc] px-2 py-1 text-xs text-[#555] gap-3">
            <span className="hover:bg-[#f3a6b3] px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCustomizerOpen(true)}>File</span>
            <span className="hover:bg-[#f3a6b3] px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCustomizerOpen(true)}>Edit</span>
            <span className="hover:bg-[#f3a6b3] px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setCustomizerOpen(true)}>Romance</span>
            <span className="hover:bg-[#f3a6b3] px-1.5 py-0.5 rounded cursor-pointer" onClick={() => setAboutOpen(true)}>Help</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="text-xs text-[#888] mb-2 uppercase tracking-widest font-bold">
              To: <span className="text-[#d81b60]">{proposalData.recipient}</span> · From: <span className="text-[#d81b60]">{proposalData.sender}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#b71c1c] mb-6 drop-shadow-[1px_1px_0px_#ffebee]">
              {proposalData.title}
            </h1>

            <div className="my-2">
              <PixelCat isWon={isWon} />
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 relative min-h-[70px]">
              {/* YES BUTTON */}
              <button
                onClick={handleYesClick}
                style={{ transform: `scale(${1 + noCount * 0.05})` }}
                className="transition-transform duration-200 z-20 bg-gradient-to-r from-[#d81b60] to-[#ad1457] text-white font-bold px-8 py-3 rounded-none border-2 border-t-[#ff80ab] border-l-[#ff80ab] border-r-[#880e4f] border-b-[#880e4f] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 hover:brightness-110 flex items-center gap-2 cursor-pointer"
              >
                <span>💖 YES!</span>
                <span className="text-xs bg-[#880e4f] px-1.5 py-0.5 rounded text-[#ff80ab]">{Math.min(100, 99 + noCount)}%</span>
              </button>

              {/* RUNAWAY NO BUTTON */}
              <RunawayButton 
                noCount={noCount} 
                onNoClick={handleNoClick} 
              />
            </div>

            <div className="mt-8 text-xs text-[#78909c] flex items-center justify-between w-full border-t border-[#dfb1bc] pt-3">
              <span>⚡ "NO" evasion streak: <strong>{noCount}</strong></span>
              <span>{noCount > 3 ? "Destiny is pointing towards YES! 💘" : "Choose wisely..."}</span>
            </div>

            <div className="mt-4">
              <button 
                onClick={() => setCustomizerOpen(true)}
                className="text-xs text-[#d81b60] underline hover:text-[#ad1457] cursor-pointer bg-transparent border-none"
              >
                ✏️ Personalize proposal names
              </button>
            </div>
          </div>
        </div>
      )}

      <RetroTaskbar onOpenAbout={() => setAboutOpen(true)} />

      {customizerOpen && (
        <CustomizerModal 
          data={proposalData}
          onSave={(newData) => {
            setProposalData(newData);
            setCustomizerOpen(false);
          }}
          onClose={() => setCustomizerOpen(false)}
        />
      )}

      {aboutOpen && (
        <AboutModal onClose={() => setAboutOpen(false)} />
      )}

      <CuteAlertDialog 
        open={alertDialog.open}
        message={alertDialog.message}
        onClose={() => setAlertDialog({ open: false, message: '' })}
      />
    </div>
  );
}