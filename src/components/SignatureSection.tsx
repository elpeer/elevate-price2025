import React, { useState } from 'react';

const SignatureSection: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName && date && agreed) {
      alert('הטופס נשלח בהצלחה!');
    } else {
      alert('אנא מלא את כל השדות ואשר את התנאים');
    }
  };

  return (
    <section className="w-full max-w-[1312px] mt-[107px] max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <div className="bg-secondary flex w-full flex-col mx-auto pl-[18px] pr-6 py-6 rounded-3xl max-md:max-w-full max-md:mt-10 max-md:pr-5">
            <div className="w-[272px] max-w-full text-foreground text-right">
              <h3 className="text-[28px] font-medium leading-[1.4]">חתימה</h3>
              <p className="text-lg font-normal leading-8">
                יש לחתום בשדה הבא וללחוץ אישור.
              </p>
            </div>
            
            <div className="max-w-full w-[574px] mt-[23px] rounded-[0px_0px_0px_0px]">
              <div className="bg-background flex flex-col justify-center px-[57px] py-10 rounded-2xl max-md:max-w-full max-md:px-5">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/a809b319250e60e99e7a1bf6acf149fcf9330abb?placeholderIfAbsent=true"
                  alt="Digital Signature"
                  className="aspect-[2.71] object-contain w-[298px] max-w-full"
                />
              </div>
            </div>
            
            <div className="self-stretch flex w-full gap-4 flex-wrap mt-[23px] max-md:max-w-full">
              <p className="text-foreground text-lg font-normal leading-8 text-right flex-1 shrink basis-[0%] max-md:max-w-full">
                בחתימה מעלה, אני מאשר שקראתי, הבנתי והסכמתי לכל התנאים, התנאים והמדיניות המפורטים בהסכם פרויקט ADU.
              </p>
              <div className="w-6 pt-[5px] pb-[22px]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-6 h-6 rounded-md border-border border-2"
                />
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              className="bg-primary flex min-h-[60px] items-center gap-3 mt-[23px] px-[34px] py-[26px] rounded-[100px] max-md:px-5 hover:bg-primary/90 transition-colors"
            >
              <div className="bg-background self-stretch flex min-h-2 w-2 h-2 my-auto rounded-[50px]" />
            </button>
          </div>
        </div>
        
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <form className="flex flex-col items-stretch text-foreground text-right max-md:max-w-full max-md:mt-10">
            <h2 className="text-5xl font-normal leading-none max-md:text-[40px]">
              אישור לקוח
            </h2>
            
            <div className="w-full mt-[50px] max-md:max-w-full max-md:mt-10">
              <label className="text-xl font-medium leading-[1.7] max-md:max-w-full">
                שם לקוח
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="שם לקוח"
                className="bg-secondary flex min-h-14 w-full items-center gap-2 text-lg font-normal leading-8 mt-4 px-5 py-3 rounded-[100px] max-md:max-w-full border-none outline-none"
              />
            </div>
            
            <div className="w-full mt-[42px] max-md:max-w-full max-md:mt-10">
              <label className="text-xl font-medium leading-[1.7] max-md:max-w-full">
                תאריך
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-secondary flex min-h-14 w-full items-center gap-2 text-lg font-normal leading-8 mt-4 px-5 py-3 rounded-[100px] max-md:max-w-full border-none outline-none"
              />
            </div>
          </form>
        </div>
      </div>
      
      {/* Terms and Payment Information */}
      <div className="w-[1164px] max-w-full text-right mt-[61px] max-md:mt-10">
        <p className="text-foreground text-base font-normal leading-6 max-md:max-w-full">
          *הזמנים המוגדרים הם זמנים לכל חלק בנפרד ובחלקים ינוהלו במקביל
          <br />
          **זמני העבודה בחלקם יכולים להתקצר/להתארך בהתאם לזמני התגובה של הלקוח ותהליכי אישור
          <br />
          ** בכל אישור עיצוב של עמוד נתחיל לקדם את פיתוח העמוד הספציפי כדי לקצר זמנים
          <br /> תוספת שלא הוגדרה בהצעה ובאפיון הראשוני יתומחר בנפרד במידה והיא מהווה תוספת משמעותית
          <br />
          הלוזים תלויים בתהליכי אישור וזמינות מול הלקוח
          <br />
          חלק מהתהליכים יתנהלו במקביל על מנת לצמצם זמנים 
          <br />
          בסיום הפיתוח הזכויות התוצר הינן של הלקוח
          <br />
          במידה והאפיון משתנה מול ההצעה התמחור ישתנה בהתאם במידת הצורך ובהנחה והשינוי משמעותי
          <br />
          במידה והלקוח מכל סיבה שהיא שאינה קשורה בחברת elevate מתעכב באישור או העלאת האתר / מעבר לאבן דרך הבאה ,מעבר ל  21 ימי עסקים , יוגדר הדבר סיום אבן דרך לטובת תשלום על השלב הרלוונטי
          <br />
          שינויים ופיתוח נוסף: כל שינוי ופיתוח לאחר סיום פיתוח המערכת - יענה עפ&quot;י דרישה - ובמידת הצורך יתומחר בהתאם ויבוסס על 275 ש&quot;ח לשעה
        </p>
        
        <div className="min-h-[140px] w-full mt-10 max-md:max-w-full">
          <h3 className="text-foreground text-2xl font-medium leading-[1.1] max-md:max-w-full">
            תנאי תשלום
          </h3>
          <p className="text-foreground text-base font-normal leading-6 mt-4 max-md:max-w-full">
            שבועיים אחרי פגישת התנעה – 15%
            <br />
            סיום עיצוב – 30%
            <br />
            השלמת פיתוח – 35%
            <br />
            שבועיים אחרי התקנה ווידוא תקינות – 20%
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;
