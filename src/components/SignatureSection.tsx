import React, { useState } from 'react';

const SignatureSection: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <section id="signature" className="min-h-screen w-full bg-background py-24 px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-12">
          {/* Right - Form */}
          <div className="order-2">
            <h2 className="text-4xl font-normal text-foreground text-right mb-12">
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
                  placeholder="שם לקוח"
                  className="w-full bg-secondary rounded-full px-6 py-4 text-right text-foreground outline-none"
                />
              </div>

              <div>
                <label className="block text-right text-lg font-medium text-foreground mb-3">
                  תאריך
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-secondary rounded-full px-6 py-4 text-right text-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {/* Left - Signature */}
          <div className="order-1">
            <div className="bg-secondary rounded-3xl p-8">
              <div className="text-right mb-6">
                <h3 className="text-2xl font-medium text-foreground">חתימה</h3>
                <p className="text-muted-foreground">יש לחתום בשדה הבא וללחוץ אישור.</p>
              </div>

              <div className="bg-background rounded-2xl p-8 mb-6 min-h-[150px] flex items-center justify-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/a809b319250e60e99e7a1bf6acf149fcf9330abb?placeholderIfAbsent=true"
                  alt="Signature"
                  className="max-w-[200px]"
                />
              </div>

              <div className="flex items-start gap-4 mb-6">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-6 h-6 rounded border-border mt-1"
                />
                <p className="text-foreground text-right leading-7">
                  בחתימה מעלה, אני מאשר שקראתי, הבנתי והסכמתי לכל התנאים, התנאים והמדיניות המפורטים בהסכם פרויקט ADU.
                </p>
              </div>

              <button className="bg-primary text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-primary/90 transition-colors">
                <span className="font-medium">אישור</span>
                <div className="w-2 h-2 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-16 text-right">
          <div className="text-muted-foreground text-sm leading-6 space-y-1">
            <p>*הזמנים המוגדרים הם זמנים לכל חלק בנפרד ובחלקים ינוהלו במקביל</p>
            <p>**זמני העבודה בחלקם יכולים להתקצר/להתארך בהתאם לזמני התגובה של הלקוח ותהליכי אישור</p>
            <p>** בכל אישור עיצוב של עמוד נתחיל לקדם את פיתוח העמוד הספציפי כדי לקצר זמנים</p>
            <p>תוספת שלא הוגדרה בהצעה ובאפיון הראשוני יתומחר בנפרד במידה והיא מהווה תוספת משמעותית</p>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-medium text-foreground mb-4">תנאי תשלום</h3>
            <div className="text-foreground leading-7">
              <p>שבועיים אחרי פגישת התנעה – 15%</p>
              <p>סיום עיצוב – 30%</p>
              <p>השלמת פיתוח – 35%</p>
              <p>שבועיים אחרי התקנה ווידוא תקינות – 20%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
