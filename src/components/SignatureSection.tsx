import React, { useState } from 'react';
import { Check } from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';
import HebrewDatePicker from './HebrewDatePicker';

const SignatureSection: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const canSubmit = agreed && signatureData && clientName.trim() !== '';

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    console.log('Submitting:', {
      clientName,
      date: selectedDate,
      agreed,
      signatureData
    });
    // Handle form submission here
  };

  return (
    <section id="signature" className="w-full bg-background py-12 px-16" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* RIGHT column - Form (אישור לקוח) */}
          <div className="md:order-1">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground text-right mb-12">
              אישור לקוח
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-right text-lg font-medium text-foreground mb-3">
                  שם לקוח
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="הכנס שם מלא"
                  className="w-full bg-secondary rounded-full px-6 py-4 text-right text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-right text-lg font-medium text-foreground mb-3">
                  תאריך
                </label>
                <HebrewDatePicker
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="בחר תאריך"
                />
              </div>
            </div>
          </div>

          {/* LEFT column - Signature Card (חתימה) */}
          <div className="md:order-2">
            <div className="rounded-3xl p-8" style={{ backgroundColor: '#F3F5FF' }}>
              <div className="text-right mb-6">
                <h3 className="text-2xl font-medium text-foreground">חתימה</h3>
                <p className="text-muted-foreground">יש לחתום בשדה הבא וללחוץ אישור.</p>
              </div>

              {/* Signature Canvas */}
              <div className="mb-6">
                <SignatureCanvas onSignatureChange={setSignatureData} />
              </div>

              {/* Checkbox Agreement */}
              <div className="flex items-start gap-4 mb-6">
                <button
                  onClick={() => setAgreed(!agreed)}
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    agreed 
                      ? 'bg-primary border-primary' 
                      : 'bg-white border-muted-foreground'
                  }`}
                >
                  {agreed && <Check className="w-4 h-4 text-white" />}
                </button>
                <p className="text-foreground text-right leading-7 text-sm">
                  בחתימה מעלה, אני מאשר שקראתי, הבנתי והסכמתי לכל התנאים, התנאים והמדיניות המפורטים בהסכם פרויקט ADU.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`px-8 py-4 rounded-full flex items-center gap-3 transition-colors ${
                  canSubmit 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <span className="font-medium">אישור</span>
                <div className={`w-2 h-2 rounded-full ${canSubmit ? 'bg-white' : 'bg-muted-foreground'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
